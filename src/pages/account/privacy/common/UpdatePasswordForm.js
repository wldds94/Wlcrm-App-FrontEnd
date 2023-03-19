import React from 'react'

// material-ui
import {
    Grid,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import SaveButton from 'components/button/SaveButton';
import PasswordInput from 'components/input/PasswordInput';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';

// Store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { updateNewPassword } from 'store/reducers/auth';

const validationSchema = Yup.object().shape({
    email: Yup.string().max(255).email('Mail non valida').required('Campo obbligatorio'),
    user_password: Yup.string().max(255).required('Campo obbligatorio'),
    new_password: Yup.string().max(255).required('Campo obbligatorio'),
    confirm_password: Yup.string().max(255).oneOf([Yup.ref("new_password"), null], "Le password non combaciano").required('Campo obbligatorio'),
})

const UpdatePasswordForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        // setSubmitting(false);
        try {
            const resultAction = await dispatch(updateNewPassword(values)).unwrap() // console.log(resultAction);
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
        email: "",
        user_password: "",
        new_password: "",
        confirm_password: "",
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
                        <Grid container spacing={1}>
                            <Grid item xs={12} >
                                <BasicOutlinedInput
                                    id="email-edit"
                                    name="email"
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
                            <Grid item xs={12}/*  sm={10}  */ sx={{ mb: 3 }} >
                                <PasswordInput
                                    id="user_password-edit"
                                    name="user_password"
                                    label="Password Attuale"
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                // hasLevel={true}
                                // visibilityToggle={false}
                                />
                            </Grid>
                            <Grid item xs={12}/*  sm={10}  sx={{ mb: 2 }}*/ >
                                <PasswordInput
                                    id="new_password-edit"
                                    name="new_password"
                                    label="Nuova Password"
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    hasLevel={true}
                                // visibilityToggle={false}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <PasswordInput
                                    id="confirm_password-edit"
                                    name="confirm_password"
                                    label="Conferma Password"
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    visibilityToggle={false}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <SaveButton
                                    isSubmitting={isSubmitting}
                                    onSubmit={handleSubmit}
                                />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default UpdatePasswordForm