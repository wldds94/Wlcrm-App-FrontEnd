import React from 'react'

// material-ui
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider'
import BasicSelect from 'components/input/BasicSelect';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Stack } from '../../../../../../../node_modules/@mui/material/index';
import SaveButton from 'components/button/SaveButton';
import useCalendarSession from 'hooks/session/useCalendarSession';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarConfig, savePreferences } from 'store/reducers/calendar';

const SessionStoragePreferences = () => {
    const dispatch = useDispatch()

    const schedulerSession = useCalendarSession() // useSelector(getCalendarConfig)

    const sessionsValues = {
        calendar: {
            modes: [
                {
                    value: 'list',
                    label: 'Lista',
                    icon: "",
                },
                {
                    value: 'calendar',
                    label: 'Calendario',
                    icon: "",
                },
            ],
            views: [
                {
                    value: 'Day',
                    label: 'Giornaliera'
                },
                {
                    value: 'Week',
                    label: 'Settimanale'
                },
                {
                    value: 'Month',
                    label: 'Mensile'
                },
            ],
            // defaultUsers
        }
    }

    // calendar session
    // const usersView = localStorage.getItem(schedulerOption?.sessionKeyView) // ? localStorage.getItem('wlcrmUserCalendarView') : null // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njc1MDYwNzMsImV4cCI6MTY2NzUwOTY3Mywic2l0ZSI6Imh0dHA6XC9cL2FpZGVudC5pdCIsImVtYWlsIjoid2x3b3Jrczk0QGdtYWlsYy5vbSIsInVzZXJuYW1lIjoiV2FsdGVyIiwiaWQiOjF9.lvsHmW4BDVXfA5SSCHBDhEGoaXHNdFEH2mnWOsbyK6U' // null // 1234324
    const initialValues = {
        mode: schedulerSession?.mode,
        view: schedulerSession?.view, // usersView'Day',
        onlyUser: schedulerSession?.onlyUser, // usersView'Day',
    }

    const validationSchema = Yup.object().shape({
        mode: Yup.string().max(255),
        view: Yup.string().max(255),
        onlyUser: Yup.boolean(),
    })

    const saveCalendarPreferences = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        try {
            console.log('Success');

            // localStorage.setItem(schedulerSession?.sessionKeyMode, values?.mode)
            // localStorage.setItem(schedulerSession?.sessionKeyView, values?.view)
            // localStorage.setItem(schedulerSession?.sessionKeyOnlyUser, values?.onlyUser)
            dispatch(savePreferences(values))

            setStatus({ success: true });
            setSubmitting(false);

        } catch (err) {
            console.log('Failed');

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }

    }

    return (
        <Box /* sx={{ p: 2, }} */>
            <SimpleHeaderDivider
                description="Calendario"
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={saveCalendarPreferences}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Box sx={{ pt: 3 }}>
                            <FormControl sx={{ /* flexDirection: "row" *//* , alignItems: 'start' , gap: 2,*/ pl: '.9rem', }} >
                                <FormLabel id="calendar-mode-view-buttons-group" sx={{ fontSize: '.65rem', lineHeight: '.8rem', }}>Modalità</FormLabel>
                                <RadioGroup
                                    aria-labelledby="calendar-mode-view-buttons-group"
                                    id="calendar-mode"
                                    value={values.mode}
                                    name="mode"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ flexDirection: "row", /* fontSize: '.7rem', gap: '.1rem' */ }}
                                >
                                    {sessionsValues?.calendar?.modes?.map((item, index, arr) => {
                                        return (
                                            <Stack key={index} direction="row">
                                                <FormControlLabel
                                                    value={item?.value}
                                                    control={<Radio size="small" />}
                                                    label={item?.label}
                                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                />
                                                {index + 1 < arr?.length && <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />}
                                            </Stack>
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ pt: 3 }}>
                            <BasicSelect
                                id="type-view"
                                name="view"
                                label="Tipo Vista"
                                inputValue={values.view}
                                values={values}
                                touched={touched}
                                errors={errors}
                                options={sessionsValues?.calendar?.views}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                            // readOnly={!isEditabled}
                            />
                        </Box>
                        <Box sx={{ pt: 3 }}>
                            <SaveButton
                                // isSubmitting={isSubmitting} /* setSubmitting={setSubmitting} */
                                onSubmit={handleSubmit}
                            />
                        </Box>
                    </form>
                )}
            </Formik>

        </Box>
    )
}

export default SessionStoragePreferences