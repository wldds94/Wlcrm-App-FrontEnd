import React from 'react'

// material-ui
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormHelperText,
    Grid,
    Link,
    MenuItem,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import SaveButton from 'components/button/SaveButton';

// Store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { sendResetPassword } from 'store/reducers/auth';

// assets
import SendIcon from '@mui/icons-material/Send';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Mail non valida').max(255).required('Campo obbligatorio'),
})

const SendResetPasswordForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        // setSubmitting(false);
        try {
            const resultAction = await dispatch(sendResetPassword(values)).unwrap() // console.log(resultAction);
            console.log('Success');

            setStatus({ success: true });
            setSubmitting(false);

            // resetForm()

        } catch (err) {
            console.log('Failed');

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
    }

    const initialValues = {
        email: "wlworks94@gmailc.om",
        submit: null
    }

    return (
        <>
            <Formik
                // enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}/*  sm={10}  */ sx={{ mb: 2 }} >
                                {/* <InputLabel htmlFor="account-first_name">Inserisci la tua email</InputLabel> */}
                                <Grid container spacing={.5}>
                                    <Grid item xs={12} >
                                        <FormHelperText id="helper-text-reset_password-email">
                                            Ti arriverà un'email per riottenere le tue credenziali
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} >
                                                <Stack direction="row" sx={{ alignItems: 'center'/* , flexBasis: 'auto', *//* width: "100%"  */ }} spacing={.5} >

                                                    <Box sx={{ width: "100%", }}>
                                                        <BasicOutlinedInput
                                                            id="reset_password-email"
                                                            name="email"
                                                            label=""
                                                            placeholder="Inserisci la tua email"
                                                            values={values}
                                                            touched={touched}
                                                            errors={errors}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                        />
                                                    </Box>

                                                    <SaveButton
                                                        isSubmitting={isSubmitting}
                                                        onSubmit={handleSubmit}
                                                        label="" // {false}
                                                        icon={<SendIcon />} 
                                                    />

                                                </Stack>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default SendResetPasswordForm