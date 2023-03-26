// types
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// project import
import { axiosPrivate } from 'api/axios';

// utils
import { getInvoicesMax } from 'utils/app/invoice/invoice';
import { crypt } from 'utils/crypto';
import { isDeepEqual } from 'utils/equal';

// config
import config from 'config';

const initialSync = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    update: false,
    message: 'Altri utenti hanno modificato le Fatture',
    time: null,
}
const initialState = {
    data: null,
    max: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
    sync: { ...initialSync }
}

const invoice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        cleanInvoice: () => initialState,
        syncInvoiceData(state, action) {
            if (state.sync.data) {
                state.data = [...state.sync.data]
                state.sync = { ...initialSync }
            }
        }
    },
    extraReducers(builder) {
        builder
            // GET FETCH
            .addCase(fetchInvoices.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data?.map((row, index) => {
                //     return prepareInvoice(row) // aux
                // })
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    // ?.map((row, index) => {
                    //     return prepareInvoice(row) // aux
                    // })
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = { ...initialSync }
                    }
                }

                state.max = getInvoicesMax(action.payload?.data)

                // console.log(state);
                console.log(action);
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // SYNC INVOICE
            .addCase(syncInvoices.pending, (state, action) => {
                // state.syncStatus = 'loading'
                state.sync.status = 'loading'
            })
            .addCase(syncInvoices.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.sync.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        console.log('Different Invoices');
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
                // state.sync.time = new Date().toISOString()
                // console.log(state);
                console.log(action);
            })
            .addCase(syncInvoices.rejected, (state, action) => {
                state.sync.status = 'failed'
            })
            // SAVE
            .addCase(saveInvoice.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveInvoice.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.data = action.payload?.data
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    // state.data = action.payload?.data
                    // // ?.map((row, index) => {
                    // //     return prepareInvoice(row) // aux
                    // // })
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.data)) {
                        state.data = data
                        // reinitial the sync
                        state.sync = {...initialSync}
                    }
                    state.max = getInvoicesMax(data)
                }

                // console.log(state);
                console.log(action);
            })
            .addCase(saveInvoice.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // DELETE
            .addCase(deleteInvoice.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
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
                    state.max = getInvoicesMax(data)
                }

                // console.log(state);
                console.log(action);
            })
            .addCase(deleteInvoice.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectInvoice = state => state.invoice

function prepareInvoice(invoice) {
    return {
        ...invoice,
        chiperId: crypt(config.salt, String(invoice?.id))
    }
}

export const getInvoicesList = createSelector(
    [selectInvoice],
    invoice => invoice.data
)
// export const getInvoicesList = (state) => state.invoice.data
// ?.map((row, index) => {
//     return prepareInvoice(row) // aux
// })
export const getAllInvoices = createSelector(
    [getInvoicesList],
    data => data?.map((row, index) => {
        return prepareInvoice(row) // aux
    })
)  // ?.map((invoice, index) => prepareInvoice(invoice));
export const getInvoiceById = createSelector(
    [getInvoicesList, (state, id) => id],
    (invoices, id) => {
        const finded = invoices.find(item => Number(item.id) === Number(id))
        return finded ? prepareInvoice(finded) : undefined
    }
)
// export const getInvoiceById = (state, invoiceId) => {
//     const item = Array.isArray(state.invoice?.data) ? state.invoice.invoices?.find((invoice, index) => invoice.id === invoiceId) : false
//     return item
// }
export const getInvoiceByChiperId = createSelector(
    [getInvoicesList, (state, chiperId) => chiperId],
    (invoices, chiperId) => {
        const finded = invoices.find(item => String(item.chiperId) === String(chiperId))
        return finded ? prepareInvoice(finded) : undefined
    }
    // (invoices, chiperId) => invoices.find(item => String(item.chiperId) === String(chiperId))
)
// export const getInvoiceByChiperId = (state, chiperID) => {
//     // const finded = prepareInvoice(state.invoice.data.find(invoice => {
//     //     const decripted = decrypt(config.salt, chiperID) // ?.substring(4)
//     //     // console.log(decripted);
//     //     return Number(decripted) === Number(invoice.id)
//     // }))
//     // // console.log(finded);
//     // // console.log(finded[0]);
//     const finded = state.invoice.data.find(invoice => {
//         return String(invoice.chiperId) === String(chiperID)
//     })
//     return finded
// };

// export const getJournalByEventId = (state, eventID) => state.clinical?.data ? state.clinical?.data.filter(journal => Number(journal.eventId) === Number(eventID)) : null;
export const getInvoiceByClient = createSelector(
    [getInvoicesList, (state, client) => client],
    (invoices, client) => invoices.filter((invoice, index) =>
        invoice?.clientId
            ? invoice?.clientId === client?.id
            : invoice?.client_piva === client?.piva
    )?.map((row, index) => {
        return prepareInvoice(row) // aux
    })
)
// export const getInvoiceByClient = (state, client) => {
//     return state.invoice?.data
//         ? (state.invoice.data?.filter((invoice, index) =>
//             invoice?.clientId
//                 ? invoice?.clientId === client?.id
//                 : invoice?.client_piva === client?.piva))
//                 // ?.map((invoice, index) => prepareInvoice(invoice)))
//         : null;
//     // const items = Array.isArray()
//     //     ? state.invoice.invoices?.filter((invoice, index) =>
//     //         invoice?.clientId
//     //             ? invoice?.clientId === client.id
//     //             : invoice?.client_piva === client.piva)
//     //     : false
//     // return items
// }
// export const getInvoicesMax = (data) => {
//     let res = undefined
//     if (Array.isArray(data)) {
//         res = data.slice().sort(dynamicSortMultiple('-number', '-duplicate'))[0] // ?.number        
//     }
//     return res ? res : undefined // return state.invoice.invoices.slice().sort((a, b) => (a.number > b.number) ? 1 : -1) // state.invoice.invoices.dynamicSort('number')[0]?.number
// };
export const getInvoicesStatus = createSelector(
    [selectInvoice],
    invoice => invoice.status
)
// export const getInvoicesStatus = (state) => state.invoice.status;
export const getInvoicesError = (state) => state.invoice.error;

/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.invoice.sync;
// export const getShoppingSyncStatus = (state) => state.shopping.syncStatus;
export const getInvoicesSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getInvoicesSyncUpdate = createSelector(
    [getSyncState], (sync) => sync.update
)
export const getInvoicesSyncMessage = createSelector(
    [getSyncState], (sync) => sync.message
)
export const getInvoicesSyncTime = createSelector(
    [getSyncState], (sync) => sync.time
)


/**
 * EXPORTING
 */
export default invoice.reducer;

export const { cleanInvoice, syncInvoiceData } = invoice.actions;

// Thunks - Actions
export const fetchInvoices = createAsyncThunk('invoice/list', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/invoices')
        return response.data
    } catch (error) {
        return error.message
    }
})

// sync
export const syncInvoices = createAsyncThunk('invoice/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/invoices')
        return response.data
    } catch (error) {
        return error.message
    }
})

export const saveInvoice = createAsyncThunk('invoice/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/invoices/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteInvoice = createAsyncThunk('invoice/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/invoices/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})