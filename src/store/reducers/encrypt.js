// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// initialize userToken from local storage
const key = localStorage.getItem('wlcrmHiddenKey') ? localStorage.getItem('wlcrmHiddenKey') : null // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njc1MDYwNzMsImV4cCI6MTY2NzUwOTY3Mywic2l0ZSI6Imh0dHA6XC9cL2FpZGVudC5pdCIsImVtYWlsIjoid2x3b3Jrczk0QGdtYWlsYy5vbSIsInVzZXJuYW1lIjoiV2FsdGVyIiwiaWQiOjF9.lvsHmW4BDVXfA5SSCHBDhEGoaXHNdFEH2mnWOsbyK6U' // null // 1234324

const initialState = {
    // key: null,
    key,
    status: "idle",
    error: null,
    success: false,
}

const encrypt = createSlice({
    name: 'encrypt',
    initialState,
    reducers: {
        cleanEncrypt: (state, action) => {
            state.key = null

            localStorage.removeItem('wlcrmHiddenKey')
        },
        setHiddenKey: (state, action) => {
            const {key} = action?.payload
            state.key = key
            localStorage.setItem('wlcrmHiddenKey', key);
        }
    },
})

export const selectEncryptState = (state) => state.encrypt;

// utils
export const getHiddenKey = createSelector(
    [selectEncryptState],
    state => state.key
)

/**
 * EXPORTING
 */
export default encrypt.reducer;

export const { setHiddenKey, cleanEncrypt } = encrypt.actions
