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

const CompanyInfo = ({ doctorInfo, ...others }) => {
    const [isEditable, setIsEditable] = React.useState(false)

    // // redux
    const dispatch = useDispatch();
    // const optionsStatus = useSelector(getOptionsStatus)
    // const doctorOption = useSelector(getOptionsDoctor)
    // const options = useSelector(getOptions)
    // console.log(doctorInfo);

    const submitInfo = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        try {
            const resultAction = await dispatch(saveCompanyOption(values)).unwrap()
            console.log(resultAction);
            dispatchNotice(resultAction, dispatch, addNotice)
            
            setIsEditable(false)
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

                                        {!isEditable &&
                                            <IconButton size="large" onClick={() => { setIsEditable(true); }} >
                                                <EditOutlined />
                                            </IconButton>
                                        }
                                        {isEditable &&
                                            <IconButton
                                                disabled={isSubmitting}
                                                size="large"
                                                type="submit"
                                            >
                                                <SaveOutlined />
                                            </IconButton>}
                                        {isEditable &&
                                            <IconButton size="large" onClick={() => resetForm()} >
                                                <ReplayIcon />
                                            </IconButton>}
                                        {isEditable &&
                                            <IconButton size="large" onClick={() => { resetForm(); setIsEditable(false); }}>
                                                <DisabledByDefaultIcon />
                                            </IconButton>}

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
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="company_name-doctor">Dicitura intestazione *</InputLabel>
                                            <OutlinedInput
                                                id="company_name-doctor"
                                                type="company_name"
                                                value={values.company_name}
                                                name="company_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Mario"
                                                fullWidth
                                                // readOnly
                                                disabled={!isEditable}
                                                error={Boolean(touched.company_name && errors.company_name)}
                                            />
                                            {touched.company_name && errors.company_name && (
                                                <FormHelperText error id="helper-text-company_name-doctor">
                                                    {errors.company_name}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} /* sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="first_name-doctor">Nome *</InputLabel>
                                            <OutlinedInput
                                                id="first_name-doctor"
                                                type="first_name"
                                                value={values.first_name}
                                                name="first_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Mario"
                                                fullWidth
                                                disabled={!isEditable}
                                                error={Boolean(touched.first_name && errors.first_name)}
                                            />
                                            {touched.first_name && errors.first_name && (
                                                <FormHelperText error id="helper-text-first_name-doctor">
                                                    {errors.first_name}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} /* sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="last_name-doctor">Cognome *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.last_name && errors.last_name)}
                                                id="last_name-doctor"
                                                type="last_name"
                                                value={values.last_name}
                                                name="last_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Rossi"
                                                disabled={!isEditable}
                                                inputProps={{}}
                                            />
                                            {touched.last_name && errors.last_name && (
                                                <FormHelperText error id="helper-text-last_name-doctor">
                                                    {errors.last_name}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="cod_fisc-doctor">Codice Fiscale / P. IVA *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.cod_fisc && errors.cod_fisc)}
                                                id="cod_fisc-doctor"
                                                type="text"
                                                value={values.cod_fisc}
                                                name="cod_fisc"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="MRIRSS54A12D969R"
                                                disabled={!isEditable}
                                            />
                                            {touched.cod_fisc && errors.cod_fisc && (
                                                <FormHelperText error id="helper-text-cod_fisc-doctor">
                                                    {errors.cod_fisc}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="piva-doctor">Codice Fiscale / P. IVA *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.piva && errors.piva)}
                                                id="piva-doctor"
                                                type="piva"
                                                value={values.piva}
                                                name="piva"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="MRIRSS54A12D969R"
                                                disabled={!isEditable}
                                            />
                                            {touched.piva && errors.piva && (
                                                <FormHelperText error id="helper-text-piva-doctor">
                                                    {errors.piva}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
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
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="telephone-doctor">Telefono</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.telephone && errors.telephone)}
                                                id="telephone-doctor"
                                                // type="telephone"
                                                value={values.telephone}
                                                name="telephone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                disabled={!isEditable}
                                            />
                                            {touched.telephone && errors.telephone && (
                                                <FormHelperText error id="helper-text-telephone-doctor">
                                                    {errors.telephone}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="email-doctor">Email</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                                id="email-doctor"
                                                // type="telephone"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                disabled={!isEditable}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="helper-text-email-doctor">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="pec-doctor">Pec</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.pec && errors.pec)}
                                                id="pec-doctor"
                                                // type="telephone"
                                                value={values.pec}
                                                name="pec"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                disabled={!isEditable}
                                            />
                                            {touched.pec && errors.pec && (
                                                <FormHelperText error id="helper-text-pec-doctor">
                                                    {errors.pec}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
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
                                            readOnly={!isEditable}
                                        />
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="address-doctor">Residenza *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.address && errors.address)}
                                                id="address-doctor"
                                                // type="telephone"
                                                value={values.address}
                                                name="address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Via caterina rossi 2/3"
                                                disabled={!isEditable}
                                            />
                                            {touched.address && errors.address && (
                                                <FormHelperText error id="helper-text-address-doctor">
                                                    {errors.address}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
                                    </Grid>
                                    <Grid item xs={12} sm={3}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="zip_code-doctor">CAP *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.zip_code && errors.zip_code)}
                                                id="zip_code-doctor"
                                                // type="telephone"
                                                value={values.zip_code}
                                                name="zip_code"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                disabled={!isEditable}
                                                placeholder="16151"
                                            />
                                            {touched.zip_code && errors.zip_code && (
                                                <FormHelperText error id="helper-text-zip_code-doctor">
                                                    {errors.zip_code}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable} // disabled={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="province-doctor">Provincia *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.province && errors.province)}
                                                id="province-doctor"
                                                // type="telephone"
                                                value={values.province}
                                                name="province"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                disabled={!isEditable}
                                                placeholder="Genova"
                                            />
                                            {touched.province && errors.province && (
                                                <FormHelperText error id="helper-text-province-doctor">
                                                    {errors.province}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="region-doctor">Regione *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.region && errors.region)}
                                                id="region-doctor"
                                                // type="telephone"
                                                value={values.region}
                                                name="region"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                disabled={!isEditable}
                                                placeholder="Liguria"
                                            />
                                            {touched.region && errors.region && (
                                                <FormHelperText error id="helper-text-region-doctor">
                                                    {errors.region}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>
                                        {/* <Stack spacing={1}>
                                            <InputLabel htmlFor="state-doctor">Nazione *</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.state && errors.state)}
                                                id="state-doctor"
                                                // type="telephone"
                                                value={values.state}
                                                name="state"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                disabled={!isEditable}
                                                placeholder="Italia"
                                            />
                                            {touched.state && errors.state && (
                                                <FormHelperText error id="helper-text-state-doctor">
                                                    {errors.state}
                                                </FormHelperText>
                                            )}
                                        </Stack> */}
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
                                            readOnly={!isEditable}
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

export default CompanyInfo