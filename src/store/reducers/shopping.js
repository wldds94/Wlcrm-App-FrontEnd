// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import { axiosPrivate } from 'api/axios';
import { isDeepEqual } from 'utils/equal';


const initialSync = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    update: false,
    message: 'Altri utenti hanno aggiunto elementi nella lista della spesa.',
    time: null,
}

const initialState = {
    data: null, // []
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
    sync: {...initialSync},
}

const shopping = createSlice({
    name: "shopping",
    initialState,
    reducers: {
        cleanShopping: () => initialState,
        syncShoppingData(state, action) {
            if (state.sync.data) {
                state.data = [...state.sync.data]
                state.sync = {...initialSync}
            }
        }
    },
    extraReducers(builder) {
        builder
            // SYNC Shopping Item
            .addCase(syncShopping.pending, (state, action) => {
                // state.syncStatus = 'loading'
                state.sync.status = 'loading'
            })
            .addCase(syncShopping.fulfilled, (state, action) => {
                const { status = false } = action.payload
                // state.syncStatus = status ? 'succeeded' : 'failed'
                state.sync.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        if (!isDeepEqual(data, state.sync.data)) {
                        // if (JSON.stringify(data) !== JSON.stringify(state.sync.data)) {
                            state.sync.data = data
                            state.sync.time = new Date().toISOString()
                        }
                        if (state.sync.update !== true) {
                            // state.syncUpdate = true
                            state.sync.update = true
                        }
                        
                    } else {
                        // state.syncData = null
                        // // state.syncUpdate = false
                        // state.sync.update = false
                        state.sync = {...initialSync}
                    }
                }
                // state.sync.time = new Date().toISOString()
                // console.log(state);
                console.log(action);
            })
            .addCase(syncShopping.rejected, (state, action) => {
                // state.syncStatus = 'failed'
                state.sync.status = 'failed'
                // state.error = action.error.message
            })
            // FETCH
            .addCase(fetchShopping.pending, (state, action) => {
                // console.log("shopping loading");
                state.status = 'loading'
            })
            .addCase(fetchShopping.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = {...initialSync}
                    }
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(fetchShopping.rejected, (state, action) => {
                // console.log("shopping failed");
                state.status = 'failed'
                state.error = action.error.message
            })
            // New Shopping Item
            .addCase(addShoppingItem.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addShoppingItem.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                state.error = status ? null : action.payload.message
                if (status) {
                    const data = action.payload?.data
                    if (JSON.stringify(data) !== JSON.stringify(state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = {...initialSync}
                    }
                    // state.data = action.payload?.data
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(addShoppingItem.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Delete Shopping Item
            .addCase(deleteShoppingItem.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteShoppingItem.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.error = action.payload?.status ? null : action.payload.message
                // if (action.payload?.status) {
                //     state.data = action.payload?.data
                // }
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                state.error = status ? null : action.payload.message
                if (status) {
                    const data = action.payload?.data
                    if (JSON.stringify(data) !== JSON.stringify(state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = {...initialSync}
                    }
                    // state.data = action.payload?.data
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(deleteShoppingItem.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})


export const selectShopping = (state) => state.shopping

export const getShoppingList = createSelector(
    [selectShopping],
    shopping => shopping.data
)
// export const getShoppingList = (state) => {
//     return state.shopping.data // ?.slice()?.map((event) => mapAppointmentData(event))
// };
export const selectShoppingList = createSelector(
    [getShoppingList],
    (rows) => {
        return rows // ?.slice()?.map((event) => mapAppointmentData(event))
    }
)

export const getShoppingStatus =  createSelector(
    [selectShopping],
    shopping => shopping.status
)
// export const getShoppingStatus = (state) => state.shopping.status;
export const getShoppingError = (state) => state.shopping.error;

/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.shopping.sync;
// export const getShoppingSyncStatus = (state) => state.shopping.syncStatus;
export const getShoppingSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getShoppingSyncUpdate = createSelector(
    [getSyncState], (sync) => sync.update
)
export const getShoppingSyncMessage = createSelector(
    [getSyncState], (sync) => sync.message
)
export const getShoppingSyncTime = createSelector(
    [getSyncState], (sync) => sync.time
)
// export const getSyncUpdate = (state) => state.shopping.syncUpdate;
// export const getSyncMessage = (state) => state.shopping.syncMessage;
export const getSyncData = (state) => state.shopping.syncData;


/**
 * EXPORTING
 */
export default shopping.reducer;

export const { cleanShopping, syncShoppingData } = shopping.actions;

// Thunks - Actions
export const fetchShopping = createAsyncThunk('shopping/list', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/shopping')
        return response.data
    } catch (error) {
        return error.message
    }
})

export const syncShopping = createAsyncThunk('shopping/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/shopping')
        return response.data
    } catch (error) {
        return error.message
    }
})

export const addShoppingItem = createAsyncThunk('shopping/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/shopping/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteShoppingItem = createAsyncThunk('shopping/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/shopping/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})