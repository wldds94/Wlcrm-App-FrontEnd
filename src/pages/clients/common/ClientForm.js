import { useEffect, useState } from 'react'

// Store
import { useDispatch, useSelector } from 'react-redux'
// types
import { addClient } from 'store/reducers/client';
import { addNotice } from 'store/reducers/notices';

// material-ui
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import SaveButton from 'components/button/SaveButton';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import BasicSelect from 'components/input/BasicSelect';

// utils
import { buildNotice, dispatchNotice } from 'utils/app/notice';
import useCryptoJS from 'hooks/useCryptoJS';
import { calculateCF } from 'utils/app/clients/coficeFiscale/codiceFiscale';

// assets
import { MdOutlineCalculate } from "react-icons/md";


const ClientForm = ({ formData = null, editable = true, ...others }) => {
    // console.log(formData);
    const dispatch = useDispatch()

    const initialValues = formData != null ? {
        id: formData?.id ? formData?.id : "",
        first_name: formData?.first_name ? formData?.first_name : "",
        last_name: formData?.last_name ? formData?.last_name : "",
        sex: formData?.sex ? formData?.sex : "O", // 0,
        birth_date: formData?.birth_date ? formData.birth_date.slice(0, 10) : "",
        // formData?.birth_date.lenght > 10 ? formData.birth_date.split(" ")[0] : "" : "",
        piva: formData?.piva ? formData?.piva : "",
        type: formData?.type ? formData?.type : "",
        telephone: formData?.telephone ? formData?.telephone : "",
        // telephonePrefix: formData?.telephone ? formData?.telephone?.slice(0, 2) : "",
        // telephoneBody: formData?.telephone ? formData?.telephone?.substring(3) : "",
        email: formData?.email ? formData?.email : "",
        pec: formData?.pec ? formData?.pec : "",
        address: formData?.address ? formData?.address : "",
        zip_code: formData?.zip_code ? formData?.zip_code : "",
        province: formData?.province ? formData?.province : "",
        region: formData?.region ? formData?.region : "",
        state: formData?.state ? formData?.state : "",
        // birth_province
        birth_province: formData?.birth_province ? formData?.birth_province : "",
        submit: null
    } : {
        id: "",
        first_name: '',
        last_name: '',
        sex: "O",
        birth_date: '',
        piva: '',
        type: 'FISICALLY',
        telephone: '',
        // telephonePrefix: "",
        // telephoneBody: "",
        email: '',
        pec: '',
        address: '',
        zip_code: '',
        province: '',
        region: '',
        state: '',
        birth_province: "",
        submit: null
    }

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        first_name: Yup.string().max(255).required('Campo obbligatorio'),
        last_name: Yup.string().max(255).required('Campo obbligatorio'),
        sex: Yup.string().max(255),
        birth_date: Yup.date(),
        type: Yup.string().max(255).required('Campo obbligatorio'),
        piva: Yup.string().max(255).required('Campo obbligatorio')
            .test('exist-piva', 'P.Iva o Codice Fiscale già usato', function (value) {
                // console.log(value);
                return true
            }),
        email: Yup.string().email('Mail non valida').max(255),
        telephone: Yup.string().max(255),
        pec: Yup.string().email('Mail non valida').max(255),
        address: Yup.string().max(255).required('Campo obbligatorio'),
        zip_code: Yup.string().required('Campo Obbligatorio'),
        province: Yup.string().max(255).required('Campo obbligatorio'),
        region: Yup.string().max(255).required('Campo obbligatorio'),
        state: Yup.string().max(255).required('Campo obbligatorio'),
    })

    const [isEditabled, setIsEditabled] = useState(editable)
    useEffect(() => {
        if (editable !== isEditabled) {
            setIsEditabled(editable)
        }
    }, [editable])

    const clientsTypes = useSelector((state) => state?.options?.options?.base_option?.clients_type) // console.log(clientsTypes);

    const cryptoJS = useCryptoJS()

    const submitClient = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        // console.log(values);

        const dataValues = {
            ...values,
            first_name: cryptoJS.encrypt(values?.first_name),
            last_name: cryptoJS.encrypt(values?.last_name),
            piva: cryptoJS.encrypt(values?.piva),
            telephone: cryptoJS.encrypt(values?.telephone),
            email: cryptoJS.encrypt(values?.email),
            pec: cryptoJS.encrypt(values?.pec),
            address: cryptoJS.encrypt(values?.address),
        }
        // console.log(dataValues);

        try {
            const resultAction = await dispatch(addClient(dataValues)).unwrap() // console.log(resultAction);
            console.log('Success');

            dispatchNotice(resultAction, dispatch, addNotice)
            // const notice = buildNotice(resultAction)
            // dispatch(addNotice(notice))

            setStatus({ success: true });
            // setSubmitting(false);

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
            // setSubmitting(false);
        } finally {
            // END SUBMITTING
            console.log('End Submit');
            setSubmitting(false);
        }
        // return true
    }

    const checkCodFisc = (values, setFieldValue) => {
        console.log(values);
        const {
            first_name = "",
            last_name = "",
            birth_province = "",
            birth_date = "",
            sex = ""
        } = values
        if (first_name && last_name && birth_province && birth_date && sex) {
            const cf = calculateCF(first_name, last_name, birth_province, birth_date, sex)
            console.log(cf);
            setFieldValue('piva', cf)
        }
    }

    // const getMergedTelephone = (value, oldValue, name = 'telephoneBody') => {
    //     let values = {
    //         telephonePrefix: oldValue?.slice(0, 2),
    //         telephoneBody: oldValue?.substring(3),
    //     }
    //     values[name] = value
    //     // const newValue = {
    //     //     ...old,
    //     //     name: value
    //     // }
    //     return Object.keys(values)?.reduce((prev, next) => {
    //         return prev + next
    //     }, "")
    // }

    return (
        <>
            {/* <MainCard> */}
            <Box sx={{ pt: 2, /* paddingTop: '40px' *//* , height: '100%', */ }} >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitClient}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, resetForm }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                {/* PERSONAL INFORMATION */}
                                <Grid item xs={12} sx={{ mb: 2 }} /* sx{{display: 'flex'}}  */ >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} >
                                            <Typography variant="h6b">Informazioni Personali</Typography>
                                            <Divider variant="middle" />
                                        </Grid>
                                        {/* NOME */}
                                        <Grid item xs={6} sm={6} /* sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="first_name-client"
                                                name="first_name"
                                                label="Nome *"
                                                placeholder="Mario"
                                                inputValue={values.first_name}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={(e) => {
                                                    handleChange(e)
                                                    // checkCodFisc({...values, first_name: e.currentTarget.value})
                                                }}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        {/* COGNOME */}
                                        <Grid item xs={6} sm={6} /* sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="last_name-client"
                                                name="last_name"
                                                label="Cognome *"
                                                placeholder="Rossi"
                                                inputValue={values.last_name}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>

                                        {/* DATA DI NASCITA */}
                                        <Grid item xs={12} sm={6} /* sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="birth_date-client"
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
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        {/** TYPE */}
                                        {/* <Grid item xs={12} sm={3} >
                                            <BasicSelect
                                                id="type-client"
                                                name="type"
                                                label="Tipo Paziente"
                                                inputValue={values.type}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                options={clientsTypes}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid> */}
                                        {/** SESSO **/}
                                        <Grid item xs={12} sm={6} style={{ paddingTop: '0.7rem', }} >
                                            <FormControl sx={{ /* flexDirection: "row" *//* , alignItems: 'start' , gap: 2,*/ pl: '.9rem', }} >
                                                <FormLabel id="clients-sex-radio-buttons-group" sx={{ fontSize: '.65rem', lineHeight: '.8rem', }}>Sesso</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="clients-sex-radio-buttons-group "
                                                    id="clients-sex"
                                                    value={values.sex}
                                                    name="sex"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    sx={{ flexDirection: "row", /* fontSize: '.7rem', gap: '.1rem' */ }}
                                                >
                                                    <FormControlLabel
                                                        disabled={!isEditabled}
                                                        // readOnly={!isEditabled} 
                                                        value="F"
                                                        control={<Radio size="small" />}
                                                        label="F"
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                    />
                                                    <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />
                                                    <FormControlLabel
                                                        disabled={!isEditabled}
                                                        value="M"
                                                        control={<Radio size="small" />}
                                                        label="M"
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                    />
                                                    <Divider variant="middle" orientation="vertical" flexItem sx={{ mr: 1.5 }} />
                                                    <FormControlLabel
                                                        disabled={!isEditabled}
                                                        value="O"
                                                        control={<Radio size="small" />}
                                                        label="Non Disp"
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.7rem' } }}
                                                    />
                                                    {/* <FormControlLabel disabled={!isEditabled} value="0" control={<Radio size="small" />} label="Non Disp" /> */}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        {/** PIVA */}
                                        {/* <Grid item xs={12} sm={6} >
                                            <BasicOutlinedInput
                                                id="piva-client"
                                                name="piva"
                                                label="Codice Fiscale / P. IVA *"
                                                placeholder="MRIRSS54A12D969R"
                                                inputValue={values.piva}
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
                                {/* CONTACT INFORMATION */}
                                <Grid item xs={12} sx={{ mb: 2 }} >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12}>
                                            <Typography variant="h6b">Contatti</Typography>
                                            <Divider variant="middle" />
                                        </Grid>

                                        <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>
                                            <BasicOutlinedInput
                                                id="telephone-client"
                                                name="telephone"
                                                label="Telefono"
                                                placeholder="393475624897"
                                                // type='number'
                                                // inputProps={{
                                                //     min: 0,
                                                // }}
                                                inputValue={values.telephone}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                readOnly={!isEditabled}
                                            />
                                            <Typography variant="caption" color="secondary" >
                                                *Inserire il prefisso internazionale per chiamate fuori dall'Italia
                                            </Typography>
                                            {/* <Grid container spacing={3} >
                                                <Grid item xs={4} sm={3} >
                                                    
                                                </Grid>
                                                <Grid item xs={8} sm={9}>

                                               
                                                </Grid>
                                    </Grid> */}

                                        </Grid>
                                        <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="email-client"
                                                name="email"
                                                label="Email"
                                                placeholder="mariorossi@gmail.com"
                                                inputValue={values.email}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}/*  sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="pec-client"
                                                name="pec"
                                                label="Pec"
                                                placeholder=""
                                                inputValue={values.pec}
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
                                {/* ADDRESS INFORMATION */}
                                <Grid item xs={12} sx={{ mb: 2 }} >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sx={{ paddingBottom: '.5rem'/* , mb: 1  */ }}>
                                            <Typography variant="h6b">Indirizzo</Typography>
                                            <Divider variant="middle" />
                                        </Grid>
                                        <Grid item xs={12} sm={9}/*  sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="address-client"
                                                name="address"
                                                label="Indirizzo *"
                                                placeholder="Via caterina rossi 2/3"
                                                inputValue={values.address}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sm={3}/*  sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="zip_code-client"
                                                name="zip_code"
                                                label="CAP *"
                                                placeholder="16151"
                                                inputValue={values.zip_code}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={8} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="province-client"
                                                name="province"
                                                label="Provincia *"
                                                placeholder="Genova"
                                                inputValue={values.province}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="region-client"
                                                name="region"
                                                label="Regione *"
                                                placeholder="Liguria"
                                                inputValue={values.region}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={4}/*  sx={{ mt: 1, mb: 2 }} */>

                                            <BasicOutlinedInput
                                                id="state-client"
                                                name="state"
                                                label="Nazione *"
                                                placeholder="Italia"
                                                inputValue={values.state}
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

                                {/* PROFILO FISCALE */}
                                <Grid item xs={12} sx={{ mb: 2 }} >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sx={{ paddingBottom: '.5rem'/* , mb: 1  */ }}>
                                            <Typography variant="h6b">Profilo Fiscale</Typography>
                                            <Divider variant="middle" />
                                        </Grid>
                                        {/** TYPE */}
                                        <Grid item xs={12} sm={6} >
                                            <BasicSelect
                                                id="type-client"
                                                name="type"
                                                label="Tipo Paziente"
                                                inputValue={values.type}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                options={clientsTypes}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >

                                            <BasicOutlinedInput
                                                id="birth_province"
                                                name="birth_province"
                                                label="Provincia di Nascita"
                                                placeholder="Genova"
                                                inputValue={values.birth_province}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                readOnly={!isEditabled}
                                            />
                                        </Grid>
                                        {/** PIVA */}
                                        <Grid item xs={12} >
                                            <Grid container spacing={1} >
                                                <Grid item xs={10} >
                                                    <BasicOutlinedInput
                                                        id="piva-client"
                                                        name="piva"
                                                        label="Codice Fiscale / P. IVA *"
                                                        placeholder="MRIRSS54A12D969R"
                                                        inputValue={values.piva}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                        readOnly={!isEditabled}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <IconButton variant="contained" color="primary"
                                                        onClick={() => checkCodFisc(values, setFieldValue)}
                                                    >
                                                        <MdOutlineCalculate />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>

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
                                        />}
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Box >
            {/* </MainCard> */}
        </>
    )
}

export default ClientForm