// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import { axiosPrivate } from 'api/axios';
import { isDeepEqual } from 'utils/equal';

const initialSync = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    update: false,
    message: 'Dati Diario Clinico aggiornati.',
    time: null,
}
const initialState = {
    data: null, // []
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'error' | 'failed'
    message: null,
    error: null,
    success: false,
    sync: {...initialSync},
}

const clinical = createSlice({
    name: "clinical",
    initialState,
    reducers: {
        cleanClinical: () => initialState,
        syncClinicalData(state, action) {
            if (state.sync.data) {
                state.data = [...state.sync.data]
                state.sync = {...initialSync}
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchClinical.pending, (state, action) => {
                // console.log("shopping loading");
                state.status = 'loading'
            })
            .addCase(fetchClinical.fulfilled, (state, action) => {
                // console.log("shopping succeeded");

                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                    }
                }
                // const data = action.payload?.data
                // state.data = data
                state.message = null
                // console.log(state);
                console.log(action);
            })
            .addCase(fetchClinical.rejected, (state, action) => {
                // console.log("shopping failed");
                state.status = 'failed'
                state.error = action.error.message
            })
            // sync
            .addCase(syncClinical.pending, (state, action) => {
                state.sync.status = 'loading'
            })
            .addCase(syncClinical.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.sync.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        if (!isDeepEqual(data, state.sync.data)) {
                            state.sync.data = data
                            state.sync.time = new Date().toISOString()
                        }
                        if (state.sync.update !== true) {
                            state.sync.update = true
                        }
                    } else {
                        state.sync = {...initialSync}
                    }
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(syncClinical.rejected, (state, action) => {
                state.sync.status = 'failed'
            })
            // SAVE
            .addCase(saveClinicalJournal.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveClinicalJournal.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        state.sync = {...initialSync}
                    }
                    state.message = action.payload?.message
                } else {
                    state.message = action.payload?.errorCode + " " + action.payload?.message
                }

                // console.log(state);
                console.log(action);
            })
            .addCase(saveClinicalJournal.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // DELETE
            .addCase(deleteClinicalJournal.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteClinicalJournal.fulfilled, (state, action) => {
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
                console.log(action);
            })
            .addCase(deleteClinicalJournal.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// Simple Query Type
export const selectClinicalState = (state) => state.clinical

export const getClinicalList = createSelector(
    [selectClinicalState],
    clinical => clinical.data 
)
// export const getClinicalList = (state) => {
//     return state.clinical.data // ?.slice()?.map((event) => mapAppointmentData(event))
// };

export const getJournalByEventId = createSelector(
    [getClinicalList, (state, eventID) => eventID],
    (items, eventID) => items.filter(row => {
        return Number(row.eventId) === Number(eventID)
    })
)
// export const getJournalByEventId = (state, eventID) => state.clinical?.data ? state.clinical?.data.filter(journal => Number(journal.eventId) === Number(eventID)) : null;

export const getJournalByClientId = (state, clientID) => state.clinical?.data ? state.clinical.data.filter(journal => Number(journal.clientId) === Number(clientID)) : null;
export const selectJournalsByClientID = createSelector(
    [getClinicalList, (state, clientId) => clientId],
    (items, clientId) => items.filter(row => {
        return Number(row.clientId) === Number(clientId)
    })
)

export const getJournalByUserId = createSelector(
    [getClinicalList, (state, userID) => userID],
    (items, userID) => items.filter(row => {
        return Number(row.userIs) === Number(userID)
    })
)
// export const getJournalByUserId = (state, userID) => state.clinical?.data ? state.clinical.data.filter(journal => Number(journal.userId) === Number(userID)) : null;

export const getClinicalStatus = createSelector(
    [selectClinicalState],
    clinical => clinical.status
)
// export const getClinicalStatus = (state) => state.clinical.status;
export const getClinicalMessage = (state) => state.clinical.message;
export const getClinicalError = (state) => state.clinical.error;

/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.clinical.sync;
// export const getShoppingSyncStatus = (state) => state.shopping.syncStatus;
export const getClinicalSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getClinicalSyncUpdate = createSelector(
    [getSyncState], (sync) => sync.update
)
export const getClinicalSyncMessage = createSelector(
    [getSyncState], (sync) => sync.message
)
export const getClinicalSyncTime = createSelector(
    [getSyncState], (sync) => sync.time
)


/**
 * EXPORTING
 */
export default clinical.reducer;

export const { cleanClinical, syncClinicalData } = clinical.actions;

// Thunks - Actions
export const fetchClinical = createAsyncThunk('clinical/list', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clinical')
        return response.data
    } catch (error) {
        return error.message
    }
})

// SYNC
export const syncClinical = createAsyncThunk('clinical/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clinical')
        return response.data
    } catch (error) {
        return error.message
    }
})

// clinical/save
export const saveClinicalJournal = createAsyncThunk('clinical/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clinical/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// clinical/delete
export const deleteClinicalJournal = createAsyncThunk('clinical/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clinical/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})