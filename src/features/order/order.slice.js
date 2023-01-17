import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectMenuItemById, selectMenuItems } from "../menu/menu.slice";
import { APP_CONSTANTS } from "../../App.constants";



const initialState = {
    loadingState: 'idle',
    cart: {},
    error: null,
    orderStatus: {
      status: 'idle',
      orderInfo: null,
      errors: null,
    }
}

const name = 'order';

const orderSlice = createSlice({
    name,
    initialState,
    reducers: {
      addItemToCart: (state, {payload}) => {
        state.error = null;
        const { id, amount } = payload;
        state.cart[id] = amount;
      },
      removeItemFromCart: (state, { payload }) => {
        state.error = null;
        state.cart[payload] -= 1;
        if (!state.cart[payload]) delete state.cart[payload]
      },
      setItemToCart: (state, { payload }) => {
        state.error = null;
        const { id, count } = payload;
        state.cart[id] = count;
        if (!state.cart[id]) delete state.cart[id]
      },
      setValidationError: (state, { payload }) => {
        state.error = payload;
      },
      reportPlaceOrder: (state) => {
        state.orderStatus.state = 'loading';
        state.orderStatus.orderInfo = null;
      },
      reportLoadOrderResponse: (state, { payload }) => {
        state.orderStatus.state = 'done';
        state.orderStatus.orderInfo = payload;
      },
      reportLoadOrderErrorResponse: (state, { payload }) => {
        state.orderStatus.state = 'failed';
        state.orderStatus.error = payload;
        state.orderStatus.orderInfo = null;
      },
      clearCart: (state) => {
        state.cart = {};
      },
      resetOrderStatus: (state) => {
        state.orderStatus.state = 'idle';
        state.orderStatus.orderInfo = null;
        state.orderStatus.error = null;
      }
    }
})

export const selectCartItems = (state) => Object.entries(state[name].cart).map(([id, val]) => ({ id, val }));

export const selectCartItemCount = (state) => Object.keys(state[name].cart).length;

export const selectCartItemAmountTotal = (state) => Object.values(state[name].cart).reduce((total, count) => total += count, 0)

export const getCartAmountForItemById = (state) => (id) => state[name].cart[id];

export const selectCartAmountForItemById = (id) => (state) => state[name].cart[id] || 0;

export const selectMenuOrderInfo = createSelector([selectMenuItems, getCartAmountForItemById], (menus, cartAmountForItem) => menus.map(({ id, price, description, name}) => ({
    id,
    name,
    description,
    price,
    amount: cartAmountForItem(id) || 0,
})))

export const selectOrderSummaryInfo = createSelector([selectCartItems, selectMenuItemById], (cartItems, menuItemById) => cartItems.map(
  ({ id, val }) => {
    const menuItem = menuItemById(id);
    console.log(menuItem);
    const { price, name } = menuItem;
    return {
        id,
        price,
        name,
        amount: val,
    }
 }))


export const selectTotalValueOfItemsLoaded = (state) => selectOrderSummaryInfo(state).reduce((totalValue, item) => {
  const { price, amount } = item;
  return totalValue += price * amount;
}, 0)

export const selectIsOrderValueLimitReached = (state) => selectTotalValueOfItemsLoaded(state) > APP_CONSTANTS.orderLimit;

export const selectValidationError = (state) => state[name].error; 

export const selectIsOrderStatusLoading = (state) => state[name].orderStatus.state === 'loading';

export const selectOrderStatusResponse = (state) => state[name].orderStatus.orderInfo;

export const selectOrderStatusError = (state) => state[name].orderStatus.error;

export const {
    addItemToCart,
    removeItemFromCart,
    setItemToCart,
    setValidationError,
    reportPlaceOrder,
    reportLoadOrderResponse,
    reportLoadOrderErrorResponse,
    clearCart,
    resetOrderStatus,
} = orderSlice.actions;

export default orderSlice.reducer;