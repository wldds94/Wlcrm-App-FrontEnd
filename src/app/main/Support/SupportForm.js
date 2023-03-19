import { useEffect, useState } from 'react'

// Store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { selectCurrentUser } from 'store/reducers/auth';
import { sendSupportRequest } from 'store/reducers/mailer';

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
import Uploader from 'components/input/uploader/Uploader';

// icons
import { MdSend } from 'react-icons/md'
import { isDeepEqual } from 'utils/equal';
import useCurrentAccount from 'hooks/redux/useCurrentAccount';

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};

const SupportForm = () => {
    console.log('SupportForm');
    const dispatch = useDispatch()

    // const currentUser = useSelector(selectCurrentUser)
    const {currentAccount: currentUser} = useCurrentAccount()

    const initialValues = {
        // id: "",
        userId: currentUser?.ID,
        title: '',
        description: '',
        files: [],
        submit: null
    }

    const validationSchema = Yup.object().shape({
        userId: Yup.number().required('Campo obbligatorio'),
        title: Yup.string().max(255).required('Campo obbligatorio'),
        description: Yup.string().required('Campo obbligatorio'),
        // files: Yup.string().max(255).required('Campo obbligatorio'),
    })

    const submitSupportRequest = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        // const appendFiles = {}
        // values?.files?.map((value, index) => {
        //     appendFiles[index] = value
        //     values['file' + index] = value
        // })
        // values.files = appendFiles
        try {
            const response = await dispatch(sendSupportRequest(values)).unwrap()

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
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={submitSupportRequest}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <BasicOutlinedInput
                                    id="title-request"
                                    name="title"
                                    label="Titolo Richiesta"
                                    placeholder="Malfunzionamento sulla richiesta di Stampa"
                                    inputValue={values.title}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <BasicOutlinedInput
                                    id="description-request"
                                    name="description"
                                    label="Descrizione"
                                    placeholder="Descrizione del problema..."
                                    inputValue={values.description}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    multiline
                                    rows={4}
                                />
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
                                <SaveButton label="Invia Richiesta" icon={<MdSend />} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
                            </Grid>
                        </Grid>

                    </form>
                )}
            </Formik>
        </>
    )
}

export default SupportForm