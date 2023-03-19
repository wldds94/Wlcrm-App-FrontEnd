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
            state.user = null
            state.accessToken = null
            localStorage.removeItem('wlcrmUserToken')
            // state = {
            //     ...initialState,
            //     accessToken: null
            // }
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
                const {payload} = action
                // console.log(action.payload);

                if (payload.status) {
                    const { user, jwt } = action.payload?.data
                    // console.log(user);
                    state.user = user
                    state.accessToken = jwt // console.log(action.payload);

                    localStorage.removeItem('wlcrmUserToken')
                    localStorage.setItem('wlcrmUserToken', jwt);
                }
                
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message // console.log(state.error); console.log(action);
                console.log(action);
            })
            // VALIDATION
            .addCase(tokenValidation.pending, (state, action) => {
                state.status = 'loading'
                state.validateStatus = 'loading'
            })
            .addCase(tokenValidation.fulfilled, (state, action) => {
                // console.log(action.payload?.data);
                const { status } = action.payload
                state.status = 'succeeded'
                state.validateStatus = 'succeeded'

                const { user } = action.payload?.data

                if (!isDeepEqual(user, state.user)) {
                    state.user = user
                }
                // if (!status) {
                //     state.status = 'failed'
                //     state.validateStatus = 'failed'
                //     state.user = null
                //     state.accessToken = null

                //     localStorage.removeItem('wlcrmUserToken')
                // } else {
                    

                // }
            })
            .addCase(tokenValidation.rejected, (state, action) => {
                localStorage.removeItem('wlcrmUserToken')
                
                state.user = null
                state.accessToken = null

                state.status = 'failed'
                state.validateStatus = 'failed'
                state.error = action.error.message // console.log(state.error); console.log(action);
                console.log(state.error);
            })
            // Reset Password
            .addCase(sendResetPassword.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(sendResetPassword.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(sendResetPassword.rejected, (state, action) => {
                console.log(action);

                state.status = 'failed'
                state.error = action.error.message
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
            // UPDATE Reset Password
            .addCase(updateNewPassword.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateNewPassword.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(updateNewPassword.rejected, (state, action) => {
                console.log(action);

                state.status = 'failed'
                state.error = action.error.message
            })
            // SAVE Reset NEW Email
            .addCase(updateNewEmail.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateNewEmail.fulfilled, (state, action) => {
                const {status} = action.payload
                // state.status = status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data
                if (status) {
                    console.log('Logout...');
                    state.user = null
                    state.accessToken = null
                    state.validateStatus = 'failed'
                    state.status = 'failed'

                    localStorage.removeItem('wlcrmUserToken')
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(updateNewEmail.rejected, (state, action) => {
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
    try {
        // console.log(credentials);
        const response = await axios.post('/auth', credentials)
        // console.log(response);
        return response.data
    } catch (error) {
        // console.log(error);
        return error?.response?.data // return error.message
    }
    // console.log(credentials);
    // const response = await axios.post('/auth', credentials)
    // console.log(response);
    // return response.data
})

export const tokenValidation = createAsyncThunk('auth/validate', async () => {
    // console.log(credentials);
    const response = await axiosPrivate.post('/auth/validate')
    return response.data
})

// Reset PASSWORD
export const sendResetPassword = createAsyncThunk('auth/reset_password', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axios.post('/auth/reset_password', data)
        return response.data
    } catch (error) {
        return error.message
    }
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

// Save New Password POST (by OLD & AUTH)
export const updateNewPassword = createAsyncThunk('auth/reset_password/update', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/auth/reset_password/update', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// UPDATE EMAIL
export const updateNewEmail = createAsyncThunk('auth/email/update', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/auth/email/update', data)
        return response.data
    } catch (error) {
        return error.message
    }
})