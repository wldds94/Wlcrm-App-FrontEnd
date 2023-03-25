// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import { axiosPrivate } from 'api/axios';

const initialState = {
    data: null, // []
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
}

const mailer = createSlice({
    name: "mailer",
    initialState,
    reducers: {
        cleanMail: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(sendSupportRequest.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(sendSupportRequest.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log(action);
            })
            .addCase(sendSupportRequest.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectMailer = (state) => state.mailer;

export const getMailerStatus = createSelector(
    [selectMailer],
    data => data.status
)
// export const getMailerStatus = (state) => state.mailer.status;
export const getMailerError = (state) => state.mailer.error;


/**
 * EXPORTING
 */
export default mailer.reducer;

export const { cleanMail } = mailer.actions;

// Thunks - Actions
export const sendSupportRequest = createAsyncThunk('support/request', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/support', data)
        return response.data
    } catch (error) {
        return error.message
    }
})