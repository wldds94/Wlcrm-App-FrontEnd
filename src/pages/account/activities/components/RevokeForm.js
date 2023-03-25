import React from 'react'

// material ui
import { Button } from '@mui/material';
// styled
import { styled } from '@mui/material/styles';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Redux
import { useDispatch } from 'react-redux';
import { revokeUsersToken } from 'store/reducers/users';

const RevokeForm = ({
    formData = null,
    disabled = false,
    ...others
}) => {
    const dispatch = useDispatch()

    const initialValues = formData != null ? {
        value: formData?.jwt,
        submit: null
    } : {
        value: "",
        submit: null
    }

    const validationSchema = Yup.object().shape({
        value: Yup.string().max(255).required('Campo obbligatorio'),
    })

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        try {
            const resultAction = await dispatch(revokeUsersToken(values)).unwrap() // console.log(resultAction);
            // console.log('Success');

            // dispatchNotice(resultAction, dispatch, addNotice)
            // setStatus({ success: true });

        } catch (err) {
            console.log('Failed');
            setStatus({ success: false });
            setErrors({ submit: err.message });
        } finally { // console.log('End Submit');
            setSubmitting(false);
        }
    }

    return (
        <>
            {disabled ?
                <RevokeButton
                    disabled={disabled}
                    variant="outlined"
                    color="secondary"
                    size="small"
                >
                    Disconnesso
                </RevokeButton>
                : <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, resetForm }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <AnimateButton>
                                <RevokeButton
                                    type="submit"
                                    disabled={disabled}
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                >
                                    Disconnetti
                                </RevokeButton>
                            </AnimateButton>
                        </form>
                    )}
                </Formik>}
        </>

    )
}

export default RevokeForm

const RevokeButton = styled(Button)({
    background: '#dddddd',
    color: '#292929',
    border: '1px solid #bfbfbf',// 'none', // 
    fontWeight: 700,
    minWidth: '110px',
  });