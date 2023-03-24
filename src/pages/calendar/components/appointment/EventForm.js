import React, { useState } from 'react'

// material-ui
import {
    Autocomplete,
    Button,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
// styled

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Dayjs
import dayjs from 'dayjs' // ES 2015

// project import
import DateTimePickerInput from 'components/input/formik/DateTimePickerInput';
import AutocompleteInput from 'components/input/formik/AutocompleteInput';
import DeleteButton from 'components/button/DeleteButton';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import BasicSelect from 'components/input/BasicSelect';
import BootstrapDialog from 'components/dialog/bootstrap-dialog/BootstrapDialog';
import ClientsAutocompleteField from 'components/input/app-autocomplete/ClientsAutocompleteField';

// Store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { addClient } from 'store/reducers/client';
import { getOptionsServices } from 'store/reducers/options';
import { getAllUsers } from 'store/reducers/users';
import { getCalendarCopiedRow, saveEvent, updateEvent } from 'store/reducers/calendar';
import { addNotice } from 'store/reducers/notices';
// utils
import { buildNotice } from 'utils/app/notice';

// assets
import {
    SaveOutlined,
} from '@ant-design/icons';
import ReplayIcon from '@mui/icons-material/Replay';
import { BiPaste } from 'react-icons/bi'

// assets
import { TbCalendarTime } from 'react-icons/tb'

import useCryptoJS from 'hooks/useCryptoJS';
import useClients from 'hooks/redux/useClients';
import SchedulerDatePicker from 'pages/calendar/common/SchedulerDatePicker';

const validationSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Campo obbligatorio'), // .nullable(),
    startDate: Yup.date().required('Campo obbligatorio'),
    endDate: Yup.date(),
    userId: Yup.number().required('Campo obbligatorio'),
    clientId: Yup.number().required('Paziente obbligatorio'),
    notes: Yup.string().max(255),
    // comment: Yup.string().max(255),
})

const EventForm = ({
    formData = null,
    initial = {},
    visibleParameters = {},
    // copyingData = null,
    ...others
}) => {
    const dispatch = useDispatch()

    // -- slices
    // client
    const clientsData = useClients() // useSelector(selectAllClients)
    const clientsList = clientsData?.clients // useSelector(selectAllClients)
    // services
    const servicesList = useSelector(getOptionsServices)
    // users
    const usersList = useSelector(getAllUsers)

    // COPIED DATA
    const copyingData = useSelector(getCalendarCopiedRow)
    // console.log(copyingData);
    const [isRegistered, setIsRegistered] = useState(true) //  useState(formData != null ? (formData?.clientId > 0 ? true : false) : true)

    const [openSchedulerPicker, setOpenSchedulerPicker] = useState(false) //  useState(formData != null ? (formData?.clientId > 0 ? true : false) : true)

    const visibleData = {
        // id: true,
        title: true,
        dateTime: true,
        recall: true,
        // allDay: true,
        // confirmation: false,
        status: true,
        user: true,
        client: true,
        status: true,
        notes: true,
        ...visibleParameters
    }
    const defaultValues = {
        id: "",
        title: '',
        serviceId: 0,
        hasRecall: 1,
        recallAfter: '',
        recallStatus: 'active',
        startDate: dayjs().minute(0).second(0).format(), // new Date(), // '',
        endDate: dayjs().minute(30).second(0).format(), // new Date(),
        allDay: false,
        // confirmation: false,
        status: 'active',
        userId: '',
        clientId: '',
        clientName: '',
        clientLastName: '',
        notes: '',
        // comment: '',
        // confirmed: true,
        submit: null
    }
    const initialValues = formData != null ? {
        id: formData?.id ? formData.id : defaultValues?.id,
        title: formData?.title ? formData.title : defaultValues?.title,
        serviceId: formData?.serviceId ? formData.serviceId : defaultValues.serviceId,
        hasRecall: formData?.hasRecall ? formData.hasRecall : defaultValues?.hasRecall,
        recallAfter: formData?.recallAfter ? formData.recallAfter : defaultValues?.recallAfter,
        recallStatus: formData?.recallStatus ? formData.recallStatus : defaultValues?.recallStatus,
        startDate: formData?.startDate ? dayjs(formData?.startDate).format() : defaultValues?.startDate,
        endDate: formData?.endDate ? dayjs(formData?.endDate).format() : defaultValues?.endDate,
        allDay: formData?.allDay ? formData.allDay : defaultValues?.allDay,
        // confirmation: formData?.confirmation ? Boolean(formData.confirmation) : false,
        status: formData?.status ? formData.status : defaultValues?.status,
        clientId: formData?.clientId ? formData.clientId : defaultValues?.clientId,
        clientName: '',
        clientLastName: '',
        userId: formData?.userId ? formData.userId : defaultValues?.userId,
        notes: formData?.notes ? formData.notes : defaultValues?.notes,
        // comment: formData?.comment ? formData.comment : '',
        // ...formData,
        submit: null
    } : {
        ...defaultValues,
        ...initial
        // id: "",
        // title: '',
        // startDate: dayjs().minute(0).second(0).format(), // new Date(), // '',
        // endDate: dayjs().minute(30).second(0).format(), // new Date(),
        // allDay: false,
        // confirmation: false,
        // userId: '',
        // clientId: '',
        // clientName: '',
        // clientLastName: '',
        // notes: '',
        // // comment: '',
        // // confirmed: true,
        // submit: null
    }
    console.log(initialValues);

    // Date Touches
    const [startDateTouch, setStartDateTouch] = React.useState(false)
    const [endDateTouch, setEndDateTouch] = React.useState(false)
    // states
    const [clientSelected, setClientSelected] = React.useState(
        initialValues?.clientId > 0 ? (clientsList.find(client => Number(client.id) === Number(initialValues?.clientId))) : null
    )
    const [workerSelected, setWorkerSelected] = React.useState(
        initialValues?.userId > 0 ? (usersList.find(user => Number(user.ID) === Number(initialValues?.userId))) : null
    ) // console.log(workerSelected);

    const cryptoJS = useCryptoJS()

    const submitAppointment = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        try {
            if (!isRegistered) {
                const clientName = cryptoJS.encrypt(values?.clientName)
                const clientLastName = cryptoJS.encrypt(values?.clientLastName)
                const { query } = await dispatch(addClient({
                    first_name: clientName,
                    last_name: clientLastName,
                    forceInsert: true,
                })).unwrap() // 
                console.log(query);

                const clientID = query?.id

                values.clientId = clientID
            }
            const dataValues = {
                ...values,
                title: cryptoJS.encrypt(values?.title),
                notes: cryptoJS.encrypt(values?.notes),
            }

            const resultAction = await dispatch(saveEvent(dataValues)).unwrap() // console.log(resultAction);
            console.log('Success');

            console.log(resultAction);

            const notice = buildNotice(resultAction)
            // notice.content = resultAction?.message ? resultAction.message : ""
            // notice.severity = resultAction?.status ? 'success' : "error"
            dispatch(addNotice(notice))

            setStatus({ success: true });
            setSubmitting(false);

            // if (formData != null) {
            //     others?.afterSubmitCallback && others?.afterSubmitCallback()
            // } else {
            //     resetForm()
            // }
        } catch (err) {
            console.log('Failed');

            const notice = {}
            notice.content = err?.message ? err.message : ""
            notice.severity = "error"
            dispatch(addNotice({ ...notice }))

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
        // return true
    }

    const handleSubmitDelete = async (value) => {
        console.log(value);
        const dataValues = {
            eventID: value, // appointmentData?.id,
            parameter: 'status',
            value: 'trash', // 'confirmed',
        }
        try {
            const resultAction = await dispatch(updateEvent({ ...dataValues, })).unwrap() // console.log(resultAction);
            console.log('Success');

            const notice = buildNotice(resultAction)
            dispatch(addNotice(notice))
        } catch (err) {
            console.log('Failed');
        }
        // try {
        //     const resultAction = await dispatch(deleteEvent({ eventID: value })).unwrap() // console.log(resultAction);
        //     console.log('Success');

        //     const notice = buildNotice(resultAction)
        //     dispatch(addNotice(notice))

        // } catch (err) {
        //     console.log('Failed');
        // }
    }

    const handleSchedulerDatePicker = (data, setFieldValue) => {
        console.log(data);

        setOpenSchedulerPicker(false)

        const { startDate = "", endDate = "" } = data
        setFieldValue('startDate', startDate)
        setFieldValue('endDate', endDate)
    }

    const handlePaste = (values, setFieldValue) => {
        console.log('Pasting Data');

        Object.keys(values)?.map((key/* , index */) => {
            setFieldValue(key, values[key])
        })
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={submitAppointment}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                    <>
                        <form noValidate onSubmit={handleSubmit/* window.confirm('Are you sure?') ? handleSubmit() : false */}>
                            <Grid container spacing={2} sx={{ paddingRight: '16px', maxWidth: '100%', mt: 0, ml: 0 }} >
                                {/* HEADER */}
                                <Grid item xs={12} sx={{ /* paddingRight: '16px', */ mb: 1 }} >
                                    <Stack direction="row" justifyContent="space-between" sx={{ minWidth: '100%' }} >
                                        <Typography variant="h6b" sx={{ display: 'flex', alignSelf: 'center' }} >Dettagli</Typography>
                                        <Stack sx={{ mb: .5 }} direction="row" spacing={1} >
                                            <IconButton
                                                // disabled={isSubmitting}
                                                disabled={copyingData !== null ? Object.keys(copyingData).length < 1 : true}
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => { handlePaste(copyingData, setFieldValue) }}
                                            >
                                                <BiPaste size={25} />
                                            </IconButton>
                                            <IconButton
                                                disabled={isSubmitting}
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => { resetForm(); }}
                                            >
                                                <ReplayIcon />
                                            </IconButton>
                                            {values?.id && (
                                                <DeleteButton
                                                    disabled={isSubmitting}
                                                    label=""
                                                    onConfirm={() => { return values?.id > 0 ? handleSubmitDelete(values?.id) : false }}
                                                />
                                            )}
                                            <Divider orientation="vertical" />
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            // onClick={() => window.confirm("Are you sure")}
                                            >
                                                <SaveOutlined />
                                            </Button>

                                        </Stack>
                                    </Stack>
                                    <Divider variant="middle" />
                                </Grid>

                                {/* TIME */}
                                {visibleData?.dateTime && <Grid item xs={12} sx={{ mb: 1 }} >
                                    <Grid container spacing={2} >
                                        {/* START DATE */}
                                        <Grid item xs={5}/*  sm={4} */ >
                                            <DateTimePickerInput
                                                id="startDate-event"
                                                name="startDate"
                                                label="Data Inizio"
                                                inputValue={values.startDate}
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                                handleBlur={handleBlur}
                                                handleChange={(value) => {
                                                    console.log(value);
                                                    setFieldValue("startDate", value, true);
                                                    if (!startDateTouch) {
                                                        setStartDateTouch(true)
                                                    }
                                                    if (!endDateTouch) {
                                                        setFieldValue("endDate", dayjs(value).add(30, "m").format() /* .toString() */, true);
                                                    }
                                                }} // {(value) => { setFieldValue("startDate", dayjs(value).format(), true); console.log(value); }}
                                            />
                                        </Grid>
                                        {/* END DATE */}
                                        <Grid item xs={5}/*  sm={4}  > // </Grid><Grid item xs={6} sm={4}*/ >
                                            <DateTimePickerInput
                                                id="endDate-event"
                                                name="endDate"
                                                label="Data Fine"
                                                inputValue={values.endDate}
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                                handleBlur={handleBlur}
                                                handleChange={(value) => {
                                                    setFieldValue("endDate", value, true);
                                                    if (!endDateTouch) {
                                                        setEndDateTouch(true)
                                                    }
                                                    if (!endDateTouch) {
                                                        setFieldValue("startDate", dayjs(value).add(-30, "m").format() /* .toString() */, true);
                                                    }
                                                }} // {(value) => { setFieldValue("startDate", dayjs(value).format(), true); console.log(value); }}
                                            />
                                        </Grid>

                                        <Grid item xs={2} >
                                            <Stack direction="row" alignItems="center">
                                                <Button onClick={() => { setOpenSchedulerPicker(true) }}>
                                                    <Stack direction="row" alignItems="center" gap={1}>
                                                        <TbCalendarTime />
                                                        <Typography>Apri</Typography>
                                                    </Stack>
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>}

                                {/* TITLE /  */}
                                {visibleData?.title && <Grid item xs={12} sm={10} >
                                    <Autocomplete
                                        disablePortal
                                        freeSolo
                                        id={`event-title`}
                                        name={`title`}
                                        options={servicesList}
                                        noOptionsText='Nessun servizio disponibile'
                                        getOptionLabel={option => option.description ? option.description : ""}
                                        isOptionEqualToValue={(option, value) => option.value === value.value} // isOptionEqualToValue={(option, value) => value.description === option.description /* option.id === value.id */}
                                        onChange={(e, value) => {
                                            setFieldValue('title', value?.description ? value.description : "");
                                            setFieldValue('recallAfter', Number(value?.recurrency) > 0 ? Number(value?.recurrency) : defaultValues.recallAfter);
                                            setFieldValue('serviceId', value?.id ? value.id : defaultValues.serviceId);
                                        }}
                                        value={{
                                            description: values?.title ? values.title : "",
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                id="event_title_field" // id={`services_description_field`}
                                                name="event_title_field" // name={`services_description_field`}
                                                // value={values.title}
                                                size="small"
                                                placeholder="Seduta di igiene dentale"
                                                fullWidth
                                                variant="outlined"
                                                label="Titolo"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFieldValue('title', e.currentTarget.value);
                                                    setFieldValue('serviceId', defaultValues.serviceId);
                                                }}
                                                error={Boolean(touched.title && errors.title)}
                                            />
                                        }
                                    />
                                    {touched.title && errors.title && (
                                        <FormHelperText error id="helper-text-event-title">
                                            {errors.title}
                                        </FormHelperText>
                                    )}
                                </Grid>}

                                {/** RECALL **/}
                                {visibleData?.recall && <Grid item xs={12} sx={{ mb: 1 }} >
                                    <Grid container>
                                        <Grid item xs={6} sm={4} sx={{ mb: '0.7rem', }} >
                                            <FormControl sx={{ /* flexDirection: "row" *//* , alignItems: 'start' , gap: 2,*/ pl: '.9rem', }} >
                                                <FormLabel id="hasRecall-event-radio-buttons-group" sx={{ fontSize: '.65rem', lineHeight: '.8rem', }}>
                                                    Richiamo
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="hasRecall-event-radio-buttons-group"
                                                    id="hasRecall-event"
                                                    name="hasRecall"
                                                    value={values.hasRecall}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    sx={{ flexDirection: "row", }}
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        control={<Radio size="small" />}
                                                        label="Si"
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                    />
                                                    <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />
                                                    <FormControlLabel
                                                        value="0"
                                                        control={<Radio size="small" />}
                                                        label="No"
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        {Number(values.hasRecall) === 1 && <Grid item xs={12} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={6} sm={4} style={{ paddingTop: '0.8rem', }}>
                                                    <BasicOutlinedInput
                                                        id="event-recallAfter"
                                                        name="recallAfter"
                                                        type="number"
                                                        label="Durata Cicilicità"
                                                        placeholder="In gg"
                                                        inputValue={values.recallAfter}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>

                                                <Grid item xs={6} sm={4} style={{ paddingTop: '0.8rem', }}>
                                                    <BasicSelect
                                                        id="event-recallStatus"
                                                        name="recallStatus"
                                                        label="Stato"
                                                        inputValue={values.recallStatus}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        options={{
                                                            active: 'Attivo',
                                                            confirmed: 'Eseguito',
                                                            deleted: 'Annullato',
                                                        }}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>}
                                    </Grid>
                                </Grid>}


                                {/* PAZIENTE */}
                                {visibleData?.client && <Grid item xs={12} sm={12} >
                                    <Stack direction="row" spacing={2} /* sx={{ "*": {
                                    width: "100%"
                                }}} */ >
                                        <div style={{ width: "100%" }}>
                                            {isRegistered ? <>
                                                <ClientsAutocompleteField
                                                    id={`event-clientId`}
                                                    name={`clientId`}
                                                    label="Paziente"
                                                    placeholder="Cerca per nome / codice fiscale / P.IVA"
                                                    inputValue={values.clientId}
                                                    values={values}
                                                    touched={touched}
                                                    errors={errors}
                                                    handleBlur={handleBlur}
                                                    options={clientsList ? clientsList : []}
                                                    getOptionLabel={option => option?.first_name ? option?.first_name + ' ' + option?.last_name + ' - ' + option?.piva : ""}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id} // isOptionEqualToValue={(option, value) => value.description === option.description }
                                                    identifierField="id"
                                                    noOptionsText='Nessun paziente disponibile'
                                                    handleChange={(value) => {
                                                        setFieldValue('clientId', value?.id ? value.id : "");
                                                    }}
                                                />
                                            </> :
                                                <Stack direction="row" spacing={1} >
                                                    <BasicOutlinedInput
                                                        id="event-clientName"
                                                        name="clientName"
                                                        label="Nome *"
                                                        placeholder="Mario"
                                                        inputValue={values.clientName}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    // readOnly={!isEditable}
                                                    />
                                                    <BasicOutlinedInput
                                                        id="event-clientLastName"
                                                        name="clientLastName"
                                                        label="Cognome *"
                                                        placeholder="Rossi"
                                                        inputValue={values.clientLastName}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    // readOnly={!isEditable}
                                                    />
                                                </Stack>
                                            }
                                        </div>
                                        <Button size="small" onClick={() => setIsRegistered(!isRegistered)} sx={{ minWidth: 'fit-content' }} >
                                            {isRegistered ? "Non ancora registrato" : "Già registrato"}
                                        </Button>

                                    </Stack>
                                </Grid>}

                                {/* WORKER */}
                                {visibleData?.user && <Grid item xs={12} sm={6} >
                                    <AutocompleteInput
                                        id={`event-userId`}
                                        name={`userId`}
                                        label="Utente"
                                        placeholder="Cerca per nome"
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        options={usersList}
                                        getOptionLabel={option => option?.display_name ? option?.display_name : ""}
                                        isOptionEqualToValue={(option, value) => Number(option.ID) === Number(value.ID)} // isOptionEqualToValue={(option, value) => value.description === option.description /* option.id === value.id */}
                                        noOptionsText='Nessun utente disponibile'
                                        identifierField="ID"
                                        handleChange={(value) => {
                                            setFieldValue('userId', value?.ID ? value.ID : "");
                                        }}
                                    />

                                </Grid>}

                                {/** STATUS **/}
                                {visibleData?.status && <Grid item xs={12} sm={6} style={{ paddingTop: '0.7rem', }} >
                                    <FormControl sx={{ /* flexDirection: "row" *//* , alignItems: 'start' , gap: 2,*/ pl: '.9rem', }} >
                                        <FormLabel id="status-event-radio-buttons-group" sx={{ fontSize: '.65rem', lineHeight: '.8rem', }}>
                                            Conferma
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="status-event-radio-buttons-group"
                                            id="status-event"
                                            name="status"
                                            value={values.status}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            sx={{ flexDirection: "row", }}
                                        >
                                            <FormControlLabel
                                                // disabled={!isEditabled}
                                                value="active"
                                                control={<Radio size="small" />}
                                                label="In futuro"
                                                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                            />
                                            <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />
                                            <FormControlLabel
                                                value="confirmed"
                                                control={<Radio size="small" />}
                                                label="Si"
                                                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                            />
                                            <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />
                                            <FormControlLabel
                                                value="deleted"
                                                control={<Radio size="small" />}
                                                label="Annulla"
                                                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>}

                                {/* NOTES */}
                                {visibleData?.notes && <Grid item xs={12} >
                                    <Grid container spacing={2} >
                                        {/* NOTES HEADER */}
                                        <Grid item xs={12} >
                                            <Typography variant="h6b" sx={{ display: 'flex', alignSelf: 'center' }} >Note</Typography>
                                            <Divider variant="middle" />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <BasicOutlinedInput
                                                id="event-notes"
                                                name="notes"
                                                label="Informazioni preliminari addizionali"
                                                placeholder=""
                                                inputValue={values.notes}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                multiline
                                                rows={3}
                                            />

                                        </Grid>
                                    </Grid>
                                </Grid>}

                            </Grid>
                        </form>
                        {/* SCHEDULER PICKER */}
                        <BootstrapDialog
                            open={openSchedulerPicker}
                            onClose={() => setOpenSchedulerPicker(false)}
                            maxWidth="lg"
                        >
                            <SchedulerDatePicker
                                onAddAppointment={(data) => handleSchedulerDatePicker(data, setFieldValue)}
                            />
                        </BootstrapDialog>
                    </>
                )}
            </Formik>


        </div>
    )
}

export default EventForm