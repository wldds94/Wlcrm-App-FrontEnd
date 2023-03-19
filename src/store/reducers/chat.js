// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import axios, { axiosPrivate } from 'api/axios';

// utils
import dynamicSortMultiple, { dynamicSort } from 'utils/array';
import { isDeepEqual } from 'utils/equal';

const initialSync = {
    data: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    // update: false,
    // message: 'Nuovi Messaggi in arrivo.',
    // time: null,
}

const initialState = {
    data: null, /* [
        {
            id: 1,
            text: "Ciao, come va?",
            group_id: 0,
            user_id: 4,
            createdAt: "2022-09-27 08:53:58",
        },
        {
            id: 2,
            text: "Ciao, tutto bene, te?",
            group_id: 0,
            user_id: 6,
            createdAt: "2022-09-27 09:53:58",
        },
        {
            id: 3,
            text: "Ciao, tutto ok anche per me?",
            group_id: 0,
            user_id: 1,
            createdAt: "2022-09-27 09:53:58",
        },
    ], */// null, // {[ meta, preferences]}
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
    sync: { ...initialSync },

}

const chat = createSlice({
    name: "chat",
    initialState,
    reducers: {
        cleanChat: () => initialState,
        syncChatData(state, action) {
            // state.data = [...state.sync.data]
            state.sync = {...initialSync}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMessages.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (JSON.stringify(data) !== JSON.stringify(state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = { ...initialSync }
                    }
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // SYNC
            .addCase(syncChat.pending, (state, action) => {
                state.sync.status = 'loading'
            })
            .addCase(syncChat.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.sync.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data // console.log(data); // console.log(state.data);                    
                    if (!isDeepEqual(data, state.data)) {
                        const newMessages = data?.filter((item, index) => {
                            const finded = state?.data?.find(original => {
                                // console.log(original?.id);
                                return Number(original?.id) === (item?.id)
                            })
                            // console.log(finded);
                            return finded !== undefined ? false : true
                        })
                        // console.log(newMessages);
                        if (newMessages.length > 0) {
                            state.sync.data = [
                                ...state.sync.data,
                                ...newMessages,
                            ]
                        }
                        state.data = data
                    }
                }
                console.log(action);
            })
            .addCase(syncChat.rejected, (state, action) => {
                state.sync.status = 'failed'

            })
            // SAVE
            .addCase(saveMessage.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveMessage.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = { ...initialSync }
                    }
                    // state.data = action.payload?.data
                }

                // console.log(state);
                console.log(action);
            })
            .addCase(saveMessage.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // DELETE
            .addCase(deleteMessage.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = { ...initialSync }
                    }
                    // state.data = action.payload?.data
                }

                console.log(state);
                console.log(action);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectChat = (state) => state.chat
export const selectAllMessages = (state) => state.chat.data

export const getAllMessages = (state, rows = 10) => {
    // const rowsPerPage = 5
    const sorted = state.chat.data != null ? state.chat.data
        .slice()
        ?.sort(dynamicSortMultiple('-createdAt')) : []
    const reply = state.chat.data != null && state.chat.data?.length > rows ? sorted.slice(0, Number(rows)) : sorted.slice()

    return state.chat.data != null
        ? reply?.sort(dynamicSortMultiple('createdAt')) // state.chat.data.slice()?.sort(dynamicSortMultiple('-createdAt'))?.slice(0, Number(rowsPerPage * page))
        : state.chat.data;
}

export const getMessages = createSelector(
    [selectAllMessages],
    rows => rows
)

export const getCommonChannelMessages = createSelector(
    [selectAllMessages],
    rows => rows?.filter(row => Number(row.group_id) === 0)
)

export const getMessagesByChannel = createSelector(
    [selectAllMessages, (state, channelId) => channelId],
    (rows, channelId) => rows?.filter(row => Number(row.group_id) === Number(channelId))
)

export const getMessagesLength = (state) => state.chat.data?.length

export const getChatStatus = createSelector(
    [selectChat],
    chat => chat.status
)
// export const getChatStatus = (state) => state.chat.status;
export const getChatError = (state) => state.chat.error;

/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.chat.sync;
// export const getSyncStatus = (state) => state.shopping.syncStatus;
export const getChatSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getChatSyncData = createSelector(
    [getSyncState], (sync) => sync.data
)
// export const getChatSyncUpdate = createSelector(
//     [getSyncState], (sync) => sync.update
// )
// export const getChatSyncMessage = createSelector(
//     [getSyncState], (sync) => sync.message
// )
// export const getChatSyncTime = createSelector(
//     [getSyncState], (sync) => sync.time
// )

/**
 * EXPORTING
 */
export default chat.reducer;

export const { cleanChat, syncChatData } = chat.actions;

// Thunks - Actions
export const fetchMessages = createAsyncThunk('chat', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/chat')
        return response.data
    } catch (error) {
        return error.message
    }
})

// sync
export const syncChat = createAsyncThunk('chat/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/chat')
        return response.data
    } catch (error) {
        return error.message
    }
})

export const saveMessage = createAsyncThunk('chat/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/chat/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteMessage = createAsyncThunk('chat/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/chat/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})