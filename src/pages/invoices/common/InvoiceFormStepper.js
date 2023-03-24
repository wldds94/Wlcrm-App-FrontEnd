import React, { useEffect } from 'react'

// material-ui
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormGroup,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    MenuItem,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    Slide,
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepButton,
    Switch,
    Toolbar,
    TextField,
    Typography
} from '@mui/material';
// styled
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import InvoicePreview from 'pages/invoices/preview/InvoicePreview';
import SaveButton from 'components/button/SaveButton';
import ClientsAutocompleteField from 'components/input/app-autocomplete/ClientsAutocompleteField';
import HeaderPreview from '../preview/HeaderPreview';

// Redux
import { useDispatch, useSelector } from 'react-redux';
// Slices
import { saveInvoice } from 'store/reducers/invoice';
import { addNotice } from 'store/reducers/notices';

// utils
import { getInvoicesMax, getVatsGroup } from 'utils/app/invoice/invoice';
import { getUserFullAddress } from 'utils/app/user';
import { dispatchNotice } from 'utils/app/notice';

// assets
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PercentIcon from '@mui/icons-material/Percent';
import EuroIcon from '@mui/icons-material/Euro';
import ReplayIcon from '@mui/icons-material/Replay';
import TagIcon from '@mui/icons-material/Tag';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// assets
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io'

// hooks
import useClients from 'hooks/redux/useClients';
import useCompany from 'hooks/redux/useCompany';
import useCryptoJS from 'hooks/useCryptoJS';

const steps = ['Numerazione', 'Profilo Fiscale', 'Destinatario', 'Servizi', 'Addizionali'];
const stepsForm = [{
    label: 'Numerazione',
    keyValues: [{
        key: 'number',
        preValue: '# ',
    }, {
        key: 'date',
        displayCallback: (value) => { return value }
        // preValue: '# ',
    }]
    // preValue: '# ',
    // keyValues: ['number', 'date']
}, {
    label: 'Profilo Fiscale',
    keyValues: [{
        key: 'company_full_name',
    }, {
        key: 'company_piva',
    },]
}, {
    label: 'Destinatario',
    keyValues: [{
        key: 'client_full_name',
    }, {
        key: 'client_piva',
    },]
}, {
    label: 'Servizi',
    keyValues: [{
        key: 'subtotal',
        preValue: '€ ',
    }, {
        key: 'paid',
        displayCallback: (value) => { return value > 0 ? 'Pagata' : 'Da Saldare' }
    },]
}, {
    label: 'Addizionali',
    keyValues: []
}];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object().shape({
    id: Yup.number().positive().integer(),
    // description: Yup.string().max(255).required('Campo obbligatorio'),
    // price: Yup.number().positive(),
    // status: Yup.string().max(255).default('active'),
})


const InvoiceFormStepper = ({
    formData = null,
    clientId = false,
    clientEditable = true,
    /** STEPPER */
    step = false,
    ...others
}) => {
    const theme = useTheme()
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();

    const [openSearchClient, setOpenSearchClient] = React.useState(false);

    const [openPreviewInvoice, setOpenPreviewInvoice] = React.useState(false);

    const clientsList = useClients()?.clients // useSelector(selectAllClients)

    // const invoicesList = useSelector(getAllInvoices)
    const maxInvoice = useSelector((state) => state.invoice?.max) // console.log(maxInvoice);

    const companyOptions = useCompany()
    const defaultStep = companyOptions?.settings?.invoice?.invoice_step
    const stepNumber = defaultStep ? (Number(defaultStep) > 0 ? Number(defaultStep) : 0) : 0
    const initialStep = step !== false ? step : ((stepNumber > 0 && stepNumber < 5) ? stepNumber - 1 : 0)

    const paymentsList = companyOptions?.base_option?.payment // useSelector(getOptionsBasePayment)
    const favouritePayment = paymentsList?.find(el => el.code == companyOptions?.settings?.preferences?.payment_id) // useSelector(getOptionsFavouritePayment)

    const banksList = companyOptions?.doctor_banks_option // useSelector(getOptionsBanks)
    const favouriteBank = banksList?.find((item) => Boolean(item?.favourite)) // useSelector(getOptionsFavouriteBench)

    // const duplicatesList = useSelector(getOptionsBaseDuplicate)

    const servicesList = companyOptions?.services_option // useSelector(getOptionsServices)

    const vatsList = companyOptions?.iva_option // useSelector(getOptionsIva) // console.log(vatsList);
    const favouriteVat = vatsList?.find((item) => Boolean(item?.favourite)) // useSelector(getOptionsFavouriteVat) // console.log(vatsList);

    const company = companyOptions?.doctor_option // useSelector(getOptionsDoctor) // console.log(company);

    const client = clientId !== false ? clientsList?.find(value => value.id === clientId) : false

    const groups = formData ? getVatsGroup(formData.services, vatsList) : []
    const [vatsListSummary, setVatsListSummary] = React.useState(formData?.vatsListSummary != null ? formData?.vatsListSummary : groups)
    //     // console.log(groups);
    //     setFieldValue('subtotal_vat', getSubtotalVat(groups))
    //     setFieldValue('vatsListSummary', groups)
    //     setVatsListSummary(groups)
    const initialValues = formData != null ? {
        ...formData,
        vatsListSummary: groups
    } : {
        number: maxInvoice ? maxInvoice?.number + 1 : 1,
        duplicate: "i", // "i", "ii", "iii", "iv",
        year: new Date().getFullYear(), // "",
        date: new Date().toISOString().split('T')[0], // Date.now().toString(),
        terms: new Date().toISOString().split('T')[0],
        payment: favouritePayment ? favouritePayment?.label : "",
        paid: true,
        marca_bollo_status: true,
        marca_bollo_value: 2,
        additional_info: "",
        company_full_name: company?.first_name + ' ' + company?.last_name,
        company_piva: company?.piva,
        company_cod_fisc: company?.cod_fisc,
        company_telephone: company?.telephone,
        company_email: company?.email,
        company_pec: company?.pec,
        company_address: company?.address + ", " + company?.zip_code + ", " + company?.province + ", " + company?.region + ", " + company?.state,
        company_name: company?.company_name,
        benchId: favouriteBank ? favouriteBank?.id : "",
        bank_iban: favouriteBank ? favouriteBank?.bank_iban : "",
        bank_name: favouriteBank ? favouriteBank?.bank_name : "",
        clientId: client ? client?.id : "",
        client_full_name: client ? client?.first_name + ' ' + client?.last_name : "",
        client_piva: client ? client?.piva : "",
        client_telephone: client ? client?.telephone : "",
        client_email: client ? client?.email : "",
        client_pec: client ? client?.pec : "",
        client_address: client ? getUserFullAddress(client) : "",
        services: [
            {
                description: "",
                quantity: 1,
                import: "",
                discount: 0,
                vat: favouriteVat ? favouriteVat?.vat : 0,
                vat_code: favouriteVat ? favouriteVat?.vat_code : "X15",
                subtotal: 0,
                subtotal_vat: 0,
                servicesId: "",
            }
        ],
        // derivated
        subtotal: 0,
        subtotal_vat: 0, // subTotalVat: 0,
        total: 0,
        // iva details
        vatsListSummary: [
            // {
            //     vat_code: "",
            //     description: "",
            //     import: "",
            //     tax: "",
            //     total: "",
            // }
        ]
        // research
        // client_search: null,
        // service_search: null,
    }
    console.log(initialValues);

    const handleSearchClient = async (value, setFieldValue) => {
        console.log(value)
        setFieldValue('clientId', value != null ? value?.id : "")
        setFieldValue('client_full_name', value != null ? value?.first_name + ' ' + value?.last_name : "")
        setFieldValue('client_piva', value != null ? value?.piva : "")
        setFieldValue('client_email', value != null ? value?.email : "")
        setFieldValue('client_telephone', value != null ? value?.telephone : "")
        setFieldValue('client_pec', value != null ? value?.pec : "")
        setFieldValue('client_address', getUserFullAddress(value))
    }

    const handleSearchService = async (value, setFieldValue, index, services) => {
        console.log(value)
        setFieldValue(`services[${index}].description`, value?.description != undefined ? value.description : (value ? value : ""))
        setFieldValue(`services[${index}].servicesId`, value?.id != undefined ? value.id : "")
        // // console.log(value.import);
        value?.price != undefined && setFieldValue(`services[${index}].import`, value.price)

        const newServices = services.map((service, serviceIndex) => {
            let newAux = Object.assign(service, {})
            if (serviceIndex == index) {
                newAux.description = value?.description != undefined ? value.description : (value ? value : "")
                newAux.import = value?.price != undefined ? value.price : 0
                newAux.subtotal = getServiceSubtotal(newAux)
            }
            return newAux
        })
        console.log(newServices);

        updateDerivatedServicesData(newServices, setFieldValue)
        // updateIvaSummary(newServices, setFieldValue)
    }

    const updateIvaSummary = async (services, setFieldValue) => {

        const groups = getVatsGroup(services, vatsList)
        // console.log(groups);
        setFieldValue('subtotal_vat', getSubtotalVat(groups))
        setFieldValue('vatsListSummary', groups)
        setVatsListSummary(groups)
    }

    const getSubtotalVat = (arr) => {
        const subTotalVat = Object.keys(arr).reduce((prev, next) => {
            const item = Object.assign(arr[next], {}) // console.log(vat); // console.log(index);
            // console.log(item);
            return prev + Number(item?.tax)
        }, 0) // .toFixed(2)
        return subTotalVat.toFixed(2) // subTotalVat ? subTotalVat.toFixed(2) : (0).toFixed(2) 
    }

    const handleSearchIva = async (value, setFieldValue, index, services) => {
        console.log(value)
        if (value != null) { // console.log(value?.vat);
            setFieldValue(`services[${index}].vat`, value?.vat != undefined ? value.vat : "")
            setFieldValue(`services[${index}].vat_code`, value?.vat_code != undefined ? value.vat_code : "")

            const newServices = services.map((service, serviceIndex) => {
                let newAux = Object.assign(service, {})
                if (serviceIndex == index) {
                    newAux.vat = value.vat
                    newAux.vat_code = value.vat_code //
                }
                return newAux
            })
            // console.log(newServices);

            // updateIvaSummary(newServices, setFieldValue)
            updateDerivatedServicesData(newServices, setFieldValue)

        } else {
            setFieldValue(`services[${index}].vat`, "")
            setFieldValue(`services[${index}].vat_code`, "")
        }
    }

    const updateDerivatedServicesData = async (services, setFieldValue, index = null, field = null, value = null) => {
        // console.log(services)
        if (field != null && value != null) {
            setFieldValue(`services[${index}].${field}`, value != undefined ? value : "")
            services[index][field] = value
            const subtotal = getServiceSubtotal(services[index])
            setFieldValue(`services[${index}].subtotal`, subtotal)
            services[index].subtotal = subtotal
        }

        console.log(services);
        const newSubtotalServices = getSubtotalServices(services)
        console.log(newSubtotalServices);
        setFieldValue(`subtotal`, newSubtotalServices)
        // console.log(value.import);
        // value?.import != undefined && setFieldValue(`services[${index}].import`, value.import)
        setFieldValue(`total`, getTotalServices(services))
        updateIvaSummary(services, setFieldValue)

    }

    const handleSearchPayment = async (value, setFieldValue) => {
        console.log(value);

        setFieldValue('payment', value?.label ? value?.label : "")
    }

    const handleSearchBench = (value, setFieldValue) => {
        console.log(value);

        setFieldValue('benchId', value?.id ? value?.id : "")
        setFieldValue('bank_iban', value?.bank_iban ? value?.bank_iban : "")
        setFieldValue('bank_name', value?.bank_name ? value?.bank_name : "")

    }

    // const setDuplicateByNumber = (value, setFieldValue) => {
    //     console.log(value);

    //     let resInvoices = invoicesList.filter((invoice, index) => invoice.number == value).sort(dynamicSortMultiple('-duplicate'))[0]

    //     const resDuplicate = duplicatesList.filter((dupl, index) => dupl?.code === resInvoices?.duplicate)[0]?.number
    //     const nextDuplicate = duplicatesList.find((dupl, index) => resDuplicate != undefined && dupl?.number === resDuplicate + 1)
    //     // console.log(resInvoices); console.log(resDuplicate); console.log(nextDuplicate);
    //     setFieldValue('duplicate', nextDuplicate ? nextDuplicate?.code : "i")
    //     // setFieldValue('bank_name', value?.bank_name ? value?.bank_name : "")

    // }

    // Return import after discount e quantity
    const getServiceSubtotal = (service) => {
        // console.log(service);
        const serviceImport = Number(service?.import) * service.quantity
        return serviceImport - Number(serviceImport) * (service?.discount / 100)
    }

    const getSubtotalServices = (services) => {
        return Number(services.reduce((prev, next) => prev + next?.subtotal /* getServiceSubtotal(next) // (Number(next?.import) - Number(next?.import) * (next?.discount / 100)) */, 0)).toFixed(2)
    }

    const getSubtotalVatServices = (services) => {
        return services.reduce((prev, next) => { // console.log(prev); console.log(next);
            const imp = getServiceSubtotal(next) // console.log(imp);
            return prev + (imp * (next?.vat / 100))
        }, 0).toFixed(2)
    }

    const getTotalBollo = (values) => {
        return values?.marca_bollo_status ? values?.marca_bollo_value : 0
    }

    const getTotalServices = (services) => {
        const result = Number(getSubtotalServices(services)) + Number(getSubtotalVatServices(services))
        // console.log(getSubtotalServices(services));

        return result ? Number(result).toFixed(2) : 0.00 //  services.reduce((prev, next) => Number(prev) + (Number(next?.import) + Number(next?.import) * (next?.vat / 100)), 0).toFixed(2)
    }

    const cryptoJS = useCryptoJS()
    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm, setFieldValue }) => {
        console.log(values);

        try {
            const dataValues = {
                ...values,
                // company
                company_full_name: cryptoJS.encrypt(values?.company_full_name),
                company_piva: cryptoJS.encrypt(values?.company_piva),
                company_cod_fisc: cryptoJS.encrypt(values?.company_cod_fisc),
                company_telephone: cryptoJS.encrypt(values?.company_telephone),
                company_email: cryptoJS.encrypt(values?.company_email),
                company_pec: cryptoJS.encrypt(values?.company_pec),
                company_address: cryptoJS.encrypt(values?.company_address),
                company_name: cryptoJS.encrypt(values?.company_name),
                // bank
                bank_name: cryptoJS.encrypt(values?.bank_name),
                bank_iban: cryptoJS.encrypt(values?.bank_iban),
                // client
                client_full_name: cryptoJS.encrypt(values?.client_full_name),
                client_piva: cryptoJS.encrypt(values?.client_piva),
                client_telephone: cryptoJS.encrypt(values?.client_telephone),
                client_email: cryptoJS.encrypt(values?.client_email),
                client_pec: cryptoJS.encrypt(values?.client_pec),
                client_address: cryptoJS.encrypt(values?.client_address),
                // services
                services: values?.services?.map(service => {
                    return {
                        ...service,
                        description: cryptoJS.encrypt(service?.description),
                    }
                })
            }

            const resultAction = await dispatch(saveInvoice(dataValues)).unwrap() // console.log(resultAction);
            console.log('Success');

            dispatchNotice(resultAction, dispatch, addNotice)

            setStatus({ success: true });
            setSubmitting(false);

            if (formData != null) {
                console.log('formData different from NULL');
                'function' === typeof others.afterSubmitCallback && others.afterSubmitCallback()
            } else {
                resetForm()
                console.log(resultAction);
                const max = getInvoicesMax(resultAction?.data)
                setFieldValue('number', max ? max?.number + 1 : 1)
                setFieldValue('services', [{
                    description: "",
                    quantity: 1,
                    import: "",
                    discount: 0,
                    vat: favouriteVat ? favouriteVat?.vat : 0,
                    vat_code: favouriteVat ? favouriteVat?.vat_code : "X15",
                    subtotal: 0,
                    subtotal_vat: 0,
                }])
                setVatsListSummary([])
            }

        } catch (err) {
            console.log('Failed');
            // console.log(err);

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
        // return true
    }

    const takeCompanyInitialValues = async (setFieldValue) => {
        setFieldValue('company_name', company?.company_name)
        setFieldValue('company_full_name', company?.first_name + ' ' + company?.last_name)
        setFieldValue('company_piva', company?.piva)
        setFieldValue('company_cod_fisc', company?.cod_fisc)
        setFieldValue('company_address', company?.address + ", " + company?.zip_code + ", " + company?.province + ", " + company?.region + ", " + company?.state,)
        setFieldValue('company_telephone', company?.telephone)
    }

    const updateDateInvoice = async (value, setFieldValue) => {
        console.log(value);

        setFieldValue('date', value)
        setFieldValue('terms', value)
    }

    /**
     * STEPPER
     */
    const [activeStep, setActiveStep] = React.useState(initialStep); // React.useState(step)
    // useEffect(() => )

    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        if (!isLastStep()) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return (
        <Stack /* direction="row" */ sx={{ width: '100%' }} gap={2}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            // enableReinitialize
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, setFieldValue }) => (
                    <>
                        <Box style={{ maxWidth: '100%', overflow: 'auto', display: openPreviewInvoice ? 'none' : 'block' }}>
                            <Stepper nonLinear activeStep={activeStep}
                                sx={{
                                    pb: matchDownMD ? '.3rem' : 0,
                                    alignItems: "flex-start",
                                    '& .MuiStepConnector-root': {
                                        marginTop: '.7rem',
                                    }
                                }}/* orientation="vertical" sx={{ borderRight: '1px solid #e5e5e5', pr: 1, }} */
                            >
                                {stepsForm.map((step, index) => (
                                    <Step key={step?.label} style={{ minWidth: matchDownMD ? '180px' : 'unset' /* , overflow: 'auto' */ }} /* completed={completed[index]} */>
                                        <StepLabel color="inherit" onClick={handleStep(index)} sx={{ cursor: 'pointer', alignItems: 'flex-start', }}>
                                            <Typography variant="h6b">{step?.label}</Typography>

                                            <Stack /* direction="row" */>
                                                {step?.keyValues?.map((keyValue, index) => (
                                                    <Typography key={index} color="secondary" style={{ fontSize: index > 0 ? '.66rem' : '.75rem', }} >
                                                        {keyValue?.preValue}
                                                        {'function' === typeof keyValue?.displayCallback
                                                            ? keyValue?.displayCallback(values[keyValue.key])
                                                            : values[keyValue.key]}
                                                    </Typography>
                                                ))}
                                            </Stack>
                                        </StepLabel>
                                        {/* <StepContent TransitionProps={{ unmountOnExit: false }} >
                                            Content {index}
                                        </StepContent> */}
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        {(!matchDownMD && !openPreviewInvoice) && <Divider variant="middle" />}
                        <Box sx={{ mt: 0, mb: 1, p: 1, width: '100%', }}>
                            <form noValidate onSubmit={handleSubmit}>
                                <div style={{ display: openPreviewInvoice ? 'none' : 'block' }}>
                                    {/* NUMBER / DATE / TERMS */}
                                    <Grid container spacing={3} columns={12} sx={{ mb: '3rem', mt: 0 }}
                                        style={{ display: activeStep === 0 ? 'block' : 'none' }}
                                    >
                                        <Grid item xs={12} sx={{ mb: 2 }} >

                                            <Grid container spacing={2} direction="column" >
                                                {/* NUMERO FATTURA / DUPLICATE */}
                                                <Grid item >
                                                    <Stack direction="row" /* spacing={1} */ alignItems="flex-end" >
                                                        <Grid container spacing={2} >
                                                            <Grid item md={3} xs={6} >
                                                                <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: "100%" }} >
                                                                    <Typography variant="h6b" >Fattura</Typography>
                                                                    <TagIcon size="small" />
                                                                </Stack>
                                                            </Grid>
                                                            {/* NUMERO FATTURA */}
                                                            <Grid item md={2} xs={4} >
                                                                <BasicOutlinedInput
                                                                    id="invoice-number"
                                                                    name="number"
                                                                    label="Numero Progressivo *"
                                                                    placeholder="Rossi"
                                                                    inputValue={values.number}
                                                                    values={values}
                                                                    touched={touched}
                                                                    errors={errors}
                                                                    handleBlur={handleBlur}
                                                                    handleChange={handleChange}
                                                                />
                                                            </Grid>
                                                            {/* DUPLICATE */}
                                                            <Grid item xs={2} >
                                                                <BasicOutlinedInput
                                                                    id="invoice-duplicate"
                                                                    name="duplicate"
                                                                    label="Duplica *"
                                                                    placeholder="i"
                                                                    inputValue={values.duplicate}
                                                                    values={values}
                                                                    touched={touched}
                                                                    errors={errors}
                                                                    handleBlur={handleBlur}
                                                                    handleChange={handleChange}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                {/* DATA EMISSIONE */}
                                                <Grid item >
                                                    <Stack direction="row"/*  spacing={1}  */ alignItems="flex-end" >
                                                        <Grid container spacing={2} >
                                                            <Grid item md={3} xs={6} >
                                                                <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: "100%" }} >
                                                                    <Typography variant="h6b" >Data Emissione</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item md={3} xs={6} >
                                                                <BasicOutlinedInput
                                                                    id="invoice-date"
                                                                    name="date"
                                                                    type='date'
                                                                    inputValue={values.date}
                                                                    values={values}
                                                                    touched={touched}
                                                                    errors={errors}
                                                                    handleBlur={handleBlur}
                                                                    handleChange={(e) => { handleChange(e); updateDateInvoice(e.currentTarget.value, setFieldValue); }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                {/* DATA SCADENZA */}
                                                <Grid item >
                                                    <Stack direction="row"/*  spacing={1}  */ alignItems="flex-end" >
                                                        <Grid container spacing={2} >
                                                            <Grid item md={3} xs={6} >
                                                                <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: "100%" }} >
                                                                    <Typography variant="h6b" >Data di Scadenza</Typography>
                                                                    {/* <TagIcon size="small" /> */}
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item md={3} xs={6} >
                                                                <BasicOutlinedInput
                                                                    id="invoice-terms"
                                                                    name="terms"
                                                                    type='date'
                                                                    inputValue={values.terms}
                                                                    values={values}
                                                                    touched={touched}
                                                                    errors={errors}
                                                                    handleBlur={handleBlur}
                                                                    handleChange={handleChange}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            {/* <Stack direction="row" sx={{ justifyContent: "flex-end" }} >
<Stack >
    <div>Test</div>
    <div>Test</div>
</Stack>
</Stack> */}
                                        </Grid>
                                    </Grid>

                                    {/* PROFILO FISCALE */}
                                    <Grid container spacing={3} /* columns={12}  */ sx={{ mb: '3rem', mt: 0 }}
                                        style={{ display: activeStep === 1 ? 'block' : 'none' }}
                                    >
                                        <Grid item /* sm={12}  */ xs={12} /* sx={{ mb: 2 }} */ >
                                            <Grid container spacing={3} >
                                                <Grid item xs={12} >
                                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: "space-between" }} >
                                                        <Typography variant="h6b">Emittente</Typography>
                                                        <Typography variant="caption">
                                                            <IconButton size="small" aria-label="search" color="inherit" onClick={() => takeCompanyInitialValues(setFieldValue)}>
                                                                <ReplayIcon />
                                                            </IconButton>
                                                        </Typography>
                                                    </Stack>
                                                    <Divider variant="middle" />
                                                </Grid>
                                                {/* RAGIONE SOCIALE */}
                                                <Grid item xs={12} md={8} >
                                                    <BasicOutlinedInput
                                                        id="invoice-company_name"
                                                        name="company_name"
                                                        label="Ragione sociale *"
                                                        placeholder="Studio Medico Odontoiatrico Dott. G. Rossi"
                                                        inputValue={values.company_name}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>
                                                {/* FULL NAME */}
                                                <Grid item xs={12} md={4} >
                                                    <BasicOutlinedInput
                                                        id="invoice-company_full_name"
                                                        name="company_full_name"
                                                        label="Nome e Cognome *"
                                                        placeholder="Giancarlo Rossi"
                                                        inputValue={values.company_full_name}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>
                                                {/* P IVA */}
                                                <Grid item xs={12} md={6} >
                                                    <BasicOutlinedInput
                                                        id="invoice-company_piva"
                                                        name="company_piva"
                                                        label="Partita IVA *"
                                                        placeholder="1250045879996"
                                                        inputValue={values.company_piva}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>
                                                {/* Codice Fiscale */}
                                                <Grid item xs={12} md={6} >
                                                    <BasicOutlinedInput
                                                        id="invoice-company_cod_fisc"
                                                        name="company_cod_fisc"
                                                        label="Codice Fiscale *"
                                                        placeholder="MRIRSS69E45D969L"
                                                        inputValue={values.company_cod_fisc}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>
                                                {/* ADDRESS */}
                                                <Grid item xs={12} /* md={6} */ >
                                                    <BasicOutlinedInput
                                                        id="invoice-company_address"
                                                        name="company_address"
                                                        label="Indirizzo *"
                                                        placeholder="Via Caterina Rossi 2 / 3"
                                                        inputValue={values.company_address}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>
                                                {/* TELEPHONE */}
                                                <Grid item xs={12} md={6} >
                                                    <BasicOutlinedInput
                                                        id="invoice-company_telephone"
                                                        name="company_telephone"
                                                        label="Telefono *"
                                                        placeholder="+393465213526"
                                                        inputValue={values.company_telephone}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* PAZIENTE / DESTINATARIO */}
                                    <Grid container spacing={3} /* columns={12}  */ sx={{ mb: '3rem', mt: 0 }}
                                        style={{ display: activeStep === 2 ? 'block' : 'none' }}
                                    >
                                        {/* SEARCH CLIENT DIALOG */}
                                        {clientEditable && <Dialog open={openSearchClient} scroll='paper' onClose={() => setOpenSearchClient(false)} >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e6ebf1' }}>
                                                <DialogTitle variant="h4">Cerca Paziente</DialogTitle>
                                                <DialogTitle variant="h4">
                                                    <IconButton
                                                        onClick={() => setOpenSearchClient(false)}
                                                    // startIcon={<CloseIcon />}
                                                    // variant="outlined"
                                                    ><CloseIcon />{/* <span className='mobile-hidden'>Scarta</span> */}</IconButton>
                                                </DialogTitle>
                                            </Box>
                                            <DialogContent >
                                                <Typography variant="body2" mb={2} color="secondary" >
                                                    Ricerca per Nome, Cognome, Codice Fiscale o Partita IVA.
                                                </Typography>
                                                <ClientsAutocompleteField
                                                    id={`search-clientId`}
                                                    name={`clientId`}
                                                    label="Paziente"
                                                    placeholder="Cerca per nome / codice fiscale / P.IVA"
                                                    inputValue={values.clientId}
                                                    values={values}
                                                    touched={touched}
                                                    errors={errors}
                                                    handleBlur={handleBlur}
                                                    handleChange={(value, e) => handleSearchClient(value, setFieldValue)}
                                                    options={clientsList ? clientsList : []}
                                                    getOptionLabel={option => option?.first_name ? option?.first_name + ' ' + option?.last_name + ' - ' + option?.piva : ""}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id} // isOptionEqualToValue={(option, value) => value.description === option.description /* option.id === value.id */}
                                                    identifierField="id"
                                                    noOptionsText='Nessun paziente disponibile'
                                                />
                                                {/* <Autocomplete
                                                    disablePortal
                                                    autoFocus={true}
                                                    id="client_search"
                                                    name="client_search"
                                                    options={clientsList ? clientsList : []}
                                                    getOptionLabel={option => option.first_name ? option?.first_name + ' ' + option?.last_name + ' - ' + option?.piva : ""}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    onChange={(e, value) => { handleChange(e); handleSearchClient(value, setFieldValue) }}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            autoFocus
                                                            id="client_search_field"
                                                            name="client_search_field"
                                                            size="small"
                                                            placeholder="Cerca per nome / codice fiscale / P.IVA"
                                                            fullWidth
                                                            variant="standard"
                                                            label="Ricerca paziente"
                                                        />}
                                                /> */}
                                            </DialogContent>
                                            <Typography mb={12} />
                                        </Dialog>}
                                        {/* CLIENT */}
                                        <Grid item /* sm={6} */ xs={12} sx={{ mb: 2 }} >
                                            <Grid container spacing={3} >
                                                <Grid item xs={12} >
                                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: "space-between" }} >
                                                        <Typography variant="h6b">Paziente</Typography>
                                                        <Typography variant="caption">
                                                            {clientEditable && <><IconButton size="small" aria-label="search" color="inherit" onClick={() => setOpenSearchClient(true)}>
                                                                <SearchIcon />
                                                            </IconButton>
                                                                <IconButton size="small" aria-label="search" color="inherit" onClick={() => handleSearchClient(null, setFieldValue)}>
                                                                    <ReplayIcon />
                                                                </IconButton></>}
                                                        </Typography>
                                                    </Stack>

                                                    <Divider variant="middle" />
                                                </Grid>
                                                {/* CLIENT NAME */}
                                                <Grid item xs={12} md={6} /* sx={{ mt: 1, mb: 2 }} */>
                                                    <Stack spacing={1}>
                                                        <BasicOutlinedInput
                                                            id="invoice-client_full_name"
                                                            name="client_full_name"
                                                            label="Nome Paziente *"
                                                            placeholder="Maria Rossi"
                                                            inputValue={values.client_full_name}
                                                            values={values}
                                                            touched={touched}
                                                            errors={errors}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            readOnly={!clientEditable}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                {/* CLIENT PIVA */}
                                                <Grid item xs={12} md={6} /* sx={{ mt: 1, mb: 2 }} */>
                                                    <Stack spacing={1}>
                                                        <BasicOutlinedInput
                                                            id="invoice-client_piva"
                                                            name="client_piva"
                                                            label="Codice Fiscale / P.IVA *"
                                                            placeholder="RSSMRA85T10A562S"
                                                            inputValue={values.client_piva}
                                                            values={values}
                                                            touched={touched}
                                                            errors={errors}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            readOnly={!clientEditable}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                {/* CLIENT ADDRESS */}
                                                <Grid item xs={12} /* sx={{ mt: 1, mb: 2 }} */>
                                                    <Stack spacing={1}>
                                                        <BasicOutlinedInput
                                                            id="invoice-client_address"
                                                            name="client_address"
                                                            label="Indirizzo *"
                                                            placeholder="Via partigiane liguri 85 / 2, 14567, Genova, Liguria, Italia"
                                                            inputValue={values.client_address}
                                                            values={values}
                                                            touched={touched}
                                                            errors={errors}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            readOnly={!clientEditable}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                {/* CLIENT TELEPHONE */}
                                                <Grid item xs={6} md={4} /* sx={{ mt: 1, mb: 2 }} */>
                                                    <Stack spacing={1}>
                                                        <BasicOutlinedInput
                                                            id="invoice-client_telephone"
                                                            name="client_telephone"
                                                            label="Telefono Paziente"
                                                            placeholder="+393486954712"
                                                            inputValue={values.client_telephone}
                                                            values={values}
                                                            touched={touched}
                                                            errors={errors}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            readOnly={!clientEditable}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                {/* CLIENT EMAIL */}
                                                <Grid item xs={6} md={4} /* sx={{ mt: 1, mb: 2 }} */>
                                                    <Stack spacing={1}>
                                                        <BasicOutlinedInput
                                                            id="invoice-client_email"
                                                            name="client_email"
                                                            label="Email Paziente"
                                                            placeholder="maria.rossi85@gmail.com"
                                                            inputValue={values.client_email}
                                                            values={values}
                                                            touched={touched}
                                                            errors={errors}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            readOnly={!clientEditable}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                {/* CLIENT PEC */}
                                                <Grid item xs={6} md={4} /* sx={{ mt: 1, mb: 2 }} */>
                                                    <Stack spacing={1}>
                                                        <BasicOutlinedInput
                                                            id="invoice-client_pec"
                                                            name="client_pec"
                                                            label="PEC Paziente"
                                                            placeholder="maria.rossi@pec.it"
                                                            inputValue={values.client_pec}
                                                            values={values}
                                                            touched={touched}
                                                            errors={errors}
                                                            handleBlur={handleBlur}
                                                            handleChange={handleChange}
                                                            readOnly={!clientEditable}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    {/* SERVIZI */}
                                    <Grid container spacing={3} /* columns={12}  */ sx={{ mb: '3rem', mt: 0 }}
                                        style={{ display: activeStep === 3 ? 'block' : 'none' }}
                                    >
                                        {/* SERVICES */}
                                        <Grid item xs={12} sx={{ mb: 2 }} >
                                            <Grid container spacing={3} >
                                                <Grid item xs={12} >
                                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }} >
                                                        <Typography variant="h6b">Servizi / Prestazioni</Typography>
                                                    </Stack>
                                                    <Divider variant="middle" />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <FieldArray
                                                        name='services'
                                                        render={arrayHelpers => (
                                                            <>
                                                                {values.services.map((service, index) => (
                                                                    <Grid container spacing={1} key={index} sx={{ mb: 5 }} columns={17} >
                                                                        {/* Service Description */}
                                                                        <Grid item xs={17} md={14} lg={5} sx={{ mb: '.7rem' }} >
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                freeSolo
                                                                                id={`services_${index}_description`}
                                                                                name={`services[${index}].description`}
                                                                                options={servicesList ? servicesList : []}
                                                                                getOptionLabel={option => option.description ? option.description : ""}
                                                                                isOptionEqualToValue={(option, value) => option.value === value.value} // isOptionEqualToValue={(option, value) => value.description === option.description }
                                                                                onChange={(e, value) => { handleChange(e); handleSearchService(value, setFieldValue, index, values.services) }} // onChange={(e, value) => { setFieldValue(`services[${index}].description`, value)}} // onChange={handleChange}
                                                                                // value={service != undefined ? service : {
                                                                                //     description: "",
                                                                                //     id: 0,
                                                                                //     price: 0,
                                                                                //     status: "active"
                                                                                // }}
                                                                                value={{
                                                                                    description: service?.description, // values?.services[index]?.description, // 
                                                                                    id: 0,
                                                                                    price: 0,
                                                                                    status: "active"
                                                                                }}
                                                                                renderInput={(params) =>
                                                                                    <TextField
                                                                                        {...params}
                                                                                        id={`services_${index}_description_field`}
                                                                                        name={`services_${index}_description_field`}
                                                                                        size="small"
                                                                                        placeholder="Visita specialistica odontoiatrica"
                                                                                        fullWidth
                                                                                        variant="outlined"
                                                                                        label="Prestazione"
                                                                                        // value={values?.services[index]?.description}
                                                                                        onChange={(e, value) => { handleChange(e); handleSearchService(value ? value : e.currentTarget.value, setFieldValue, index, values.services) }}
                                                                                    />}
                                                                            />
                                                                        </Grid>
                                                                        {/* Service Quantity */}
                                                                        <Grid item xs={5} md={3} lg={2} sx={{ mb: '.7rem' }} /* sm={1} */ >
                                                                            <TextField
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
                                                                                InputProps={{ inputProps: { min: 1 } }}
                                                                            />
                                                                        </Grid>
                                                                        {/* Service IVA */}
                                                                        <Grid item xs={9} md={5} lg={3} sx={{ mb: '.7rem' }} >
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                id={`services_${index}_vat_field`}
                                                                                name={`services[${index}].vat_search`}
                                                                                options={vatsList ? vatsList : []}
                                                                                getOptionLabel={option => (option.vat >= 0 && option.vat !== "") ? option.vat + "% - " + option.vat_code : ""}
                                                                                isOptionEqualToValue={(option, value) => option.value === value.value} // isOptionEqualToValue={(option, value) => value.description === option.description }
                                                                                onBlur={handleBlur}
                                                                                onChange={(e, value) => { handleChange(e); handleSearchIva(value, setFieldValue, index, values.services) }} // onChange={handleChange}
                                                                                value={{
                                                                                    id: 0,
                                                                                    vat: service?.vat,
                                                                                    vat_description: "",
                                                                                    vat_code: service?.vat_code,
                                                                                    vat_status: "active"
                                                                                }}
                                                                                // value={service != undefined ? service : {
                                                                                // id: 0,
                                                                                // vat: "",
                                                                                // vat_description: "",
                                                                                // vat_code: "",
                                                                                // vat_status: "active"
                                                                                // }}
                                                                                // value={favouriteVat ? favouriteVat :  {
                                                                                //     id: 0,
                                                                                //     vat: 0,
                                                                                //     vat_description: "",
                                                                                //     vat_code: "",
                                                                                //     vat_status: "active"
                                                                                // }}
                                                                                renderInput={(params) =>
                                                                                    <TextField
                                                                                        {...params}
                                                                                        id={`services_${index}_vat_field`}
                                                                                        name={`services_${index}_vat_field`}
                                                                                        size="small"
                                                                                        placeholder="0"
                                                                                        fullWidth
                                                                                        variant="outlined"
                                                                                        label="IVA"
                                                                                    />}
                                                                            />
                                                                        </Grid>
                                                                        {/* Service Import */}
                                                                        <Grid item xs={6} md={3} lg={2} sx={{ mb: '.7rem' }} >
                                                                            <TextField
                                                                                id={`services_${index}_import_field`}
                                                                                name={`services[${index}].import`}
                                                                                type='number'
                                                                                size="small"
                                                                                placeholder="90.00"
                                                                                fullWidth
                                                                                variant="outlined"
                                                                                label="Importo"
                                                                                value={service?.import}
                                                                                onBlur={handleBlur}
                                                                                onChange={(e) => {
                                                                                    handleChange(e);
                                                                                    const field = 'import'
                                                                                    updateDerivatedServicesData(values.services, setFieldValue, index, field, e.currentTarget.value,)
                                                                                }}
                                                                                InputProps={{
                                                                                    startAdornment: (
                                                                                        <InputAdornment position="start">
                                                                                            <EuroIcon fontSize="small" />
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                    inputProps: { min: 0 },
                                                                                }}
                                                                            />
                                                                        </Grid>
                                                                        {/* Service Discount */}
                                                                        <Grid item xs={6} md={3} lg={2} sx={{ mb: '.7rem' }} >
                                                                            <TextField
                                                                                id={`services_${index}_discount_field`}
                                                                                name={`services[${index}].discount`}
                                                                                type='number'
                                                                                size="small"
                                                                                placeholder="0"
                                                                                fullWidth
                                                                                variant="outlined"
                                                                                label="Sconto"
                                                                                value={service?.discount}
                                                                                onBlur={handleBlur}
                                                                                onChange={(e) => {
                                                                                    handleChange(e);
                                                                                    const field = 'discount'
                                                                                    updateDerivatedServicesData(values.services, setFieldValue, index, field, e.currentTarget.value,)
                                                                                }}
                                                                                InputProps={{
                                                                                    startAdornment: (
                                                                                        <InputAdornment position="start">
                                                                                            <PercentIcon fontSize="small" />
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                    inputProps: { min: 0 }
                                                                                }}
                                                                            />
                                                                        </Grid>
                                                                        {/* Service Subtotal */}
                                                                        <Grid item xs={5} md={3} lg={2} sx={{ mb: '.7rem' }} >
                                                                            <TextField
                                                                                id={`services_${index}_subtotal_field`}
                                                                                name={`services[${index}].subtotal`}
                                                                                type='number'
                                                                                size="small"
                                                                                placeholder="0"
                                                                                fullWidth
                                                                                variant="outlined"
                                                                                label="Subtotale"
                                                                                value={service?.subtotal}
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="start">
                                                                                            <EuroIcon fontSize="small" />
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                    inputProps: { min: 0 },
                                                                                    readOnly: true,
                                                                                }}
                                                                            />
                                                                        </Grid>
                                                                        {/* ROWS ACTIONS */}
                                                                        <Grid item xs={3} md={1} lg={1} sx={{ paddingLeft: '20px', mb: '.7rem' }} >
                                                                            <Stack direction={'row'} alignItems={'center'} sx={{ height: '100%' }} >
                                                                                <IconButton size="small" aria-label="add-service"
                                                                                    onClick={() => arrayHelpers.push({
                                                                                        description: "",
                                                                                        quantity: 1,
                                                                                        import: "",
                                                                                        discount: 0,
                                                                                        vat: favouriteVat ? favouriteVat?.vat : 0,
                                                                                        vat_code: favouriteVat ? favouriteVat?.vat_code : "X15",
                                                                                        subtotal: 0,
                                                                                        subtotal_vat: 0,
                                                                                    })}
                                                                                    // sx={{ color: "#47b747" }}
                                                                                    color="primary"
                                                                                >
                                                                                    <PlaylistAddIcon />
                                                                                </IconButton>
                                                                                {values.services.length > 1 &&
                                                                                    <IconButton size="small" aria-label="delete"
                                                                                        onClick={() => {
                                                                                            if (values.services.length > 1) {
                                                                                                arrayHelpers.remove(index) /* setFieldValue('services', values.services.filter((service, serviceIndex) => serviceIndex != index)) */
                                                                                                const newServices = values.services.filter((service, indexService) => index !== indexService)
                                                                                                updateDerivatedServicesData(newServices, setFieldValue, index) // dispatchDerivatedServicesData() //
                                                                                                updateIvaSummary(newServices, setFieldValue)
                                                                                            }
                                                                                        }}
                                                                                        color="error"
                                                                                    >
                                                                                        <DeleteIcon />
                                                                                    </IconButton>}
                                                                            </Stack>
                                                                        </Grid>
                                                                    </Grid>
                                                                ))}
                                                            </>
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} >
                                            <Grid container spacing={3}
                                            >
                                                {/* DETAILS IVA */}
                                                <Grid item md={8} xs={12} sx={{ mb: 2 }} >
                                                    <Grid container spacing={3} >
                                                        <Grid item xs={6} sx={{ mb: 2 }} ><Typography variant="h6b" >Riepilogo IVA</Typography></Grid>
                                                        <Grid item md={2} xs={3} sx={{ mb: 2 }} ><Typography variant="h6b" textAlign="right" sx={{ display: 'block' }} >Imponibile</Typography></Grid>
                                                        <Grid item md={2} xs={3} sx={{ mb: 2 }} ><Typography variant="h6b" textAlign="right" sx={{ display: 'block' }} >Imposte</Typography></Grid>
                                                        {/* <Grid item md={2} xs={0} sx={{ mb: 2 }} ></Grid> */}
                                                    </Grid>
                                                    {Object?.keys(vatsListSummary/* values.iva_summary */)?.map((vat, index) => {
                                                        const item = Object.assign(vatsListSummary[vat], {}) // console.log(vat); // console.log(index);
                                                        // console.log(item);
                                                        return (
                                                            <Grid container spacing={3} key={index} >
                                                                <Grid item xs={6} sx={{ mb: 2 }} >
                                                                    <Typography variant="h6" >{item.vat_code} - {item.vat}% : {item.vat_description}</Typography>
                                                                </Grid>
                                                                <Grid item md={2} xs={3} sx={{ mb: 2 }} ><Typography variant="h6" align="right" >€ {Number(item.subtotal).toFixed(2)}</Typography></Grid>
                                                                <Grid item md={2} xs={3} sx={{ mb: 2 }} ><Typography variant="h6" textAlign="right" sx={{ display: 'block' }} >€ {(item.tax ? Number(item.tax) : 0).toFixed(2)}</Typography></Grid>
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>

                                                {/* TOTAL */}
                                                <Grid item md={4} xs={12} sx={{ mb: 2 }} >
                                                    <Grid container spacing={3} >
                                                        <Grid item xs={12} >
                                                            <Stack alignItems="center" sx={{ rowGap: '1rem' }} >
                                                                {/* TOTALE IMPONIBILE */}
                                                                <Grid container spacing={3} >
                                                                    <Grid item md={5} xs={7} >
                                                                        <Typography variant="h6b" >Totale Imponibile</Typography>
                                                                    </Grid>
                                                                    <Grid item md={5} xs={3} >
                                                                        <Typography textAlign="right">{Number(values?.subtotal).toFixed(2)}{/* {getSubtotalServices(values.services)} */}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={2} >
                                                                        <EuroIcon fontSize="small" />
                                                                    </Grid>
                                                                </Grid>
                                                                {/* Totale IVA */}
                                                                <Grid container spacing={3} >
                                                                    <Grid item xs={5} >
                                                                        <Typography variant="h6b" >Totale IVA</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={5} >
                                                                        <Typography textAlign="right">
                                                                            {Number(values?.subtotal_vat).toFixed(2)}
                                                                            {/* Object.keys(vatsListSummary).reduce((prev, next) => {
                                                            const item = Object.assign(vatsListSummary[next], {}) // console.log(vat); // console.log(index);
                                                            // console.log(item);
                                                            return prev + Number(item?.tax)
                                                        }, 0).toFixed(2) */}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={2} >
                                                                        <EuroIcon fontSize="small" />
                                                                    </Grid>
                                                                </Grid>
                                                                {/* Marca da bollo */}
                                                                <Grid container spacing={3} >
                                                                    <Grid item xs={5} >
                                                                        <Typography variant="h6b" >Marca da bollo</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={2} >
                                                                        <Switch
                                                                            id="invoice-marca_bollo_status"
                                                                            name="marca_bollo_status"
                                                                            checked={Boolean(values?.marca_bollo_status)}
                                                                            size="small"
                                                                            onBlur={handleBlur}
                                                                            onChange={(e) => { handleChange(e); setFieldValue('marca_bollo_status', !values?.marca_bollo_status) }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={3} >
                                                                        <Typography textAlign="right">
                                                                            {values.marca_bollo_status ? Number(values?.marca_bollo_value).toFixed(2) : 0}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={2} >
                                                                        <EuroIcon fontSize="small" />
                                                                    </Grid>
                                                                </Grid>
                                                                {/* Total Value */}
                                                                <Grid container spacing={3} >
                                                                    <Grid item xs={11} >
                                                                        <Typography variant="h1" align="right" color={values.paid ? '#54c954' : 'error'} >{(Number(values.total) + Number(values.marca_bollo_status ? values.marca_bollo_value : 0)).toFixed(2) /* TOTALE */} €</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        {/* PAYMENT */}
                                        <Grid item md={6} xs={12} sx={{ mb: 2 }} >
                                            <Grid container spacing={3} >
                                                <Grid item xs={12} >
                                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }} >
                                                        <Typography variant="h6b" >Pagamento</Typography>
                                                    </Stack>
                                                    <Divider variant="middle" />
                                                </Grid>
                                                {/* PAID STATUS */}
                                                <Grid item md={6} xs={12} >
                                                    <FormControlLabel
                                                        control={<IOSSwitch
                                                            id="invoice-paid"
                                                            name="paid"
                                                            checked={Boolean(values?.paid)}
                                                            size="small"
                                                            onBlur={handleBlur}
                                                            onChange={(e) => { handleChange(e); setFieldValue('paid', !values?.paid) }}
                                                            sx={{ m: 1 }}
                                                        />}
                                                        label="Saldo"
                                                    />
                                                </Grid>
                                                {/* PAYMENT METHOD */}
                                                <Grid item md={6} xs={12} >
                                                    {/* <Stack spacing={1}> */}
                                                    <Autocomplete
                                                        disablePortal
                                                        id="invoice-payment"
                                                        name="payment"
                                                        options={paymentsList}
                                                        // getOptionLabel={option => option.description ? option.description : ""}
                                                        isOptionEqualToValue={(option, value) => option.value === value.value} // isOptionEqualToValue={(option, value) => value.description === option.description }
                                                        onChange={(e, value) => { handleChange(e); handleSearchPayment(value, setFieldValue) }} // onChange={(e, value) => { setFieldValue(`services[${index}].description`, value)}} // onChange={handleChange}
                                                        value={{
                                                            label: values?.payment
                                                        }}
                                                        renderInput={(params) =>
                                                            <TextField
                                                                {...params}
                                                                error={Boolean(touched.payment && errors.payment)}
                                                                id={`payment_description_field`}
                                                                name={`payment_description_field`}
                                                                size="small"
                                                                placeholder="Pagamento a mezzo contante"
                                                                fullWidth
                                                                variant="outlined"
                                                                label="Metodo di Pagamento"
                                                            />}
                                                    />
                                                    {/* <TextField
                                                id="invoice-payment"
                                                value={values.payment}
                                                // type="number"
                                                name="payment"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                size="small"
                                                variant="standard"
                                                label="Numero Progressivo *"
                                                placeholder="1"
                                                fullWidth
                                                error={Boolean(touched.payment && errors.payment)}
                                            /> */}
                                                    {touched.payment && errors.payment && (
                                                        <FormHelperText error id="helper-text-invoice-payment">
                                                            {errors.payment}
                                                        </FormHelperText>
                                                    )}
                                                    {/* </Stack> */}
                                                </Grid>
                                                {/* BENCH */}
                                                <Grid item xs={12} >
                                                    {/* <AutocompleteInput
                                            id={`invoice-company_bench`}
                                            name={`company_bench`}
                                            label="Coordinate Bancarie"
                                            placeholder="Coordinate Bancarie"
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            options={banksList}
                                            getOptionLabel={option => option.bank_name ? option.bank_name + " - " + option.bank_iban : ""}
                                            isOptionEqualToValue={(option, value) => option.value === value.value} // isOptionEqualToValue={(option, value) => value.description === option.description}
                                            noOptionsText='Nessun banca disponibile'
                                            handleChange={(e, value) => {
                                                handleChange(e); 
                                                handleSearchBench(value, setFieldValue)
                                            }}
                                        /> */}
                                                    <Autocomplete
                                                        disablePortal
                                                        id="invoice-company_bench"
                                                        name="company_bench"
                                                        options={banksList}
                                                        getOptionLabel={option => option.bank_name ? option.bank_name + " - " + option.bank_iban : ""}
                                                        isOptionEqualToValue={(option, value) => option.value === value.value} // isOptionEqualToValue={(option, value) => value.description === option.description}
                                                        onChange={(e, value) => { handleChange(e); handleSearchBench(value, setFieldValue) }} // onChange={(e, value) => { setFieldValue(`services[${index}].description`, value)}} // onChange={handleChange}
                                                        // value={(values.bank_name != "" && values.bank_iban != "")}
                                                        value={{
                                                            id: 0,
                                                            bank_name: values?.bank_name,
                                                            bank_iban: values?.bank_iban,
                                                        }}
                                                        renderInput={(params) =>
                                                            <TextField
                                                                {...params}
                                                                error={Boolean(touched.bank_iban && errors.bank_iban)}
                                                                id={`bank_iban_description_field`}
                                                                name={`bank_iban_description_field`}
                                                                size="small"
                                                                placeholder="Coordinate Bancarie"
                                                                fullWidth
                                                                variant="outlined"
                                                                label="Coordinate Bancarie"
                                                            />}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* ADDIZIONALI */}
                                    <Grid container spacing={3} /* columns={12} */ sx={{ mb: '3rem', mt: 0 }}
                                        style={{ display: activeStep === 4 ? 'block' : 'none' }}
                                    >
                                        {/* ADDITIONAL INFO */}
                                        <Grid item xs={12} sx={{ mb: 2 }} >
                                            <Grid container spacing={3} >
                                                <Grid item xs={12} >
                                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }} >
                                                        <Typography variant="h6b" >Note Addizionali</Typography>
                                                    </Stack>
                                                    <Divider variant="middle" />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <BasicOutlinedInput
                                                        id="invoice-additional_info"
                                                        name="additional_info"
                                                        label="Note"
                                                        placeholder=""
                                                        inputValue={values.additional_info}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        handleBlur={handleBlur}
                                                        handleChange={handleChange}
                                                        multiline
                                                        rows={3}
                                                    />
                                                    {/* <TextField
                                            id="invoice-additional_info"
                                            value={values.additional_info}
                                            name="additional_info"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            variant="standard"
                                            label="Note"
                                            multiline
                                            // placeholder="Studio Medico Odontoiatrico Dott. G. Rossi"
                                            fullWidth
                                            error={Boolean(touched.additional_info && errors.additional_info)}
                                        />
                                        {touched.additional_info && errors.additional_info && (
                                            <FormHelperText error id="helper-text-invoice-additional_info">
                                                {errors.additional_info}
                                            </FormHelperText>
                                        )} */}
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                        <Grid item xs={12} sx={{ mb: 2 }} >
                                            <Grid container spacing={2} >
                                                {/* SUBMIT */}
                                                <Grid item xs={8}>
                                                    <SaveButton
                                                        isSubmitting={isSubmitting}
                                                        onSubmit={handleSubmit}
                                                        label="Salva Fattura"
                                                    />
                                                    {/* <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Salva Fattura
                                                </Button>
                                            </AnimateButton> */}
                                                </Grid>
                                                {/* PREVIEW */}
                                                <Grid item xs={4}>
                                                    <AnimateButton>
                                                        <Button
                                                            disableElevation
                                                            disabled={isSubmitting}
                                                            fullWidth
                                                            size="large"
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => setOpenPreviewInvoice(true)}
                                                            /* type="submit" */
                                                            style={{ gap: ".5rem" }}
                                                        >
                                                            <RemoveRedEyeIcon />
                                                            <span>Preview</span>
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </div>

                            </form>
                        </Box>
                        {/* NAVIGATOR */}
                        <Stack direction="row" sx={{ width: '100%', pt: 2 }} justifyContent="space-between"
                            style={{ display: openPreviewInvoice ? 'none' : 'flex' }}
                        >
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                startIcon={<IoMdArrowBack />}
                                sx={{ mr: 1, fontWeight: 600 }}
                            >
                                Back
                            </Button>
                            {/* <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )} */}

                            {!Boolean(activeStep === steps.length - 1) && <Button onClick={handleNext} variant="contained"
                                disabled={activeStep === steps.length - 1}
                                endIcon={<IoMdArrowForward />}
                                sx={{ /* mr: 1,  */fontWeight: 600 }}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>}
                        </Stack>

                        <div style={{ display: openPreviewInvoice ? 'block' : 'none' }}>
                            {openPreviewInvoice && <>
                                <HeaderPreview
                                    item={values}
                                    handleClose={() => setOpenPreviewInvoice(false)}
                                />
                                <InvoicePreview
                                    invoiceData={values}
                                // printerable={false}
                                // withPrintMarginT={true}
                                // onClose={() => setOpenPreviewInvoice(false)} 
                                // Header={<Header handleClose={() => setOpenPreviewInvoice(false)} />}
                                />
                            </>}
                            {/* <Header handleClose={() => setOpenPreviewInvoice(false)} /> */}
                        </div>
                    </>
                )}
            </Formik>
        </Stack>
    )
}

export default InvoiceFormStepper


// SWITCH
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 45, //  42,
    height: 22, // 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '240ms',
        '&.Mui-checked': {
            transform: 'translateX(22px)', // 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18, // 22,
        height: 18, // 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));