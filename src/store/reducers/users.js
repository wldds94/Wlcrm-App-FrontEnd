// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import axios, { axiosPrivate, BASE_HEADER_PARAM } from 'api/axios';

// utils
// import { getRandomColor } from 'utils/color';
import { isDeepEqual } from 'utils/equal';

// CONST 
// import BASE_HEADER_PARAM from 'api/axios'

const initialSync = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    update: false,
    message: 'Alcuni account sono stati modificati.',
    time: null,
}

const initialState = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
    sync: { ...initialSync },
}

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        cleanUser: () => initialState,
        syncUsersData(state, action) {
            if (state.sync.data) {
                state.data = [...state.sync.data]
                state.sync = {...initialSync}
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        state.sync = { ...initialSync }
                    }
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // sync
            .addCase(syncUsers.pending, (state, action) => {
                state.sync.status = 'loading'
            })
            .addCase(syncUsers.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.sync.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    // if (JSON.stringify(data) !== JSON.stringify(state.data)) {
                    if (!isDeepEqual(data, state.data)) {
                        if (!isDeepEqual(data, state.sync.data)) {
                            state.sync.data = data
                            state.sync.time = new Date().toISOString()
                        }
                        if (state.sync.update !== true) {
                            state.sync.update = true
                        }
                    } else {
                        state.sync = { ...initialSync }
                    }
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(syncUsers.rejected, (state, action) => {
                state.sync.status = 'failed'
            })
            // Save -Info account
            .addCase(saveUsersInfo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveUsersInfo.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        state.sync = { ...initialSync }
                    }
                }
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data
                // console.log(state);
                // console.log(action);
            })
            .addCase(saveUsersInfo.rejected, (state, action) => {
                console.log(action);

                state.status = 'failed'
                state.error = action.error.message
            })
            // Revoke user token
            .addCase(revokeUsersToken.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(revokeUsersToken.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    console.log(data);
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        state.sync = { ...initialSync }
                    }
                }
            })
            .addCase(revokeUsersToken.rejected, (state, action) => {
                console.log(action);

                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectUsers = (state) => state.users

export const selectAllUsers = createSelector(
    [selectUsers],
    users => users.data
)
// export const selectAllUsers = (state) => state.user.data;

export const getAllUsers = createSelector(
    [selectAllUsers],
    data => data
) // (state) => state.user.data;

export const getUsersStatus = createSelector(
    [selectUsers],
    users => users.status
)
// export const getUsersStatus = (state) => state.user.status;
export const getUsersError = (state) => state.users.error;

/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.users.sync;
// export const getShoppingSyncStatus = (state) => state.shopping.syncStatus;
export const getUsersSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getUsersSyncUpdate = createSelector(
    [getSyncState], (sync) => sync.update
)
export const getUsersSyncMessage = createSelector(
    [getSyncState], (sync) => sync.message
)
export const getUsersSyncTime = createSelector(
    [getSyncState], (sync) => sync.time
)

/**
 * EXPORTING
 */
export default users.reducer;

export const { cleanUser, syncUsersData } = users.actions;

// Thunks - Actions
export const fetchUsers = createAsyncThunk('user/list', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/users')
        return response.data
    } catch (error) {
        return error?.response?.data // return error.message
    }
})

export const syncUsers = createAsyncThunk('user/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/users')
        return response.data
    } catch (error) {
        return error?.response?.data // return error.message
    }
})

// Save INFO
export const saveUsersInfo = createAsyncThunk('users/info/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/users/info/save', data)
        return response.data
    } catch (error) {
        return error?.response?.data // return error.message
    }
})

// Revoke Token
export const revokeUsersToken = createAsyncThunk('users/revoke/token', async (data) => {
    let headers = {}
    headers[BASE_HEADER_PARAM] = data?.value
    try {
        let config = {
            headers
            // headers: {
            //     ...headers
            // }
        }
        const response = await axios.post('/auth/revoke', {}, config)
        return response.data
    } catch (error) {
        return error?.response?.data // return error.message
    }
})