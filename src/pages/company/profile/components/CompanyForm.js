import React, { useEffect } from 'react'

// material-ui
import {
    Box,
    Button,
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

// assets
import {
    EditOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ReplayIcon from '@mui/icons-material/Replay';

// Store
import { useSelector, useDispatch } from 'react-redux';
import { fetchOptions, getOptions, getOptionsDoctor, getOptionsStatus, saveCompanyOption } from 'store/reducers/options';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import { dispatchNotice } from 'utils/app/notice';
import { addNotice } from 'store/reducers/notices';
import useCryptoJS from 'hooks/useCryptoJS';

const validationSchema = Yup.object().shape({
    first_name: Yup.string().max(255).required('Campo obbligatorio'),
    last_name: Yup.string().max(255).required('Campo obbligatorio'),
    company_name: Yup.string().max(255).required('Campo obbligatorio'),
    cod_fisc: Yup.string().max(255).required('Campo obbligatorio'),
    piva: Yup.string().max(255).required('Campo obbligatorio'),
    email: Yup.string().email('Mail non valida').max(255),
    telephone: Yup.string().max(255),
    pec: Yup.string().email('Mail non valida').max(255),
    address: Yup.string().max(255).required('Campo obbligatorio'),
    zip_code: Yup.number().required('Campo Obbligatorio'),
    province: Yup.string().max(255).required('Campo obbligatorio'),
    region: Yup.string().max(255).required('Campo obbligatorio'),
    state: Yup.string().max(255).required('Campo obbligatorio'),
})

const CompanyForm = ({ doctorInfo, ...other }) => {
    const dispatch = useDispatch();

    const cryptoJS = useCryptoJS()

    const submitInfo = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        const dataValues = {
            ...values,
            company_name: cryptoJS.encrypt(values?.company_name),
            first_name: cryptoJS.encrypt(values?.first_name),
            last_name: cryptoJS.encrypt(values?.last_name),
            piva: cryptoJS.encrypt(values?.piva),
            cod_fisc: cryptoJS.encrypt(values?.cod_fisc),
            telephone: cryptoJS.encrypt(values?.telephone),
            email: cryptoJS.encrypt(values?.email),
            pec: cryptoJS.encrypt(values?.pec),
            address: cryptoJS.encrypt(values?.address),
        }
        console.log(dataValues);

        try {
            const resultAction = await dispatch(saveCompanyOption(dataValues)).unwrap()
            console.log(resultAction);
            dispatchNotice(resultAction, dispatch, addNotice)

            // setIsEditable(false)
            setStatus({ success: true });
            setSubmitting(false);
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
            {/* {doctorInfo !== undefined && } */}
            <Formik
                enableReinitialize={true}
                initialValues={{
                    first_name: doctorInfo?.doctor_option?.first_name ? doctorInfo?.doctor_option?.first_name : "",
                    last_name: doctorInfo?.doctor_option?.last_name,
                    company_name: doctorInfo?.doctor_option?.company_name, // 'Studio Medico Odontoiatrico Dott. F. Farneti',
                    piva: doctorInfo?.doctor_option?.piva, // '1250045879996',
                    cod_fisc: doctorInfo?.doctor_option?.cod_fisc, // "FGLERCLAASHH55A",
                    telephone: doctorInfo?.doctor_option?.telephone, // "3455698794",
                    email: doctorInfo?.doctor_option?.email, // "drew@example.com",
                    pec: doctorInfo?.doctor_option?.pec, // "mrdc@legalmail.pec.it",
                    address: doctorInfo?.doctor_option?.address, // "Via della factory 2",
                    zip_code: doctorInfo?.doctor_option?.zip_code, // 14567,
                    province: doctorInfo?.doctor_option?.province, // 'Genova',
                    region: doctorInfo?.doctor_option?.region, // 'Liguria',
                    state: doctorInfo?.doctor_option?.state, // 'Italia',
                    submit: null
                }}
                onSubmit={submitInfo}
                validationSchema={validationSchema}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            {/** FORM HEAD */}
                            <Grid item xs={12} /* sx={{ mb: 2 }} */ >
                                <Grid item xs={12} >
                                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>

                                        {/*  {!isEditable &&
                                            <IconButton size="large" onClick={() => { setIsEditable(true); }} >
                                                <EditOutlined />
                                            </IconButton>
                                        }
                                        
                                        {isEditable &&
                                            <IconButton size="large" onClick={() => resetForm()} >
                                                <ReplayIcon />
                                            </IconButton>}
                                        {isEditable &&
                                            <IconButton size="large" onClick={() => { resetForm(); setIsEditable(false); }}>
                                                <DisabledByDefaultIcon />
                                            </IconButton>} */}
                                        
                                        <IconButton size="large" onClick={() => resetForm()} >
                                            <ReplayIcon />
                                        </IconButton>
                                        <IconButton
                                            disabled={isSubmitting}
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            <SaveOutlined />
                                        </IconButton>

                                    </Box>
                                    {/* <Divider variant="middle" /> */}
                                </Grid>
                            </Grid>
                            {/* PERSONAL INFORMATION */}
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container spacing={3} >
                                    <Grid item xs={12} >
                                        <Typography variant="h6b">Informazioni Personali</Typography>
                                        <Divider variant="middle" />
                                    </Grid>
                                    <Grid item xs={12} >

                                        <BasicOutlinedInput
                                            id="company_name-doctor"
                                            name="company_name"
                                            label="Dicitura intestazione *"
                                            placeholder="Studio Medico Odontoiatrico Dott. Mario Rossi"
                                            inputValue={values.company_name}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} /* sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="first_name-doctor"
                                            name="first_name"
                                            label="Nome *"
                                            placeholder="Mario"
                                            inputValue={values.first_name}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} /* sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="last_name-doctor"
                                            name="last_name"
                                            label="Cognome *"
                                            placeholder="Rossi"
                                            inputValue={values.last_name}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="cod_fisc-doctor"
                                            name="cod_fisc"
                                            label="Codice Fiscale *"
                                            placeholder="MRIRSS54A12D969R"
                                            inputValue={values.cod_fisc}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="piva-doctor"
                                            name="piva"
                                            label="P. IVA *"
                                            placeholder="MRIRSS54A12D969R"
                                            inputValue={values.piva}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* CONTACT INFORMATION */}
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container spacing={3} >
                                    <Grid item xs={12}>
                                        <Typography variant="h6b">Contatti</Typography>
                                        <Divider variant="middle" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="telephone-doctor"
                                            name="telephone"
                                            label="Telefono"
                                            placeholder="+34886957841"
                                            inputValue={values.telephone}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="email-doctor"
                                            name="email"
                                            label="Email"
                                            placeholder="+34886957841"
                                            inputValue={values.email}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="pec-doctor"
                                            name="pec"
                                            label="Pec"
                                            placeholder="mario.rossi@legalmail.pec.it"
                                            inputValue={values.pec}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* ADDRESS INFORMATION */}
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sx={{ paddingBottom: '.5rem'/* , mb: 1  */ }}>
                                        <Typography variant="h6b">Indirizzo</Typography>
                                        <Divider variant="middle" />
                                    </Grid>
                                    <Grid item xs={12} sm={9}/*  sx={{ mt: 1, mb: 2 }} */>
                                        <BasicOutlinedInput
                                            id="address-doctor"
                                            name="address"
                                            label="Residenza *"
                                            placeholder="Via caterina rossi 2/3"
                                            inputValue={values.address}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={3}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="zip_code-doctor"
                                            name="zip_code"
                                            label="CAP *"
                                            placeholder="16151"
                                            inputValue={values.zip_code}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable} // disabled={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="province-doctor"
                                            name="province"
                                            label="Provincia *"
                                            placeholder="Genova"
                                            inputValue={values.province}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="region-doctor"
                                            name="region"
                                            label="Regione *"
                                            placeholder="Liguria"
                                            inputValue={values.region}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>

                                        <BasicOutlinedInput
                                            id="state-doctor"
                                            name="state"
                                            label="Nazione *"
                                            placeholder="Italia"
                                            inputValue={values.state}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default CompanyForm