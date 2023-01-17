import { call, put, takeEvery } from "typed-redux-saga";
import { getMenuItems } from "./menu.service";
import { reportLoadMenuItems, reportLoadMenuItemsError, setIsMenuLoading } from "./menu.slice";


const fetchMenusForUser = () => ({ type: fetchMenusForUser.type });
fetchMenusForUser.type = 'menus/fetch';

/**
 * 
 * response structure {
 *  api: { apiInfo },
 *  1zkl: {
 *     name: string,
 *     description: string,
 *     price: number,
 *  }
 * }
 * Object.entires => [apiInfo, ...menuItems]
 * 
 * ***/

function* handleFetchMenusForUser(){
    try {
        yield* put(setIsMenuLoading())
        const responseBody = yield* call(getMenuItems);
        const response = yield* call([responseBody, responseBody.json]); //response structure: { userInfo, pizza: , burger,  }
        const [, ...menuItems] = Object.entries(response).map(([id, val]) => ({ ...val, id }));
        yield* put(reportLoadMenuItems(menuItems))
    } catch (e) {
        yield* put(reportLoadMenuItemsError(e))
    }
}

function* watchMenus(){
    yield* takeEvery(fetchMenusForUser.type, handleFetchMenusForUser)
}


export { watchMenus, fetchMenusForUser, handleFetchMenusForUser }