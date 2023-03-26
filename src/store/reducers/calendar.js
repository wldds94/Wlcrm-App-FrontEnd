// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

// api
import { axiosPrivate } from 'api/axios';

// utils
import { isDeepEqual } from 'utils/equal';

// config
import { schedulerConfig } from 'config';

const initialSync = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    update: false,
    message: 'Sincronizzazione Calendario Necessaria.',
    time: null,
}

const usersView = localStorage.getItem(schedulerConfig?.sessionKeyView)
const usersMode = localStorage.getItem(schedulerConfig?.sessionKeyMode)
const onlyUser = localStorage.getItem(schedulerConfig?.sessionKeyOnlyUser)

const initialState = {
    data: null, // []
    copyingRow: null,
    error: null,
    success: false,
    config: {
        mode: usersMode ? usersMode : schedulerConfig?.mode,
        view: usersView ? usersView : schedulerConfig?.view,
        onlyUser: onlyUser ? true : schedulerConfig?.onlyUser,
        default: {
            ...schedulerConfig
        }
    },
    // sync
    sync: { ...initialSync },
}

const calendar = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        cleanEvents: () => initialState,
        copyRow: {
            reducer(state, action) {
                console.log(action.payload);
                state.copyingRow = {
                    ...action.payload,
                }
            },
        },
        savePreferences(state, action) {
            state.config = {
                ...action.payload,
                default: {
                    ...schedulerConfig
                }
            }
            const values = action.payload
            localStorage.removeItem(schedulerConfig?.sessionKeyMode)
            localStorage.removeItem(schedulerConfig?.sessionKeyView)
            localStorage.removeItem(schedulerConfig?.sessionKeyOnlyUser)
        
            localStorage.setItem(schedulerConfig?.sessionKeyMode, values?.mode)
            localStorage.setItem(schedulerConfig?.sessionKeyView, values?.view)
            localStorage.setItem(schedulerConfig?.sessionKeyOnlyUser, values?.onlyUser)
        },
        setPreferencesMode(state, action) {
            const {mode} = action?.payload
            state.config = {
                ...state.config,
                mode: mode
            }// ?.mode = action?.payload
        },
        syncCalendarData(state, action) {
            if (state.sync.data) {
                state.data = [...state.sync.data]
                state.sync = { ...initialSync }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEvents.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.sync.data)) {
                        state.data = data
                    }
                }
                console.log(action);
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // SYNC
            .addCase(syncEvents.pending, (state, action) => {
                state.sync.status = 'loading'
            })
            .addCase(syncEvents.fulfilled, (state, action) => {
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
                        state.sync = { ...initialSync }
                    }
                }
                console.log(action);
            })
            .addCase(syncEvents.rejected, (state, action) => {
                state.sync.status = 'failed'
            })
            // SAVE
            .addCase(saveEvent.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveEvent.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'

                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = { ...initialSync }
                    }
                }
            })
            .addCase(saveEvent.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // DELETE
            .addCase(deleteEvent.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'

                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = { ...initialSync }
                    }
                }
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // UPDATE
            .addCase(updateEvent.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'

                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = { ...initialSync }
                    }
                }
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectCalendar = (state) => state.calendar;

export const selectCalendarEvents = createSelector(
    [selectCalendar],
    calendar => calendar.data
)
// export const selectCalendarEvents = (state) => state.calendar.data;
export const getCalendarEvents = createSelector(
    [selectCalendarEvents],
    items => items
)
// export const getCalendarEvents = (state) => {
//     return state.calendar.data // ?.slice()?.map((event) => mapAppointmentData(event))
// };

export const getCalendarEventsByID = (state, eventId) => {
    return state.calendar?.data
        ? state.calendar.data.find(event => Number(event.id) === Number(eventId))
        : null
};

export const getCalendarEventsByClientID = (state, clientID) => {
    return state.calendar?.data ? state.calendar.data.filter(el => {
        // console.log(el);
        return Number(el.clientId) === Number(clientID)
    }) : null
};
export const selectEventsByClientID = createSelector(
    [getCalendarEvents, (state, clientId) => clientId],
    (events, clientId) => events.filter(row => {
        return Number(row.clientId) === Number(clientId)
    })
)

export const getCalendarEventsByUserID = createSelector(
    [getCalendarEvents, (state, userID) => userID],
    (events, userID) => events.filter(row => {
        return Number(row.userId) === Number(userID)
    })
)
// export const getCalendarEventsByUserID = (state, userID) => {
//     return state.calendar?.data ? state.calendar.data.filter(el => {
//         // console.log(el);
//         return Number(el.userId) === Number(userID)}) : null 
// };
export const getCalendarEventsTodayByUserID = createSelector(
    [getCalendarEvents, (state, userID) => userID],
    (events, userID) => events.filter(row => {
        return Number(row.userId) === Number(userID)
    })
)
// export const getCalendarEventsTodayByUserID = (state, userID) => {
//     return state.calendar.data.filter(el => {
//         // console.log(el);
//         return Number(el.userId) === Number(userID)})
// };
export const getCalendarStatus = createSelector(
    [selectCalendar],
    calendar => calendar.status
)
// export const getCalendarStatus = (state) => state.calendar.status;
export const getCalendarError = (state) => state.calendar.error;

export const getCalendarConfig = createSelector(
    [selectCalendar],
    calendar => calendar.config
)

/**
 * COPYNG
 */
export const getCalendarCopiedRow = createSelector(
    [selectCalendar],
    calendar => calendar.copyingRow
)

/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.calendar.sync;
// export const getShoppingSyncStatus = (state) => state.shopping.syncStatus;
export const getCalendarSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getCalendarSyncUpdate = createSelector(
    [getSyncState], (sync) => sync.update
)
export const getCalendarSyncMessage = createSelector(
    [getSyncState], (sync) => sync.message
)
export const getCalendarSyncTime = createSelector(
    [getSyncState], (sync) => sync.time
)

/**
 * EXPORTING
 */
export default calendar.reducer;

export const { cleanEvents, copyRow, savePreferences, setPreferencesMode, syncCalendarData } = calendar.actions;

// export const { setCurrentViewName, setCurrentDate, setLoading } = calendar.actions;

// Thunks - Actions
export const fetchEvents = createAsyncThunk('calendar/list', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/events')
        return response.data
    } catch (error) {
        return error.message
    }
})

// sync
export const syncEvents = createAsyncThunk('calendar/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/events')
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteEvent = createAsyncThunk('calendar/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/events/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const saveEvent = createAsyncThunk('calendar/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/events/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const updateEvent = createAsyncThunk('calendar/update', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/events/update', data)
        return response.data
    } catch (error) {
        return error.message
    }
})