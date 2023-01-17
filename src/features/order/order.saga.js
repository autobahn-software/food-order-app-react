import { select, put, takeEvery, call } from 'typed-redux-saga';
import { clearCart, reportLoadOrderErrorResponse, reportLoadOrderResponse, reportPlaceOrder, selectCartAmountForItemById, selectCartItemAmountTotal, selectTotalValueOfItemsLoaded, setItemToCart, setValidationError } from './order.slice';
import { APP_CONSTANTS } from '../../App.constants';
import { selectMenuItemByIdFromState } from '../menu/menu.slice';
import { ValidationError } from './utils';
import { postOrderInfo } from './order.service';



const updateItemToCart = (payload) => ({ type: updateItemToCart.type, payload });
updateItemToCart.type = 'order/cart/update';

function* handleCartUpdate({ payload }){
    try {
        const { id, count } = payload;
        const { price } = yield select(selectMenuItemByIdFromState(id));
        const previousItemCount = yield select(selectCartAmountForItemById(id));
        const currentValue = yield select(selectTotalValueOfItemsLoaded);
        const currentTotalItems = yield* select(selectCartItemAmountTotal);
        const orderValue = currentValue - (previousItemCount * price);
        const totalItemsLoaded = currentTotalItems - previousItemCount;
        yield* call(validateCartWithPayload, { orderValue, totalItemsLoaded, id, count, price });
        yield* put(setItemToCart({ id, count }));
    } catch(e) {
        const { id, message } = e;
        yield* put(setValidationError({ id, message }))
    }
}

const postOrder = (payload) => ({ type: postOrder.type, payload });
postOrder.type = 'order/post';

function* handlePostOrderInfo({ payload }){
    try {
        yield* put(reportPlaceOrder());
        const total = yield select(selectTotalValueOfItemsLoaded);
        const response = yield* call(postOrderInfo, {orderInfo: { ...payload, total } });
        yield* put(reportLoadOrderResponse(response));
        yield* put(clearCart());
    } catch(e) {
        yield* put(reportLoadOrderErrorResponse('Failed to place order'));
    }
}

function validateCartWithPayload({ orderValue, totalItemsLoaded, id, count, price }){
    const updatedOrderValue = orderValue + (count * price);
    const updatedItems = totalItemsLoaded + count;
    if (updatedOrderValue > APP_CONSTANTS.orderLimit) {
        throw new ValidationError(id, 'Item not added. Order $ Limit Reached')
    }
    if (updatedItems > APP_CONSTANTS.totalItemLimitPerOrder) {
        throw new ValidationError(id, 'Item not added. Item Limit Reached.');
    }
    if (count > APP_CONSTANTS.amountLimitPerItem) {
        throw new ValidationError(id, 'Max count reached for this item');
    }
}

function* watchOrders(){
    yield* takeEvery(updateItemToCart.type, handleCartUpdate);
    yield* takeEvery(postOrder.type, handlePostOrderInfo);
}

export { watchOrders, updateItemToCart, postOrder }