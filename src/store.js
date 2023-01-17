import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import menuReducer from './features/menu/menu.slice';
import orderReducer from './features/order/order.slice';

import rootSaga from "./root-saga";

const rootReducer = combineReducers({
    menus: menuReducer,
    order: orderReducer,
})

const setup = () => {
    const sagaMiddleware = createSagaMiddleware();
  
    const store = configureStore({
      reducer: rootReducer,
      middleware: [sagaMiddleware],
    });
  
    sagaMiddleware.run(rootSaga);
  
    return store;
};

const store = setup();

export { store, rootReducer }