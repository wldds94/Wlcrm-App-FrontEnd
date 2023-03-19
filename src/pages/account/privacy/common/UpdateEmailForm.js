import { useEffect, useState } from 'react'

// Store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { updateNewEmail } from 'store/reducers/auth';

// material-ui
import {
    Box,
    FormHelperText,
    Grid,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import SaveButton from 'components/button/SaveButton';
import PasswordInput from 'components/input/PasswordInput';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';


const UpdateEmailForm = () => {
    const dispatch = useDispatch()

    const initialValues = {
        user_email: "",
        user_password: "",
        new_email: '',
        submit: null
    }

    const validationSchema = Yup.object().shape({
        user_email: Yup.string().max(255).email('Mail non valida').required('Campo obbligatorio'),
        user_password: Yup.string().max(255).required('Campo obbligatorio'),
        new_email: Yup.string().max(255).email('Mail non valida').required('Campo obbligatorio'),
        // files: Yup.string().max(255).required('Campo obbligatorio'),
    })

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        // setSubmitting(false);
        try {
            const resultAction = await dispatch(updateNewEmail(values)).unwrap() // console.log(resultAction);
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

    return (
        <>
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <BasicOutlinedInput
                                    id="new_email-edit"
                                    name="new_email"
                                    label="Nuova Email"
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                // hasLevel={true}
                                // visibilityToggle={false}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ mb: .5 }} >
                                <SimpleHeaderDivider
                                    title={'Inserire le attuali credenziali'}
                                    description='* Al termine sarà necessario effettuare nuovamente il Login per procedere ulteriormente.'
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <BasicOutlinedInput
                                    id="user_email-edit"
                                    name="user_email"
                                    label="Conferma Email"
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                // hasLevel={true}
                                // visibilityToggle={false}
                                />
                            </Grid>

                            <Grid item xs={12} >
                                {/* <PasswordInput
                                    id="user_password-edit"
                                    name="user_password"
                                    label="Conferma Password"
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                // hasLevel={true}
                                // visibilityToggle={false}
                                /> */}
                                <BasicOutlinedInput
                                    id="user_password-edit"
                                    name="user_password"
                                    label="Conferma Password"
                                    type='password'
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                // hasLevel={true}
                                // visibilityToggle={false}
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <SaveButton
                                    isSubmitting={isSubmitting}
                                    onSubmit={handleSubmit}
                                    label="Resetta Email"
                                />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default UpdateEmailForm