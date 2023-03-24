import React, { useEffect, useState } from 'react'

// Dayjs
import dayjs from 'dayjs' // ES 2015

// material-ui
import {
    Box,
    Button,
    Grid,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { saveClinicalJournal } from 'store/reducers/clinical';
import { getCalendarEventsByClientID } from 'store/reducers/calendar';
import { addNotice } from 'store/reducers/notices';
import { selectCurrentUser } from 'store/reducers/auth';
import { getUserById } from 'store/reducers/users';

// prject import
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import InfoListItem from 'components/typography/InfoListItem';
import DateTimePickerInput from 'components/input/formik/DateTimePickerInput';
import ClientsAutocompleteField from 'components/input/app-autocomplete/ClientsAutocompleteField';
import EventsAutocompleteField from 'components/input/app-autocomplete/EventsAutocompleteField';

// assets
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import EventNoteIcon from '@mui/icons-material/EventNote';

// Utils
import { getUserFullName } from 'utils/app/user';
import { getEventResarchLabel } from 'utils/app/event';
import { buildNotice, dispatchNotice } from 'utils/app/notice';
import dynamicSortMultiple from 'utils/array';

// hooks
import useCryptoJS from 'hooks/useCryptoJS';
import useClients from 'hooks/redux/useClients';
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';

const validationSchema = Yup.object().shape({
    id: Yup.number().max(255).required('Campo obbligatorio'),
    clientId: Yup.number().required('Campo obbligatorio'),
    eventId: Yup.number(),
    userId: Yup.number().required('Campo obbligatorio'),
    comment: Yup.string().max(255),
    createdAt: Yup.string().max(255),
})

const ClinicalJournalForm = ({
    formData = null,
    initial = {},
    withEventResearch = true,
    withClientField = false,
    events = [],
    // fieldsMode = "comment", // "complete"
    // fields = [{
    //     name: "",
    //     value: "",
    //     active: true,
    // },],
    ...other
}) => {
    console.log('ClinicalJournalForm');

    const dispatch = useDispatch()

    // const currentUser = useSelector(selectCurrentUser) // console.log(currentUser);
    const {currentAccount: user} = useCurrentAccount() // useSelector(state => getUserById(state, currentUser?.ID)) // console.log(account);

    // client
    const clientsList = useClients()?.clients // useSelector(selectAllClients)
    // const {currentUser} = useCurrentAccount()
    // const [user, setUser] = useState(currentUser)
    // useEffect(() => {
    //     if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
    //         setUser(currentUser)
    //     }
    // }, [currentUser])

    // const [currentEvent, setCurrentEvent] = useState(null)
    const clientsEvents = useSelector(state => {
        return initial?.clientId
            ? getCalendarEventsByClientID(state, initial?.clientId)
            : (formData?.clientId
                ? getCalendarEventsByClientID(state, formData?.clientId)
                : events)
    })

    const defaultValues = {
        id: "",
        content: "",
        startDate: dayjs().minute(0).second(0).format(),
        clientId: "",
        eventId: "",
        userId: user?.ID,
        status: "",
        createdAt: "", // dayjs().format(),
    }
    const initialValues = formData != null ? {
        ...defaultValues,
        id: formData?.id ? formData.id : "",
        content: formData?.content ? formData.content : defaultValues.content,
        startDate: formData?.startDate ? formData.startDate : defaultValues.startDate,
        clientId: formData?.clientId ? formData.clientId : defaultValues.clientId,
        eventId: formData?.eventId ? formData.eventId : defaultValues.eventId,
        status: formData?.status ? formData.status : defaultValues.status,
        createdAt: formData?.createdAt ? formData.createdAt : defaultValues.createdAt,
    } : {
        ...defaultValues,
        ...initial,
    }

    const cryptoJS = useCryptoJS()
    const submitJournal = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        try {
            const dataValues = {
                ...values,
                content: cryptoJS.encrypt(values.content)
            }
            const resultAction = await dispatch(saveClinicalJournal(dataValues)).unwrap()
            console.log(resultAction);

            // dispatch(addNotice(buildNotice(resultAction)))
            dispatchNotice(resultAction, dispatch, addNotice)

            // console.log('Success');

            setStatus({ success: true });
            setSubmitting(false);
            // resetForm()
            // resetForm({
            //     values: {
            //         id: insert.id,
            //         content: insert?.content ? insert.content : "",
            //         clientId: insert.clientId,
            //         eventId: insert?.eventId ? insert.eventId : "",
            //         userId: insert.userId,
            //         createdAt: insert.createdAt,
            //     }
            // })
        } catch (err) {
            console.log('Failed');

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }

    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={submitJournal}
            // validationSchema={validationSchema}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {withEventResearch && (<>
                            <Grid item xs={12} sx={{ /* mt: 4,  */mb: 2 }} >
                                <InfoListItem
                                    info={{
                                        icon: <KeyboardHideIcon />,
                                        itemText: "Operatore:",
                                        value: getUserFullName(user),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <InfoListItem
                                    info={{
                                        icon: <EventNoteIcon />,
                                        itemText: "Appuntamento:",
                                        // value: getUserFullName(user),
                                    }}
                                />
                                <Box sx={{ mt: 2 }} >
                                    {/* <Typography variant="body2" mb={2} color="secondary" >
                                    Ricerca Evento
                                </Typography> */}
                                    <EventsAutocompleteField
                                        id={`journal-eventId`}
                                        name={`eventId`}
                                        label="Ricerca un Appuntamento per mese, anno, giorno, tipologia di appuntamento" // "Ricerca un Appuntamento"
                                        // placeholder="Ricerca per mese, anno, giorno, tipologia di appuntamento"
                                        placeholder="Nessun appuntamento selezionato"
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        options={clientsEvents ? clientsEvents?.sort(dynamicSortMultiple('-startDate')) : []}
                                        getOptionLabel={option => getEventResarchLabel(option)}
                                        isOptionEqualToValue={(option, value) => option.id === value.id} // isOptionEqualToValue={(option, value) => value.description === option.description /* option.id === value.id */}
                                        identifierField="id"
                                        noOptionsText='Nessun Appuntamento disponibile'
                                        handleChange={(value) => {
                                            console.log(value);
                                            setFieldValue('eventId', value?.id ? value.id : "");
                                            // if (value) {
                                            if (values?.clientId?.length > 0) {
                                                if (Number(values?.clientId) !== Number(value?.clientId)) {
                                                    setFieldValue('clientId', value?.clientId ? value.clientId : "");
                                                }
                                            } else {
                                                setFieldValue('clientId', value?.clientId ? value.clientId : "");
                                            }
                                            // }

                                        }}
                                    />

                                    {/* <AutocompleteInput
                                        id={`journal-eventId`}
                                        name={`eventId`}
                                        label="Ricerca un Appuntamento per mese, anno, giorno, tipologia di appuntamento" // "Ricerca un Appuntamento"
                                        // placeholder="Ricerca per mese, anno, giorno, tipologia di appuntamento"
                                        placeholder="Nessun appuntamento selezionato"
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        options={clientsEvents ? clientsEvents?.sort(dynamicSortMultiple('-startDate')) : []}
                                        getOptionLabel={option => getEventResarchLabel(option)}
                                        isOptionEqualToValue={(option, value) => option.id === value.id} // isOptionEqualToValue={(option, value) => value.description === option.description }
                                        identifierField="id"
                                        noOptionsText='Nessun Appuntamento disponibile'
                                        handleChange={(value) => {
                                            setFieldValue('eventId', value?.id ? value.id : "");
                                        }}
                                    /> */}
                                </Box>
                            </Grid>
                        </>)}
                        <Grid item xs={12} /* sx={{ mt: 4, mb: 2 }} */ >
                            <Grid container spacing={1} sx={{ mt: 2 }} >
                                <Grid item xs={12} >
                                    <ClientsAutocompleteField
                                        id={`journal-clientId`}
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
                                        isOptionEqualToValue={(option, value) => option.id === value.id} // isOptionEqualToValue={(option, value) => value.description === option.description /* option.id === value.id */}
                                        identifierField="id"
                                        noOptionsText='Nessun paziente disponibile'
                                        handleChange={(value) => {
                                            setFieldValue('clientId', value?.id ? value.id : "");
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}/*  sm={4} */ >
                            <Grid container spacing={1} sx={{ mt: 1 }} >
                                <Grid item xs={12} >
                                    <DateTimePickerInput
                                        id="journal-startDate"
                                        name="startDate"
                                        label="Data"
                                        inputValue={values.startDate}
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        handleBlur={handleBlur}
                                        handleChange={(value) => {
                                            console.log(value);
                                            setFieldValue("startDate", value, true);
                                        }} // {(value) => { setFieldValue("startDate", dayjs(value).format(), true); console.log(value); }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} /* sx={{ mt: 4, mb: 2 }} */ >
                            <Grid container spacing={1} sx={{ mt: 2 }} >
                                <Grid item xs={12} >
                                    <BasicOutlinedInput
                                        id="journal-content"
                                        name="content"
                                        label="Diagnosi Operatore"
                                        placeholder=""
                                        inputValue={values.content}
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        multiline
                                        rows={5}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/** FORM HEAD */}
                        <Grid item xs={12} sx={{ mt: 3, mb: 2 }} >
                            <Grid item xs={12} >
                                <Box>
                                    {/* <SaveButton 
                                        isSubmitting={isSubmitting}
                                        onSubmit={handleSubmit} 
                                    /> */}
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        // fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Salva
                                        {/* <SaveOutlined /> */}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default ClinicalJournalForm