import React, { useState } from 'react'

// dayjs
import dayjs from 'dayjs'
import 'dayjs/locale/it';

// material-ui
import {
    Box,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';

// react-redux
import { useDispatch } from 'react-redux';
// slices
import { deleteInvoice } from 'store/reducers/invoice';

import { getHumanReadableDate } from 'utils/date';


// project import
import DeleteButton from 'components/button/DeleteButton';
import ActionsCard from 'components/card/list/actions/ActionsCard';
import InvoicePrintButton from 'pages/invoices/common/InvoicePrintButton';
import AccordionCard from 'components/card/list/AccordionCard';
import InvoiceTitle from 'pages/invoices/common/InvoiceTitle';
import EditableButton from 'components/button/EditableButton';
import InvoiceFormStepper from 'pages/invoices/common/InvoiceFormStepper';
import BootstrapDialog from 'components/dialog/bootstrap-dialog/BootstrapDialog';
import InvoiceEmailForm from './InvoiceEmailForm';
import ClientsAvatarCard from 'pages/clients/list/components/ClientsAvatarCard';

// assets
import { MdSend } from 'react-icons/md'
import { BankIcon, PreviewIcon } from 'assets/font-icons/icons';

const InvoicesCard = ({
    client = null,
    item = null,
    withClientInfo = true,
    withProfileLink = true,
    withActionsCard = true,
    ...other
}) => {
    const dispatch = useDispatch()
    // react router
    // const navigate = useNavigate()
    const [isEditable, setIsEditable] = useState(false)

    const status = [
        {
            key: "paid",
            color: "#29bd6b", // "#2e7d32", // "#2d884d",
        },
        {
            key: "wait",
            color: "#fecf6d",
        },
        {
            key: "delay",
            color: "#b34045",
        },
    ]
    const today = dayjs()
    const invoiceDate = dayjs(item?.date)
    const invoiceDeadline = dayjs(item?.terms)
    const paymentStatus = item?.paid ? "paid" : (
        today.isBetween(invoiceDate, invoiceDeadline) ? "wait" : "delay"
    )

    /**
     * ACTIONS HANDLE
     */
    // SUBMIT DELETE
    const handleDelete = async () => {
        try {
            console.log('Try to delete...');
            const deleteRes = await dispatch(deleteInvoice({ invoiceID: item?.id }))
        } catch (error) {
            console.log(error);
        }

    }

    const [openEmailDialog, setOpenEmailDialog] = useState(false)
    const EmailDialog = () => {
        return (
            <>
                <BootstrapDialog
                    onClose={() => setOpenEmailDialog(false)}
                    open={openEmailDialog}
                    title="Invia Fattura per Email"
                    variantTitle='h4'
                    maxWidth="md"
                // HeaderActions={() => <ResetIcon />}
                >
                    <InvoiceEmailForm
                        invoice={item}
                    />
                </BootstrapDialog>
            </>
        )
    }

    // const ClientAvatar = () => (
    //     <BackgroundLetterAvatars
    //         name={item?.client?.name}
    //         withChildren={false}
    //         avSx={{ width: 28, height: 28, fontSize: '.8rem' }}
    //     />
    // )
    // const AvatarContent = () => {
    //     return (
    //         <>
    //             {withProfileLink
    //                 ? <Link to={"/clients/profile/" + item?.client?.chiperId}>
    //                     <ClientAvatar />
    //                 </Link>
    //                 : <ClientAvatar />
    //             }
    //         </>
    //     )
    // }

    const ContentSummary = () => {
        const color = status?.find((el) => el.key === paymentStatus)

        return (
            <>
                <Stack gap={1} >
                    {!isEditable && <>
                        <Stack sx={{ mb: 2, }} >
                            <InvoiceTitle item={item} />
                            <Box>
                                <Typography sx={{ color: "#9fa6b2", }} >{getHumanReadableDate(item?.date)}{/* invoiceDate.locale('it').format('DD-MM-YYYY') */}</Typography>
                            </Box>
                        </Stack>


                        {withClientInfo && <Stack sx={{ mb: 2, }} >
                            <Stack direction="row" alignItems="baseline" gap={1} /* sx={{ mb: 2, }} */ >
                                {/* <Stack sx={{ mb: 2, color: '#686868', }} > */}
                                {/* <AvatarContent /> */}
                                <ClientsAvatarCard
                                    client={item?.client}
                                    withProfileLink={withProfileLink}
                                />
                                <Typography variant="h6b" sx={{ fontSize: "1.2rem", color: "#5e5e5e", }} >{item?.client_full_name}</Typography>
                                <div>-</div>
                                <Typography sx={{ color: "#9fa6b2", }} >{item?.client_piva}</Typography>
                                {/* </Stack> */}
                            </Stack>
                            <Typography variant="caption" color="#959595" >{item?.client_address}</Typography>
                        </Stack>}
                        {/* } */}

                        <Stack gap={.3} >
                            {item?.services?.map((service, index) => {
                                return (
                                    <Box key={index}>
                                        <Stack direction="row" gap={1} alignItems='baseline' justifyContent="space-between" >
                                            {/** SERVICE DESCRIPTION */}
                                            <Typography variant="body1" /* color="secondary" */ >{service?.description}</Typography>
                                            {/** OTHER INFO */}
                                            <Stack direction="row" gap={1} alignItems='baseline' justifyContent="space-between" >
                                                <Typography variant="caption" /* color="secondary" */ >x{service?.quantity ? service?.quantity : 1}</Typography>
                                                <Typography variant="h5" align="right" sx={{
                                                    color: color?.color ? color.color : "",
                                                    minWidth: '85px',
                                                }} >
                                                    {(service?.subtotal ? service.subtotal : 0).toFixed(2)} €
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                )
                            })}
                        </Stack>

                        <Divider variant="middle" />

                        {/** TOTAL */}
                        <Stack direction="row" gap={1} alignItems='baseline' justifyContent="end" >
                            <Typography variant="caption" sx={{
                                fontWeight: 700,
                            }} /* color="secondary" */  >Totale:</Typography>
                            <Typography variant="h5" sx={{ color: color ? color : "", fontWeight: 700, }} >{(item?.subtotal ? item.subtotal : 0).toFixed(2)} €</Typography>
                        </Stack>
                    </>}
                </Stack>
            </>
        )
    }

    const actionsItems = client !== null
        ? (!isEditable ? [
            // {
            //     icon: <EditIcon />,
            //     // onClick: () => { },
            //     withLink: "/clients/profile/" + client?.chiperId + "/fatture/" + item?.chiperId + "/edit"
            // },
            {
                icon: <PreviewIcon />,
                withLink: "/clients/profile/" + client?.chiperId + "/fatture/" + item?.chiperId + "/preview",
            }
        ] : [])
        : [
            // {
            //     icon: <EditIcon />,
            //     // onClick: () => { },
            //     withLink: "/invoices/create/" + item?.chiperId
            // },
            // {
            //     icon: <PreviewIcon />,
            //     withLink: "/invoices/preview/" + item?.chiperId
            // }
        ]

    const ContentDetails = () => {
        return (
            <>
                {withActionsCard !== false && <>{isEditable ? <Box sx={{ pb: 2 }}>
                    <InvoiceFormStepper
                        formData={item}
                        step={2}
                    />
                </Box>
                    : <Box sx={{ color: '#686868', }}>
                        {/** BANK */}
                        <Stack direction="row" gap={1} alignItems='flex-start' >
                            <BankIcon style={{ fontSize: '1.2rem' }} />
                            <Stack /* direction="row" */>
                                <Typography variant="h6b" >{item?.bank_name}</Typography>
                                <Typography variant="caption" >{item?.bank_iban}</Typography>
                            </Stack>
                        </Stack>
                    </Box>}
                    <ActionsCard
                        items={actionsItems}
                    // withRightPadding={true}
                    >
                        <EditableButton
                            editable={isEditable}
                            onClick={(newVal) => setIsEditable(newVal)}
                        />
                        {!isEditable && <>
                            <InvoicePrintButton
                                item={item}
                            />
                            <IconButton
                                onClick={() => setOpenEmailDialog(true)}
                            >
                                <MdSend />
                            </IconButton>
                            <EmailDialog />
                            <DeleteButton
                                label=""
                                color=""
                                onConfirm={() => handleDelete()}
                            />
                        </>}
                    </ActionsCard></>}
            </>
        )
    }

    return (
        <>
            <AccordionCard
                item={item}
                ContentSummary={() => <ContentSummary />}
                ContentDetails={() => <ContentDetails />}
            />
        </>
    )
}

export default InvoicesCard