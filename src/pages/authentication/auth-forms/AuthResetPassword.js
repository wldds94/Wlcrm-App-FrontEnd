import React from 'react'

// react router dom
import { useSearchParams } from "react-router-dom";

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

// Store
import { useDispatch } from 'react-redux'
// slices
import { changeNewPassword } from 'store/reducers/auth';

const validationSchema = Yup.object().shape({
    new_password: Yup.string().max(255).required('Campo obbligatorio'),
    confirm_password: Yup.string().max(255).oneOf([Yup.ref("new_password"), null], "Le password non combaciano").required('Campo obbligatorio'),
})

const AuthResetPassword = () => {
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();

    const queryKey = searchParams.get("key"),
        queryLogin = searchParams.get("login")
    const initialValues = {
        code: queryKey ? queryKey : "",
        email: queryLogin ? queryLogin : "",
        new_password: "",
        confirm_password: "",
        submit: null
    }

    React.useEffect(() => {
        const key = searchParams.get("key"),
            login = searchParams.get("login")

        if (key) {
            // setError('There was a problem.')
            searchParams.delete('key')
            setSearchParams(searchParams)
        }
        if (login) {
            searchParams.delete('login')
            setSearchParams(searchParams)
        }

    }, [])

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        // setSubmitting(false);
        try {
            const resultAction = await dispatch(changeNewPassword(values)).unwrap() // console.log(resultAction);
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
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* NEW PASSWORD */}
                            <Grid item xs={12}>
                                <PasswordInput
                                    id="new_password-reset"
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
                            {/* CONFIRM PASSWORD */}
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <PasswordInput
                                    id="confirm_password-reset"
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
                            <Grid item xs={12}>
                                <SaveButton isSubmitting={isSubmitting} icon="" />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default AuthResetPassword