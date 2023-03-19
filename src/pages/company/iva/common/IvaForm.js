import React from 'react'

// material-ui
import {
    Box,
    Button,
    Checkbox,
    FormGroup,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    MenuItem,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import BasicCheckbox from 'components/input/BasicCheckbox';
import BasicSelect from 'components/input/BasicSelect';

// assets
import PercentIcon from '@mui/icons-material/Percent';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// Redux
import { useDispatch, useSelector } from 'react-redux'
// Slices
import { saveIvaOption } from 'store/reducers/options';
import { dispatchNotice } from 'utils/app/notice';
import { addNotice } from 'store/reducers/notices';

const validationSchema = Yup.object().shape({
    id: Yup.number().positive().integer(),
    vat: Yup.number().required('Campo obbligatorio'),
    vat_description: Yup.string().max(255).required('Campo obbligatorio'),
    vat_code: Yup.string().max(255).required('Campo obbligatorio'),
    vat_status: Yup.string().max(255).default('active'),
})

const IvaForm = ({ formData = null, ...others }) => {
    const dispatch = useDispatch()

    const initialValues = formData != null ? formData : {
        vat: '',
        vat_description: '',
        vat_code: '',
        favourite: false,
        vat_status: 'active',
    }

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        try {
            const resultAction = await dispatch(saveIvaOption(values)).unwrap() // console.log(resultAction);
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
                            {/* PERCENTUALE IVA */}
                            <Grid item xs={6} md={6} >
                                {/* <Stack spacing={1}>
                                    <InputLabel htmlFor="vat-perc">IVA *</InputLabel>
                                    <OutlinedInput
                                        id="vat-perc"
                                        value={values.vat}
                                        name="vat"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="4"
                                        fullWidth
                                        endAdornment={<InputAdornment position="end"><PercentIcon /></InputAdornment>}
                                        error={Boolean(touched.vat && errors.vat)}
                                    />
                                    {touched.vat && errors.vat && (
                                        <FormHelperText error id="helper-text-vat-perc">
                                            {errors.vat}
                                        </FormHelperText>
                                    )}
                                </Stack> */}
                                <BasicOutlinedInput
                                    id="vat_perc"
                                    name="vat"
                                    label="IVA *"
                                    placeholder="4"
                                    inputValue={values.vat}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    endAdornment={<PercentIcon />}
                                />
                            </Grid>
                            { /** STATUS */}
                            <Grid item xs={6} md={6} >
                                {/* {<Stack spacing={1}>
                                    <InputLabel htmlFor="vat-status">Stato</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        id="vat-status"
                                        name="vat_status"
                                        value={values.vat_status}
                                        label=""
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='active' >Active</MenuItem>
                                        <MenuItem value='inactive' >Inactive</MenuItem>
                                        <MenuItem value='trash'>Cestino</MenuItem>
                                    </Select>
                                    {touched.vat_status && errors.vat_status && (
                                        <FormHelperText error id="helper-text-vat-status">
                                            {errors.vat_status}
                                        </FormHelperText>
                                    )}
                                </Stack>} */}
                                <BasicSelect
                                    id="vat_status"
                                    name="vat_status"
                                    label="Stato *"
                                    inputValue={values.vat_status}
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
                            { /** CODE */}
                            <Grid item xs={10} >
                                {/* <Stack spacing={1}>
                                    <InputLabel htmlFor="vat-code">Code *</InputLabel>
                                    <OutlinedInput
                                        id="vat-code"
                                        value={values.vat_code}
                                        name="vat_code"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="X15"
                                        fullWidth
                                        error={Boolean(touched.vat_code && errors.vat_code)}
                                    />
                                    {touched.vat_code && errors.vat_code && (
                                        <FormHelperText error id="helper-text-vat-code">
                                            {errors.vat_code}
                                        </FormHelperText>
                                    )}
                                    <FormHelperText id="helper-text-vat-code">
                                        Usa X se esente IVA seguito da articolo / Usa cifra intera senza virgola se imponibile
                                    </FormHelperText>
                                </Stack> */}
                                <BasicOutlinedInput
                                    id="vat_code"
                                    name="vat_code"
                                    label="Code *"
                                    placeholder="I4"
                                    inputValue={values.vat_code}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    formHelper="Usa X se esente IVA seguito da articolo / Usa cifra intera senza virgola se imponibile"
                                />
                            </Grid>
                            <Grid item xs={2} >
                                {/* <Stack spacing={1}>
                                    <InputLabel htmlFor="iva_favourite">Preferita</InputLabel>
                                    <Box>
                                        <Checkbox
                                            id="iva_favourite"
                                            name="favourite"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            // fullWidth={false}
                                            checked={values.favourite}
                                            icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite />} />
                                    </Box>
                                </Stack> */}
                                <BasicCheckbox
                                    id="iva_favourite"
                                    name="favourite"
                                    label="Preferita"
                                    inputValue={values.favourite}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                />
                            </Grid>
                            { /** DESCRIPTION */}
                            <Grid item xs={12} md={12} >
                                {/* <Stack spacing={1}>
                                    <InputLabel htmlFor="vat-description">Descrizione *</InputLabel>
                                    <OutlinedInput
                                        id="vat-description"
                                        // type="company_name"
                                        value={values.vat_description}
                                        name="vat_description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Escluso art.15 DPR 633/72"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        // readOnly
                                        // disabled={!isEditable}
                                        error={Boolean(touched.vat_description && errors.vat_description)}
                                    />
                                    {touched.vat_description && errors.vat_description && (
                                        <FormHelperText error id="helper-text-vat-description">
                                            {errors.vat_description}
                                        </FormHelperText>
                                    )}
                                </Stack> */}
                                <BasicOutlinedInput
                                    id="vat_description"
                                    name="vat_description"
                                    label="Descrizione *"
                                    placeholder="Escluso art.15 DPR 633/72"
                                    inputValue={values.vat_description}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    multiline={true}
                                />
                            </Grid>
                            {/* SUBMIT */}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Salva IVA
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default IvaForm