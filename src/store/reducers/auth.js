// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// api
import axios, { axiosPrivate } from 'api/axios';

// utils
import { isDeepEqual } from 'utils/equal';

// initialize userToken from local storage
const accessToken = localStorage.getItem('wlcrmUserToken') ? localStorage.getItem('wlcrmUserToken') : null // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njc1MDYwNzMsImV4cCI6MTY2NzUwOTY3Mywic2l0ZSI6Imh0dHA6XC9cL2FpZGVudC5pdCIsImVtYWlsIjoid2x3b3Jrczk0QGdtYWlsYy5vbSIsInVzZXJuYW1lIjoiV2FsdGVyIiwiaWQiOjF9.lvsHmW4BDVXfA5SSCHBDhEGoaXHNdFEH2mnWOsbyK6U' // null // 1234324

const initialState = {
    user: null,
    accessToken,
    status: "idle",
    validateStatus: 'idle',
    error: null,
    success: false,
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        cleanAuth: () => initialState,
        logOut: (state, action) => {
            // state.user = null
            // state.accessToken = null
            localStorage.removeItem('wlcrmUserToken')
            state = {
                ...initialState,
                accessToken: null
            }
        },
    },
    extraReducers(builder) {
        builder
            // login authentication
            .addCase(userLogin.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log(action.payload);

                const { user, jwt } = action.payload?.data
                // console.log(user);
                state.user = user
                state.accessToken = jwt // console.log(action.payload);

                localStorage.removeItem('wlcrmUserToken')
                localStorage.setItem('wlcrmUserToken', jwt);
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message // console.log(state.error); console.log(action);
                console.log(state.error);
            })
            // SAVE Reset Password
            .addCase(changeNewPassword.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(changeNewPassword.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(changeNewPassword.rejected, (state, action) => {
                console.log(action);

                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { logOut } = auth.actions

export default auth.reducer;

// Simple Query Type
export const getAuth = (state) => state.auth

export const getCurrentUser = (state) => state.auth.user

export const selectCurrentUser = createSelector(
    [getCurrentUser],
    data => data
)

export const selectCurrentToken = createSelector(
    [getAuth],
    auth => auth.accessToken
)
// export const selectCurrentToken = (state) => state.auth.accessToken

// status - erros
export const getAuthStatus = createSelector(
    [getAuth],
    auth => auth.status
)
// export const getAuthStatus = (state) => state.auth.status
export const getAuthError = createSelector(
    [getAuth],
    auth => auth.error
) // (state) => state.auth.error

export const getAuthvalidateStatus = createSelector(
    [getAuth],
    auth => auth.validateStatus
)
// export const getAuthvalidateStatus = (state) => state.auth.validateStatus

// ACTIONS
export const userLogin = createAsyncThunk('auth/login', async (credentials) => {
    // console.log(credentials);
    const response = await axios.post('/auth', credentials)
    return response.data
})

// Save New Password POST (by Key & login)
export const changeNewPassword = createAsyncThunk('auth/reset_password/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axios.post('/auth/reset_password/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})