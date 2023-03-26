// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import { axiosPrivate } from 'api/axios';

// utils
import { isDeepEqual } from 'utils/equal';

// config
import config from 'config';

const initialSync = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    update: false,
    message: 'Aggiornamento Dati Rubrica richiesto.',
    time: null,
}

const initialState = {
    data: null, // [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
    sync: { ...initialSync },
    // test
    // savingIDs: [],
}

const client = createSlice({
    name: 'client',
    initialState,
    reducers: {
        cleanClient: () => initialState,
        syncClientData(state, action) {
            if (state.sync.data) {
                state.data = [...state.sync.data]
                state.sync = { ...initialSync }
            }

            // state.sync = {
            //     data: null,
            //     status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
            //     update: false,
            //     message: 'Altri utenti hanno aggiunto elementi nella lista della spesa.',
            //     time: '',
            // }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchClients.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                const { status = false } = action.payload
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    // ?.map((client, index) => {
                    //     return prepareClient(client) // aux
                    // })
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                    }
                }
                // console.log(state);
                console.log(action);
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // SYNC Shopping Item
            .addCase(syncClients.pending, (state, action) => {
                // state.syncStatus = 'loading'
                state.sync.status = 'loading'
            })
            .addCase(syncClients.fulfilled, (state, action) => {
                const { status = false } = action.payload
                // state.syncStatus = status ? 'succeeded' : 'failed'
                state.sync.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    const dataStringify = JSON.stringify(data)
                    if (!isDeepEqual(data, state.data)) {
                        console.log('I have to update client Data');
                        if (!isDeepEqual(data, state.sync.data)) {
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
                        state.sync = { ...initialSync }
                    }
                }
                // state.sync.time = new Date().toISOString()
                // console.log(state);
                console.log(action);
            })
            .addCase(syncClients.rejected, (state, action) => {
                // state.syncStatus = 'failed'
                state.sync.status = 'failed'
                // state.error = action.error.message
            })
            // New Client
            .addCase(addClient.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addClient.fulfilled, (state, action) => {
                console.log(action.payload?.status); // console.log(action.payload?.success);
                // console.log(action.payload); console.log(action);
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    state.data = action.payload?.data
                    // ?.map((client, index) => {
                    //     return prepareClient(client) // aux
                    // })
                    state.sync = { ...initialSync }
                }
                // state.error = status ? null : action.payload.message
                // console.log(state);
                console.log(action);
            })
            .addCase(addClient.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Trash Client
            .addCase(trashClient.pending, (state, action) => {
                console.log(action);
                // const { clientID } = action?.meta?.arg
                // state.savingIDs = [...state.savingIDs, clientID]
                state.status = 'loading'
            })
            .addCase(trashClient.fulfilled, (state, action) => {
                console.log(action);
                // const { clientID } = action?.meta?.arg?.clientID
                // state.savingIDs = state.savingIDs?.filter((item) => item !== clientID)
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    state.data = action.payload?.data
                    // ?.map((client, index) => {
                    //     return prepareClient(client) // aux
                    // })
                    state.sync = { ...initialSync }
                }
            })
            .addCase(trashClient.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Active Client
            .addCase(activeClient.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(activeClient.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    state.data = action.payload?.data
                    // ?.map((client, index) => {
                    //     return prepareClient(client) // aux
                    // })
                    state.sync = { ...initialSync }
                }
            })
            .addCase(activeClient.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Delete Client
            .addCase(deleteClient.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    state.data = action.payload?.data
                    // ?.map((client, index) => {
                    //     return prepareClient(client) // aux
                    // })
                    state.sync = { ...initialSync }
                }
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// function prepareClient(client, savingIDs = []) {
//     return {
//         ...client,
//         color: getRandomColor(client?.last_name + " " + client?.first_name), // '#1890ff', // 
//         name: client?.last_name + " " + client?.first_name, // meta?.first_name + " " + user?.meta?.last_name,
//         text: client?.last_name + " " + client?.first_name, // + " " + client?.telephone,
//         chiperId: crypt(config.salt, client?.id), // getUserChiperString(client)),
//         // isSaving: savingIDs.includes(client?.id)
//     }
// }

export const selectClientsState = (state) => state.client;

export const getAllClients = createSelector(
    [selectClientsState],
    (client) => client.data
) // (state) => state.client.data
// export const getAllClientsActive = (state) => {
//     return state.client.data !== null
//         ? state.client.data.filter(client => client.status === 'active') // ?.map((client, index) => prepareClient(client, state.client.savingIDs))
//         : null
// };
export const selectAllClients = createSelector(
    [getAllClients],
    (rows) => rows?.map((client, index) => {
        return client // prepareClient(client) // aux
    })
)
export const getAllClientsActive = createSelector(
    [getAllClients],
    (rows) => rows.filter(client => client.status === 'active')?.map((client, index) => {
        return client // prepareClient(client) // aux
    })
)
export const getAllWorkableClients = createSelector(
    [getAllClients],
    (rows) => rows.filter(client => client.status !== 'trash')?.map((client, index) => {
        return client // prepareClient(client) // aux
    })
)
export const getAllTrashClients = createSelector(
    [getAllClients],
    (rows) => rows.filter(client => client.status === 'trash')?.map((client, index) => {
        return client // prepareClient(client) // aux
    })
)
export const getAllClientsInactive = createSelector(
    [getAllClients],
    (rows) => rows.filter(client => client.status === 'inactive')?.map((client, index) => {
        return client // prepareClient(client) // aux
    })
)

export const getClientById = createSelector(
    [getAllClients, (state, id) => id],
    (clients, id) => {
        const client = clients.find(client => Number(client.id) === Number(id))
        return client !== undefined ? client /* prepareClient(client) */ : undefined
    }
)
// export const getClientById = (state, id) => state.client.data.find(client => Number(client.id) === Number(id));
// export const getClientByCF = (state, codFisc) => state.client.data.find(client => client.piva === codFisc);
export const getClientByCF = createSelector(
    [getAllClients, (state, codFisc) => codFisc],
    (clients, codFisc) => {
        const client = clients.find(client => client.piva === codFisc)
        return client !== undefined ?  client /* prepareClient(client) */ : undefined
    }
    // (clients, codFisc) => clients.find(client => client.piva === codFisc)
)

export const getClientByChiperId = (state, chiperID) => {

    const finded = state.client.data.find(client => {
        return String(client.chiperId) === String(chiperID)
    })
    return finded //  ? finded[0] : null
};
export const selectClientByChiperId = createSelector(
    [getAllClients, (state, chiperId) => chiperId],
    (clients, chiperId) => clients?.map((client, index) => {
        return client // prepareClient(client) // aux
    }).find(client => {
        // const decripted = decrypt(config.salt, chiperId) // ?.substring(4)
        // // console.log(decripted);
        // return Number(decripted) === Number(client.id)
        return String(client.chiperId) === String(chiperId)
    })
)
// utils
export const getClientsStatus = createSelector(
    [selectClientsState],
    client => client.status
)
// export const getClientsStatus = (state) => state.client.status;
export const getClientsError = (state) => state.client.error;

// export const getClientsSavingIDs = (state) => state.client.savingIDs;
/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.client.sync;
// export const getSyncStatus = (state) => state.shopping.syncStatus;
export const getClientsSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getClientsSyncUpdate = createSelector(
    [getSyncState], (sync) => sync.update
)
export const getClientsSyncMessage = createSelector(
    [getSyncState], (sync) => sync.message
)
export const getClientsSyncTime = createSelector(
    [getSyncState], (sync) => sync.time
)


/**
 * EXPORTING
 */
export default client.reducer;

export const { cleanClient, syncClientData } = client.actions;

// Thunks - Actions
export const fetchClients = createAsyncThunk('client/list', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clients')
        return response.data
    } catch (error) {
        return error.message
    }
})

export const syncClients = createAsyncThunk('client/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clients')
        return response.data
    } catch (error) {
        return error.message
    }
})

export const addClient = createAsyncThunk('client/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clients/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteClient = createAsyncThunk('client/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clients/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const trashClient = createAsyncThunk('client/trash', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clients/trash', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const activeClient = createAsyncThunk('client/active', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/clients/active', data)
        return response.data
    } catch (error) {
        return error.message
    }
})