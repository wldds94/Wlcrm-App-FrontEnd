import { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    FormHelperText,
    Grid,
    Typography
} from '@mui/material';

// Store
import { useDispatch, useSelector } from 'react-redux'
// types
import { addNotice } from 'store/reducers/notices';
import { saveSettingsOption } from 'store/reducers/options';
import { buildNotice } from 'utils/app/notice';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MuiColorInput } from 'mui-color-input'

// project import
import SaveButton from 'components/button/SaveButton';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';



const validationSchema = Yup.object().shape({
    invoice_step: Yup.number().required('Campo obbligatorio'),
    header_color: Yup.string().max(255).required('Campo obbligatorio'),
    header_font_color: Yup.string().max(255).required('Campo obbligatorio'),
    invoice_client_intro: Yup.string().max(255), // .required('Campo obbligatorio'),
    logo: Yup.string().max(255),
    // scheduler
    default_view: Yup.string().max(255).required('Campo obbligatorio'),
    first_hour: Yup.number().required('Campo Obbligatorio'),
    last_hour: Yup.number().required('Campo Obbligatorio'),
    form_time_step: Yup.number().required('Campo Obbligatorio'),
})

const SettingsForm = ({ formData = null, editable = true, ...others }) => {
    console.log(formData);
    const dispatch = useDispatch()

    const [isEditabled, setIsEditabled] = useState(editable)
    useEffect(() => {
        if (editable !== isEditabled) {
            setIsEditabled(editable)
        }
    }, [editable])

    // const logo = await createFileFromUrl(formData?.logo, "logo.jpg")
    // const getLogo = async (url, name) => {
    //     const logo = await createFileFromUrl(url, name)
    //     console.log(logo);
    //     return logo
    // }

    const initialValues = formData != null ? {
        invoice_step: formData?.invoice_step ? formData?.invoice_step : 1,
        header_color: formData?.header_color ? formData?.header_color : "",
        header_font_color: formData?.header_font_color ? formData?.header_font_color : "",
        invoice_client_intro: formData?.invoice_client_intro ? formData?.invoice_client_intro : "", // "Destinatario",
        // logo: formData?.logo ? formData?.logo : "", // [getLogo(formData?.logo, "logo.jpg")] : "",
        // scheduler
        // default_view: formData?.default_view ? formData?.default_view : "",
        first_hour: formData?.first_hour ? formData?.first_hour : "",
        last_hour: formData?.last_hour ? formData?.last_hour : "",
        cell_time_step: formData?.cell_time_step ? formData?.cell_time_step : "",
        form_time_step: formData?.form_time_step ? formData?.form_time_step : "",
        submit: null
    } : {
        invoice_step: 1,
        header_color: "",
        header_font_color: '',
        invoice_client_intro: "",
        // logo: [],
        first_hour: '',
        last_hour: "",
        cell_time_step: '',
        form_time_step: '',
        submit: null
    }

    const submitSettings = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
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

    return (
        <>
            <Box sx={{ p: 2, pt: 1,/* , height: '100%', */ }} >
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={submitSettings}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                {/* Logo */}
                                {/* <Grid item xs={12} sx={{ mb: 2 }} >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} >
                                            <SimpleHeaderDivider title={"Logo"} />
                                        </Grid>
                                        <Grid item xs={12} >
                                            {values.logo && <Uploader
                                                initFiles={values.logo}
                                            />}
                                        </Grid>
                                    </Grid>
                                </Grid> */}
                                {/* Fatturazione */}
                                <Grid item xs={12} sx={{ mb: 2 }} >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12}>
                                            <SimpleHeaderDivider title={"Step Fattura"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container >
                                                <Grid item xs={12} sm={6}>
                                                    <BasicOutlinedInput
                                                        id="invoice_step"
                                                        name="invoice_step"
                                                        type="number"
                                                        inputValue={values.invoice_step}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                        readOnly={!isEditabled}
                                                        inputProps={{
                                                            min: 1,
                                                            max: 5,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}/*  sm={6} */>
                                                    <Typography variant="caption" color="secondary" >
                                                        *Attivo solo in caso di generazione nuova Fattura
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <SimpleHeaderDivider title={"Intestazione Fattura"} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box>
                                                <Typography color="secondary">Colore Background</Typography>
                                                <MuiColorInput
                                                    value={values.header_color}
                                                    onChange={(color) => setFieldValue('header_color', color)}
                                                    format="hex"
                                                />
                                            </Box>
                                            {/* <BasicOutlinedInput
                                                id="invoice-header_color"
                                                name="header_color"
                                                // label="Background"
                                                type="color"
                                                inputValue={values.header_color}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            /> */}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box>
                                                <Typography color="secondary">Colore Font</Typography>
                                                <MuiColorInput
                                                    value={values.header_font_color}
                                                    onChange={(color) => setFieldValue('header_font_color', color)}
                                                    format="hex"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <SimpleHeaderDivider title={"Intestazione Paziente"} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <BasicOutlinedInput
                                                id="invoice_client_intro"
                                                name="invoice_client_intro"
                                                // label="Background"
                                                inputValue={values.invoice_client_intro}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Calendario */}
                                <Grid item xs={12} sx={{ mb: 2 }} >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sx={{ /* paddingBottom: '.5rem' *//* , mb: 1  */ }}>
                                            <SimpleHeaderDivider title={"Calendario"} />
                                        </Grid>
                                        <Grid item xs={6} >
                                            <BasicOutlinedInput
                                                id="scheduler-first_hour"
                                                name="first_hour"
                                                type='number'
                                                label="Inizio Orario"
                                                placeholder="7"
                                                inputValue={values.first_hour}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={6} >
                                            <BasicOutlinedInput
                                                id="scheduler-last_hour"
                                                name="last_hour"
                                                type='number'
                                                label="Fine Orario"
                                                placeholder="21"
                                                inputValue={values.last_hour}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={6} >
                                            <BasicOutlinedInput
                                                id="scheduler-cell_time_step"
                                                name="cell_time_step"
                                                type='number'
                                                label="TickCell Time Step"
                                                placeholder="30"
                                                inputValue={values.cell_time_step}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        {/* <Grid item xs={6} >
                                            <BasicOutlinedInput
                                                id="scheduler-form_time_step"
                                                name="form_time_step"
                                                type='number'
                                                label="Form Time Step"
                                                placeholder="30"
                                                inputValue={values.form_time_step}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid> */}
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

export default SettingsForm