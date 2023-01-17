import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loadingState: 'idle',
    menuItems: [],
    error: null,
}

const name = 'menus';

const menuSlice = createSlice({
    name,
    initialState,
    reducers: {
      setIsMenuLoading: (state) => {
        state.loadingState = 'loading';
        state.error = null;
      },
      reportLoadMenuItems: (state, { payload }) => {
        state.menuItems = payload;
        state.loadingState = 'done';
      },
      reportLoadMenuItemsError: (state, { payload }) => {
        state.menuItems = [];
        state.error = payload;
        state.loadingState = 'failed';
      } 
    }
})

export const selectIsMenuLoading = (state) => state[name].loadingState === 'loading';

export const selectApiErrors = (state) => state[name].error

export const selectMenuItems = (state) => state[name].menuItems;

export const selectMenuItemById = (state) => (itemId) => state[name].menuItems.find(({id }) => id === itemId);

export const selectMenuItemByIdFromState = (itemId) => (state) => state[name].menuItems.find(({id }) => id === itemId);


export const {
    setIsMenuLoading,
    reportLoadMenuItems,
    reportLoadMenuItemsError
} = menuSlice.actions;

export default menuSlice.reducer;