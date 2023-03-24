import React from 'react'

// material-ui
import {
    Box,
    FormHelperText,
    Grid,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';

// redux
import { useDispatch } from 'react-redux';
// slices hooks
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import SaveButton from 'components/button/SaveButton';
import Uploader from 'components/input/uploader/Uploader';

// icons
import { MdSend } from 'react-icons/md'

// utils
import { isDeepEqual } from 'utils/equal';


const InvoiceEmailForm = ({
    invoice = null,
    ...other
}) => {
    const dispatch = useDispatch()

    const { currentAccount: currentUser } = useCurrentAccount()

    const initialValues = invoice !== null ? {
        userId: currentUser?.ID,
        clientEmail: invoice?.client_email,
        files: [],
        submit: null
    } : {
        // id: "",
        userId: currentUser?.ID,
        clientEmail: '',
        files: [],
        submit: null
    }

    const validationSchema = Yup.object().shape({
        userId: Yup.number().required('Campo obbligatorio'),
        clientEmail: Yup.string().email().required('Campo obbligatorio'),
        // files: Yup.string().max(255).required('Campo obbligatorio'),
    })

    const submitEmailRequest = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        try {
            // const response = await dispatch(sendSupportRequest(values)).unwrap()

            setStatus({ success: true });
            setSubmitting(false);
        } catch (err) {
            console.log(err);

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
    }

    const handleFiles = (newFiles, old, setFieldValue) => {
        // console.log(files);
        // const objs = convertArrayToObject(files, 'name') // Object.assign({}, files)
        // console.log(objs);
        if (!isDeepEqual(newFiles, old)) {
            setFieldValue('files', newFiles)
        }
    }

    return (
        <>
            <Box sx={{ pt: 2 }}>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={submitEmailRequest}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>

                            <Grid container spacing={3}>
                                <Grid item xs={12} >
                                    <BasicOutlinedInput
                                        id="clientEmail"
                                        name="clientEmail"
                                        label="Email"
                                        placeholder="paziente@gmail.com"
                                        inputValue={values.clientEmail}
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                    {/* <Typography variant="caption" color="secondary">
                                        *Per più utenti separa gli indirizzi con la virgola
                                    </Typography> */}
                                </Grid>

                                <Grid item xs={12} >
                                    <Uploader
                                        accept=".jpg,.png,.jpeg,.svg"
                                        multiple
                                        initFiles={Object.assign({}, values.files)}
                                        onLoading={(filesArray) => handleFiles(filesArray, values.files, setFieldValue)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <SaveButton label="Invia Email" icon={<MdSend />} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
                                </Grid>
                            </Grid>

                        </form>
                    )}
                </Formik>
            </Box>
        </>
    )
}

export default InvoiceEmailForm