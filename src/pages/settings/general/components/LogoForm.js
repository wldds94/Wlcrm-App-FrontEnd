import { useEffect, useState } from 'react'

// Store
import { useDispatch } from 'react-redux'
// types
import { addNotice } from 'store/reducers/notices';
import { saveSettingsOption } from 'store/reducers/options';

// material-ui
import {
    Box,
    FormHelperText,
    Grid,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import SaveButton from 'components/button/SaveButton';
import Uploader from 'components/input/uploader/Uploader';

// utils
import { buildNotice } from 'utils/app/notice';
import { isDeepEqual } from 'utils/equal';

const validationSchema = Yup.object().shape({
    logo: Yup.string().required().max(255),
})

const LogoForm = ({ formData = null, editable = true, ...others }) => {
    const dispatch = useDispatch()

    const [isEditabled, setIsEditabled] = useState(editable)
    useEffect(() => {
        if (editable !== isEditabled) {
            setIsEditabled(editable)
        }
    }, [editable])

    const initialValues = formData != null ? {
        logo: formData?.logo ? formData?.logo : [], // [getLogo(formData?.logo, "logo.jpg")] : "",
        parameter: "logo",
        submit: null
    } : {
        logo: [], // [getLogo(formData?.logo, "logo.jpg")] : "",
        parameter: "logo",
        submit: null
    }

    const uploadLogo = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        try {
            const resultAction = await dispatch(saveSettingsOption(values)).unwrap() // console.log(resultAction);
            // console.log('Success');

            const notice = buildNotice(resultAction)
            dispatch(addNotice(notice))

            setStatus({ success: true });
            setSubmitting(false);

            if (resultAction?.status) {
                if (formData != null) {
                    if (typeof others.afterSubmitCallback === "function") {
                        others.afterSubmitCallback()
                    }
                } else {
                    resetForm()
                }
            }

        } catch (err) {
            console.log('Failed');

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
        // return true
    }

    const handleFiles = (newFiles, old, setFieldValue) => {
        // console.log(files);
        // const objs = convertArrayToObject(files, 'name') // Object.assign({}, files)
        // console.log(objs);
        if (!isDeepEqual(newFiles, old)) {
            setFieldValue('logo', newFiles)
        }
    }

    return (
        <>
            <Box sx={{ p: 2, /* paddingTop: '40px' *//* , height: '100%', */ }} >
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={uploadLogo}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                {/* Logo */}
                                <Grid item xs={12} sx={{ mb: 2 }} >
                                    <Grid container spacing={3} >
                                        {/* <Grid item xs={12} >
                                            <SimpleHeaderDivider title={"Logo"} />
                                        </Grid> */}
                                        <Grid item xs={12} >
                                            <Uploader
                                                accept=".jpg,.png,.jpeg,.svg"
                                                initFiles={values.logo}
                                                onLoading={(filesArray) => handleFiles(filesArray, values.files, setFieldValue)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                                <Grid item xs={12}>

                                    {isEditabled &&
                                        <SaveButton
                                            isSubmitting={isSubmitting} /* setSubmitting={setSubmitting} */
                                            onSubmit={handleSubmit}
                                            label="Upload Logo"
                                        />}
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    )
}

export default LogoForm