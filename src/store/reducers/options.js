// types
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import { axiosPrivate } from 'api/axios';
import { isDeepEqual } from 'utils/equal';

const initialSync = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    update: false,
    message: 'Dettagli azienda cambiati, necessaria sincronizzazione.',
    time: null,
}
const initialState = {
    options: null,
    // banks: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
    sync: {...initialSync},
}

const options = createSlice({
    name: 'options',
    initialState,
    reducers: {
        cleanOptions: () => initialState,
        syncOptionsData(state, action) {
            if (state.sync.data) {
                state.options = state.sync.data
                state.sync = {...initialSync}
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOptions.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchOptions.fulfilled, (state, action) => {
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                // state.options = action.payload?.data
                const { status = false } = action.payload
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.options)) {
                    // if (JSON.stringify(data) !== JSON.stringify(state.options)) {
                        state.options = data
                    }
                }
                // // console.log(state);
                // console.log(action);
            })
            .addCase(fetchOptions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // RE-SYNC
            .addCase(syncOptions.pending, (state, action) => {
                state.sync.status = 'loading'
            })
            .addCase(syncOptions.fulfilled, (state, action) => {
                const { status = false } = action.payload
                state.sync.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.options)) {
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
                // // console.log(state);
                console.log(action);
            })
            .addCase(syncOptions.rejected, (state, action) => {
                state.sync.status = 'failed'
            })
            // Company -- save
            .addCase(saveCompanyOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveCompanyOption.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.options = action.payload?.data // state.options.doctor_option = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(saveCompanyOption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Bench -- save
            .addCase(saveBankOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveBankOption.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.options = action.payload?.data // state.options.doctor_banks_option = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(saveBankOption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Bench -- delete
            .addCase(deleteBenchOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteBenchOption.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.options = action.payload?.data // state.options.doctor_banks_option = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(deleteBenchOption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Service -- save
            .addCase(saveServiceOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveServiceOption.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.options = action.payload?.data // state.options.services_option = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(saveServiceOption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Service -- delete
            .addCase(deleteServiceOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteServiceOption.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.options = action.payload?.data // state.options.services_option = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(deleteServiceOption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Iva -- save
            .addCase(saveIvaOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveIvaOption.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.options = action.payload?.data // state.options.iva_option = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(saveIvaOption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message

                console.log(action);
            })
            // Iva -- delete
            .addCase(deleteIvaOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteIvaOption.fulfilled, (state, action) => {
                state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.options = action.payload?.data // state.options.iva_option = action.payload?.data

                // console.log(state);
                console.log(action);
            })
            .addCase(deleteIvaOption.rejected, (state, action) => {
                state.deleteIvaOption = 'failed'
                state.error = action.error.message
            })
            // SETTINGS -- save
            .addCase(saveSettingsOption.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveSettingsOption.fulfilled, (state, action) => {
                const { status = false } = action.payload
                // state.status = action.payload?.status ? 'succeeded' : 'failed'
                state.status = status ? 'succeeded' : 'failed'
                if (status) {
                    const data = action.payload?.data
                    if (!isDeepEqual(data, state.options)) {
                        state.options = data
                    }
                } // state.options = action.payload?.data // state.options.iva_option = action.payload?.data
                // console.log(state);
                console.log(action);
            })
            .addCase(saveSettingsOption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message

                console.log(action);
            })
    }
})

export const selectOptionsState = (state) => state.options;

export const getOptions = createSelector(
    [selectOptionsState],
    options => options.options
)
// export const getOptions = (state) => state.options.options;
// Base
export const getOptionsBasePayment = (state) => state.options.options?.base_option?.payment;
export const getOptionsFavouritePayment = (state) => {
    const items = state.options.options?.base_option?.payment
    const res = items?.find(el => el.code == state.options.options?.settings?.preferences?.payment_id)
    return res
}
export const getOptionsBaseDuplicate = (state) => state.options.options?.base_option?.duplicate;
// Config
export const getOptionsConfig = (state) => state.options.options?.config_option;
export const getOptionsConfigPreferences = (state) => state.options.options?.settings?.preferences;
// Doctor / Company
export const getOptionsDoctor = (state) => state.options.options?.doctor_option;
// Services
export const getOptionsServices = createSelector(
    [getOptions],
    data => data?.services_option
)

// export const getOptionsServices = (state) => state.options.options?.services_option;
// Banks
// export const getOptionsBenches = (state) => state.options.options?.doctor_banks_option
export const getOptionsBanks = (state) => state.options.options?.doctor_banks_option
export const getOptionsFavouriteBench = (state) => {
    const items = state.options.options?.doctor_banks_option
    const res = items?.find(el => el.favourite)
    return res
}
// Base IVA
export const getOptionsIva = (state) => state.options.options?.iva_option;
export const getOptionsFavouriteVat = (state) => {
    const items = state.options.options?.iva_option;
    const res = items?.find(el => el.favourite)
    return res
}

// SETTINGS
export const getOptionsSettings = createSelector(
    [getOptions],
    options => options?.settings
)
export const getOptionsSchedulerSettings = createSelector(
    [getOptionsSettings],
    options => options?.scheduler
)
// utils
export const getOptionsStatus = createSelector(
    [selectOptionsState],
    options => options.status
)
// export const getOptionsStatus = (state) => state.options.status;
export const getOptionsError = (state) => state.options.error;

/**
 * RE SYNC actions
 */
export const getSyncState = (state) => state.options.sync;
// export const getShoppingSyncStatus = (state) => state.shopping.syncStatus;
export const getOptionsSyncStatus = createSelector(
    [getSyncState], (sync) => sync.status
)
export const getOptionsSyncUpdate = createSelector(
    [getSyncState], (sync) => sync.update
)
export const getOptionsSyncMessage = createSelector(
    [getSyncState], (sync) => sync.message
)
export const getOptionsSyncTime = createSelector(
    [getSyncState], (sync) => sync.time
)
// export const getSyncUpdate = (state) => state.shopping.syncUpdate;
// export const getSyncMessage = (state) => state.shopping.syncMessage;
export const getSyncData = (state) => state.shopping.syncData;


/**
 * EXPORTING
 */
export default options.reducer;

export const { cleanOptions, syncOptionsData } = options.actions;

// Thunks - Actions
export const fetchOptions = createAsyncThunk('options/data', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options')
        return response.data
    } catch (error) {
        return error.message
    }
})

// Thunks - Actions
export const syncOptions = createAsyncThunk('options/sync', async () => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options')
        return response.data
    } catch (error) {
        return error.message
    }
})

// Company Save
export const saveCompanyOption = createAsyncThunk('options/company/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/company/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// BENCH Save
export const saveBankOption = createAsyncThunk('options/bank/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/bank/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// BENCH Delete
export const deleteBenchOption = createAsyncThunk('options/bank/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/bank/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// SERVICE Save
export const saveServiceOption = createAsyncThunk('options/service/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/service/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// SERVICE Delete
export const deleteServiceOption = createAsyncThunk('options/service/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/service/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// IVA Save
export const saveIvaOption = createAsyncThunk('options/iva/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/iva/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

// IVA Delete
export const deleteIvaOption = createAsyncThunk('options/iva/delete', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/iva/delete', data)
        return response.data
    } catch (error) {
        return error.message
    }
})


// SETTINGS Save
export const saveSettingsOption = createAsyncThunk('options/settings/save', async (data) => {
    try {
        // const axiosPrivate = useAxiosPrivate()
        const response = await axiosPrivate.post('/options/settings/save', data)
        return response.data
    } catch (error) {
        return error.message
    }
})
// a: 13: { s: 12: "company_name"; s: 44: "Studio Medico Odontoiatrico Dott. F. Farneti"; s: 10: "first_name"; s: 8: "Federico"; s: 9: "last_name"; s: 7: "Farneti"; s: 4: "piva"; s: 13: "1250045879996"; s: 8: "cod_fisc"; s: 15: "FGLERCLAASHH55A"; s: 9: "telephone"; s: 10: "3455698794"; s: 5: "email"; s: 16: "drew@example.com"; s: 3: "pec"; s: 21: "mrdc@legalmail.pec.it"; s: 7: "address"; s: 19: "Via della factory 2"; s: 8: "zip_code"; i: 14567; s: 8: "province"; s: 6: "Genova"; s: 6: "region"; s: 7: "Liguria"; s: 5: "state"; s: 6: "Italia"; }
// a: 3: { s: 7: "payment"; a: 4: { i: 0; a: 2: { s: 4: "code"; s: 3: "ctn"; s: 5: "label"; s: 8: "Contanti"; } i: 1; a: 2: { s: 4: "code"; s: 2: "bb"; s: 5: "label"; s: 17: "Bonifico Bancario"; } i: 2; a: 2: { s: 4: "code"; s: 2: "ab"; s: 5: "label"; s: 16: "Assegno Bancario"; } i: 3; a: 2: { s: 4: "code"; s: 2: "cc"; s: 5: "label"; s: 18: "Carte di pagamento"; } } s: 9: "duplicate"; a: 4: { i: 0; a: 3: { s: 4: "code"; s: 1: "i"; s: 5: "label"; s: 0: ""; s: 6: "number"; i: 1;} i: 1; a: 3: { s: 4: "code"; s: 2: "ii"; s: 5: "label"; s: 3: "Bis"; s: 6: "number"; i: 2;} i: 2; a: 3: { s: 4: "code"; s: 3: "iii"; s: 5: "label"; s: 3: "Ter"; s: 6: "number"; i: 3; } i: 3; a: 3: { s: 4: "code"; s: 2: "iv"; s: 5: "label"; s: 6: "Quater"; s: 6: "number"; i: 3; } } s: 12: "clients_type"; a: 5: { s: 9: "FISICALLY"; s: 14: "Persona fisica"; s: 8: "LIB_PROF"; s: 21: "Libero professionista"; s: 7: "COMPANY"; s: 7: "Azienda"; s: 2: "PA"; s: 24: "Pubblica Amministrazione"; s: 7: "FORFAIT"; s: 17: "Regime Forfetario"; } }