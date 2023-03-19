import React from 'react'

// material-ui
import {
    Grid,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Redux
import { useDispatch } from 'react-redux';
// Slices
import { saveServiceOption } from 'store/reducers/options';

// assets
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import SaveButton from 'components/button/SaveButton';
import BasicSelect from 'components/input/BasicSelect';
import { dispatchNotice } from 'utils/app/notice';
import { addNotice } from 'store/reducers/notices';

const validationSchema = Yup.object().shape({
    id: Yup.number().positive().integer(),
    description: Yup.string().max(255).required('Campo obbligatorio'),
    price: Yup.number().positive(),
    recurrency: Yup.number().positive(),
    status: Yup.string().max(255).default('active'),
})

const ServicesForm = ({ formData = null, ...others }) => {
    const dispatch = useDispatch();

    const initialValues = formData != null ? {
        id: formData?.id ? formData?.id : "",
        description: formData?.description ? formData?.description : "",
        price: formData?.price ? formData?.price : "",
        status: formData?.status ? formData?.status : "active",
        recurrency: formData?.recurrency ? formData?.recurrency : 0,
    } : {
        description: "",
        price: "",
        status: "active",
        recurrency: 0,
    } // console.log(initialValues); console.log(formData);

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        try {
            const resultAction = await dispatch(saveServiceOption(values)).unwrap() // console.log(resultAction);
            console.log('Success');
            dispatchNotice(resultAction, dispatch, addNotice)

            setStatus({ success: true });
            setSubmitting(false);

            if (formData != null) {
                others.afterSubmitCallback()
            } else {
                resetForm()
            }
            // resetForm()
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
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/** ID */}
                            {/* <input
                                id="services-id"
                                type="hidden"
                                value={values.id}
                                name="id"
                                // onBlur={handleBlur}
                                onChange={handleChange}
                            /> */}
                            { /** DESCRIPTION */}
                            <Grid item xs={12} md={6} >
                                {/* <Stack spacing={1}>
                                    <InputLabel htmlFor="services-description">Descrizione *</InputLabel>
                                    <OutlinedInput
                                        id="services-description"
                                        // type="company_name"
                                        value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Visita specialistica odontoiatrica"
                                        fullWidth
                                        // readOnly
                                        // disabled={!isEditable}
                                        error={Boolean(touched.description && errors.description)}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-services-description">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack> */}
                                <BasicOutlinedInput
                                    id="services-description"
                                    name="description"
                                    label="Descrizione *"
                                    placeholder="Visita specialistica odontoiatrica"
                                    inputValue={values.description}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    multiline
                                    rows={2}
                                />
                            </Grid>
                            { /** PRICE */}
                            <Grid item xs={6} md={3} >
                                <BasicOutlinedInput
                                    id="services-price"
                                    name="price"
                                    label="Prezzo Indicativo"
                                    placeholder="200,00"
                                    inputValue={values.price}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    endAdornment={"€"}
                                />
                                {/* <Stack spacing={1}>
                                    <InputLabel htmlFor="services-price">Prezzo Indicativo</InputLabel>
                                    <OutlinedInput
                                        id="services-price"
                                        // type="number"
                                        value={values.price}
                                        name="price"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="200,00"
                                        fullWidth
                                        // readOnly
                                        // disabled={!isEditable}
                                        error={Boolean(touched.price && errors.price)}
                                        endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                    />
                                    {touched.price && errors.price && (
                                        <FormHelperText error id="helper-text-services-price">
                                            {errors.price}
                                        </FormHelperText>
                                    )}
                                </Stack> */}
                            </Grid>
                            { /** STATUS */}
                            <Grid item xs={6} md={3} >
                                {/* <Stack spacing={1}>
                                    <InputLabel htmlFor="services-status">Stato</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        id="services-status"
                                        name="status"
                                        value={values.status}
                                        label=""
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='active' >Active</MenuItem>
                                        <MenuItem value='inactive' >Inactive</MenuItem>
                                        <MenuItem value='trash'>Cestino</MenuItem>
                                    </Select>
                                    {touched.status && errors.status && (
                                        <FormHelperText error id="helper-text-services-status">
                                            {errors.status}
                                        </FormHelperText>
                                    )}
                                </Stack> */}
                                <BasicSelect
                                    id="services_status"
                                    name="status"
                                    label="Stato *"
                                    inputValue={values.status}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    options={[
                                        {
                                            label: "Active",
                                            value: "active"
                                        },
                                        {
                                            label: "Inactive",
                                            value: "inactive"
                                        },
                                        {
                                            label: "Cestino",
                                            value: "trash"
                                        },
                                    ]}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>

                            { /** RECURRENCE */}
                            <Grid item xs={6} md={3} >
                                {/* <TextField
                                    id={`services_${index}_quantity_field`}
                                    name={`services[${index}].quantity`}
                                    type='number'
                                    size="small"
                                    placeholder="1"
                                    fullWidth
                                    variant="outlined"
                                    label="Qt"
                                    value={service?.quantity}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        const field = 'quantity'
                                        updateDerivatedServicesData(values.services, setFieldValue, index, field, e.currentTarget.value,)
                                    }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                /> */}
                                <BasicOutlinedInput
                                    id="services-recurrency"
                                    name="recurrency"
                                    type='number'
                                    label="Richiamo"
                                    placeholder="In Giorni"
                                    inputValue={values.recurrency}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    // endAdornment={"€"}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <SaveButton isSubmitting={isSubmitting} onSubmit={handleSubmit} />

                                {/* <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ gap: ".5rem" }}
                                        startIcon={<SaveOutlined />}
                                    >
                                        {<SaveOutlined /><span> Salva Servizio</span>}
                                        Salva
                                    </Button>
                                </AnimateButton> */}
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default ServicesForm