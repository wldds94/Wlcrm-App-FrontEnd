import React from 'react'

// material-ui
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
} from '@mui/material';
import Divider from '@mui/material/Divider';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import SaveButton from 'components/button/SaveButton';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';

// Store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { saveUsersInfo } from 'store/reducers/users';
import { dispatchNotice } from 'utils/app/notice';
import { addNotice } from 'store/reducers/notices';

// assets


const AccountInfoForm = ({ account/*  = null */, editable = false, ...others }) => {
    const dispatch = useDispatch()

    const [isEditable, setIsEditable] = React.useState(editable)

    const initialValues = account != null ? {
        ID: account?.ID,
        // user_email: account?.user_email,

        first_name: account?.meta?.first_name ? account?.meta?.first_name : "",
        last_name: account?.meta?.last_name ? account?.meta?.last_name : "",
        sex: account?.meta?.sex ? account?.meta?.sex : "O",
        telephone: account?.meta?.telephone ? account?.meta?.telephone : "",
        birth_date: account?.meta?.birth_date ? account?.meta?.birth_date : "",
        // address: "",
        description: account?.meta?.description ? account?.meta?.description : "",
        way: account?.meta?.way ? account?.meta?.way : "",
        zip_code: account?.meta?.zip_code ? account?.meta?.zip_code : "",
        province: account?.meta?.province ? account?.meta?.province : "",
        region: account?.meta?.region ? account?.meta?.region : "",
        state: account?.meta?.state ? account?.meta?.state : "",

        submit: null
    } : {
        user_email: '',

        first_name: '',
        last_name: '',
        sex: "O",
        telephone: "",
        birth_date: "",
        address: "",
        description: "",
        way: "",
        zip_code: "",
        province: "",
        region: "",
        state: "",

        submit: null
    }

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);
        // setSubmitting(false);
        try {
            const resultAction = await dispatch(saveUsersInfo(values)).unwrap() // console.log(resultAction);
            console.log('Success');

            dispatchNotice(resultAction, dispatch, addNotice)

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
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit} style={{ padding: 0, paddingTop: '16px'}}>
                        <Grid container spacing={2}>
                            {/** PERSONAL INFORMATION **/}
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container spacing={3}>
                                    <SimpleHeaderDivider title="Informazioni Personali" />
                                    {/** NOME **/}
                                    <Grid item xs={6} >
                                        <BasicOutlinedInput
                                            id="account-first_name"
                                            name="first_name"
                                            label="Nome *"
                                            placeholder="Luca"
                                            inputValue={values.first_name}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />

                                    </Grid>
                                    {/** COGNOME **/}
                                    <Grid item xs={6} >
                                        <BasicOutlinedInput
                                            id="account-last_name"
                                            name="last_name"
                                            label="Cognome *"
                                            placeholder="Parodi"
                                            inputValue={values.last_name}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        // readOnly={!isEditable}
                                        />

                                    </Grid>

                                    {/** SESSO **/}
                                    <Grid item xs={12} sm={6} style={{ paddingTop: '0.7rem', }} >
                                        <FormControl sx={{ /* flexDirection: "row" *//* , alignItems: 'start' , gap: 2,*/ pl: '.9rem', }} >
                                            <FormLabel id="account-sex-radio-buttons-group" sx={{ fontSize: '.65rem', lineHeight: '.8rem', }}>Sesso</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="account-sex-radio-buttons-group"
                                                id="account-sex"
                                                value={values.sex}
                                                name="sex"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                sx={{ flexDirection: "row", }}
                                            >
                                                <FormControlLabel
                                                    // disabled={!isEditabled}
                                                    value="F"
                                                    control={<Radio size="small" />}
                                                    label="F"
                                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                />
                                                <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />
                                                <FormControlLabel
                                                    value="M"
                                                    control={<Radio size="small" />}
                                                    label="M"
                                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                />
                                                <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />
                                                <FormControlLabel
                                                    value="O"
                                                    control={<Radio size="small" />}
                                                    label="Non Disp"
                                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/** DATA NASCITA **/}
                                    <Grid item xs={6} >
                                        <BasicOutlinedInput
                                            id="account-birth_date"
                                            name="birth_date"
                                            type='date'
                                            // label="Data di nascita"
                                            // placeholder="Rossi"
                                            inputValue={values.birth_date}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />

                                    </Grid>


                                    {/** TELEFONO **/}
                                    <Grid item xs={6} >
                                        <BasicOutlinedInput
                                            id="account-telephone"
                                            name="telephone"
                                            label="Telefono"
                                            placeholder="+393465789635"
                                            inputValue={values.telephone}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />

                                    </Grid>
                                    {/** EMAIL **/}
                                    {/* <Grid item xs={6} sx={{ mb: 2 }} >
                                <InputLabel htmlFor="account-user_email">Email</InputLabel>
                                <TextField
                                    id="account-user_email"
                                    value={values.user_email}
                                    name="user_email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    size="small"
                                    // variant="standard"
                                    // label="Telefono"
                                    fullWidth
                                    // disabled
                                    error={Boolean(touched.user_email && errors.user_email)}
                                />
                                {touched.user_email && errors.user_email && (
                                    <FormHelperText error id="helper-text-account-user_email">
                                        {errors.user_email}
                                    </FormHelperText>
                                )}
                            </Grid> */}
                                </Grid>
                            </Grid>

                            {/** ADDRESS **/}
                            <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container spacing={3}>
                                    <SimpleHeaderDivider title="Indirizzo" />
                                    {/* VIA / CIVICO */}
                                    <Grid item xs={12} sm={9}/*  sx={{ mt: 1, mb: 2 }} */>
                                        <BasicOutlinedInput
                                            id="account-way"
                                            name="way"
                                            label="Via"
                                            placeholder="Via Caterina Rossi 2 / 3"
                                            inputValue={values.way}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />

                                    </Grid>
                                    {/* ZIP CODE */}
                                    <Grid item xs={4} sm={3}/*  sx={{ mt: 1, mb: 2 }} */>
                                        <BasicOutlinedInput
                                            id="account-zip_code"
                                            name="zip_code"
                                            label="CAP"
                                            placeholder="16151"
                                            inputValue={values.zip_code}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />

                                    </Grid>
                                    {/* PROVINCE */}
                                    <Grid item xs={8} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>
                                        <BasicOutlinedInput
                                            id="account-province"
                                            name="province"
                                            label="Provincia"
                                            placeholder="Genova"
                                            inputValue={values.province}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />

                                    </Grid>
                                    {/* REGION */}
                                    <Grid item xs={6} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>
                                        <BasicOutlinedInput
                                            id="account-region"
                                            name="region"
                                            label="Regione"
                                            placeholder="Liguria"
                                            inputValue={values.region}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />

                                    </Grid>
                                    {/* STATE */}
                                    <Grid item xs={6} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>
                                        <BasicOutlinedInput
                                            id="account-state"
                                            name="state"
                                            label="Nazione"
                                            placeholder="Italia"
                                            inputValue={values.state}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />

                                    </Grid>

                                </Grid>
                            </Grid>

                            {/** SUBMIT */}
                            <Grid item xs={12}>
                                <SaveButton isSubmitting={isSubmitting} /* setSubmitting={setSubmitting} */ onSubmit={handleSubmit} />

                            </Grid>


                        </Grid>
                    </form>
                )}
            </Formik>

        </>
    )
}

export default AccountInfoForm