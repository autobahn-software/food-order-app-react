import { all } from "typed-redux-saga";
import { watchMenus } from "./features/menu/menu.saga";
import { watchOrders } from "./features/order/order.saga";

function* rootSaga() {
    yield* all([
        watchMenus(),
        watchOrders(),
    ])
}

export default rootSaga