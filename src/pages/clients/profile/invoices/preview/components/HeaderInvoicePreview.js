import React, { useEffect, useState } from 'react'

// react-router-dom
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
} from '@mui/material';

// project import
import ClientsInvoiceSubTabHeader from '../../common/ClientsInvoiceSubTabHeader';

// icons
import { ClearIcon, EditIcon, SendMailIcon } from 'assets/font-icons/icons';
import InvoicePrintButton from 'pages/invoices/common/InvoicePrintButton';

const HeaderInvoicePreview = ({
    item = null,
    client = null,
    ...other
}) => {
    const navigate = useNavigate()

    const actions = [
        {
            icon: <SendMailIcon />,
            onClick: () => { return }
        },
        {
            icon: <EditIcon sx={{ fontSize: '1.1rem', }} />,
            onClick: () => {
                navigate("/clients/profile/" + client?.chiperId + "/fatture/" + item?.chiperId + "/edit")
            },
            // fontSize: '1rem',
        },
        {
            icon: <ClearIcon sx={{ fontSize: '1.1rem', }} />,
            onClick: () => {
                navigate("/clients/profile/" + client?.chiperId + "/fatture")
            },
            // fontSize: '1rem',
        }
    ]

    const OffActions = () => {
        return (
            <Box sx={{ display: 'flex', }}>
                <InvoicePrintButton
                    item={item}
                />
            </Box>
        )
    }

    return (
        <>
            <ClientsInvoiceSubTabHeader
                item={item}
                client={client}
                actions={actions}
                OffActions={OffActions}
            />
        </>
    )
}

export default HeaderInvoicePreview