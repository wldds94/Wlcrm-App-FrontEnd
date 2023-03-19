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
import Divider from '@mui/material/Divider';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// prject import
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import BasicCheckbox from 'components/input/BasicCheckbox';

// store
import { useDispatch, useSelector } from 'react-redux'
// slice
import { saveBankOption } from 'store/reducers/options';

// assets
import {
    EditOutlined,
    SaveOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { addNotice } from 'store/reducers/notices';
import { dispatchNotice } from 'utils/app/notice';
import useCryptoJS from 'hooks/useCryptoJS';


const validationSchema = Yup.object().shape({
    bank_name: Yup.string().max(255).required('Campo obbligatorio'),
    bank_iban: Yup.string().max(255).required('Campo obbligatorio'),
    favourite: Yup.bool().default(false),
})

const BankForm = ({ formData = null, ...others }) => {
    const dispatch = useDispatch()

    // const [isEditable, setIsEditable] = React.useState(false)

    const initialValues = formData != null ? formData : {
        bank_name: "",
        bank_iban: "",
        favourite: false
    }

    const cryptoJS = useCryptoJS()
    const submitBank = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        const dataValues = {
            ...values,
            bank_name: cryptoJS.encrypt(values?.bank_name),
            bank_iban: cryptoJS.encrypt(values?.bank_iban),
        }

        try {
            const resultAction = await dispatch(saveBankOption(dataValues)).unwrap()
            dispatchNotice(resultAction, dispatch, addNotice)

            console.log('Success');

            setStatus({ success: true });
            setSubmitting(false);
            // resetForm()
            if (formData != null) {
                others.afterSubmitCallback()
            } else {
                resetForm()
            }
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
                onSubmit={submitBank}
                validationSchema={validationSchema}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {/* isEditable &&  */<Grid item xs={12} sx={{ mt: 4, mb: 2 }} >
                            <Grid container spacing={1} >
                                <Grid item xs={10} sm={5} >
                                    {/* <Stack spacing={1}>
                                        <InputLabel htmlFor="bank_name">Nome Banca *</InputLabel>
                                        <OutlinedInput
                                            id="bank_name"
                                            // type="company_name"
                                            value={values.bank_name}
                                            name="bank_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Banca popolare di Sondrio"
                                            fullWidth
                                            // readOnly
                                            // disabled={!isEditable}
                                            error={Boolean(touched.bank_name && errors.bank_name)}
                                        />
                                        {touched.bank_name && errors.bank_name && (
                                            <FormHelperText error id="helper-text-bank_name">
                                                {errors.bank_name}
                                            </FormHelperText>
                                        )}
                                    </Stack> */}
                                    <BasicOutlinedInput
                                        id="bank_name"
                                        name="bank_name"
                                        label="Nome Banca *"
                                        placeholder="Banca popolare di Sondrio"
                                        inputValue={values.bank_name}
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} >
                                    {/* <Stack spacing={1}>
                                        <InputLabel htmlFor="bank_favourite">Preferita</InputLabel>
                                        <Box>
                                            <Checkbox
                                                id="bank_favourite"
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
                                        id="bank_favourite"
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
                                <Grid item xs={12} sm={5} >
                                    {/* <Stack spacing={1}>
                                        <InputLabel htmlFor="bank_iban">Iban *</InputLabel>
                                        <OutlinedInput
                                            id="bank_iban"
                                            // type="company_name"
                                            value={values.bank_iban}
                                            name="bank_iban"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="IT70C0569601402000002034X28"
                                            fullWidth
                                            // readOnly
                                            // disabled={!isEditable}
                                            error={Boolean(touched.bank_iban && errors.bank_iban)}
                                        />
                                        {touched.bank_iban && errors.bank_iban && (
                                            <FormHelperText error id="helper-text-bank_iban">
                                                {errors.bank_iban}
                                            </FormHelperText>
                                        )}
                                    </Stack> */}
                                    <BasicOutlinedInput
                                        id="bank_iban"
                                        name="bank_iban"
                                        label="Iban *"
                                        placeholder="IT70C0569601402000002034X28"
                                        inputValue={values.bank_iban}
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>}
                        {/** FORM HEAD */}
                        <Grid item xs={12} sx={{ mb: 2 }} >
                            <Grid item xs={12} >
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>

                                    {/* {!isEditable &&
                                        <IconButton size="large" onClick={() => { setIsEditable(true); }} >
                                            <PlusCircleOutlined />
                                        </IconButton>
                                    } */}
                                    {/* {isEditable &&
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            // fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            <SaveOutlined />
                                        </Button>}
                                    {isEditable &&
                                        <IconButton size="large" onClick={() => resetForm()} >
                                            <ReplayIcon />
                                        </IconButton>}
                                    {isEditable &&
                                        <IconButton size="large" onClick={() => { resetForm(); setIsEditable(false); }}>
                                            <DisabledByDefaultIcon />
                                        </IconButton>} */}
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        // fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        <SaveOutlined />
                                    </Button>
                                    <IconButton size="large" onClick={() => resetForm()} >
                                        <ReplayIcon />
                                    </IconButton>
                                </Box>
                                {/* <Divider variant="middle" /> */}
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default BankForm