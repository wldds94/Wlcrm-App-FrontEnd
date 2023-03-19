// types
import { createSelector, createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: ['dashboard'],
    drawerOpen: false,
    supportOpen: false, // 'close', // close - minimize - open  // false,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
            // state.drawerOpen = false;
        },
        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },
        openSupport(state, action) {
            const supportOpen = action?.payload?.supportOpen
            if (supportOpen !== null && supportOpen !== undefined) {
                state.supportOpen = supportOpen;
            } else {
                const starter = state.supportOpen
                state.supportOpen = !starter
            }
        },
    }
});

export default menu.reducer;

export const { activeItem, openDrawer, openSupport/* , activeComponent, openComponentDrawer */ } = menu.actions;

export const selectMenu = state => state.menu
export const getOpenSupport = createSelector(
    [selectMenu],
    data => data.supportOpen
)

export const getOpenDrawer = createSelector(
    [selectMenu],
    data => data.drawerOpen
)
