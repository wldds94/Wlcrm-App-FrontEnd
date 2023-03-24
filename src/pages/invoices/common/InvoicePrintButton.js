import React from 'react'

// material-ui
import {
    Box,
} from '@mui/material';
import PrintableButton from 'components/printer/PrintableButton';
import InvoicePreview from 'pages/invoices/preview/InvoicePreview';

// project import
// import PrintableButton from '../PrintableButton'
// import InvoicePreview from 'pages/invoice/template/invoice-preview/InvoicePreview'

const InvoicePrintButton = ({
    item = null,
    withPrintMarginT = true,
    withBox = true,
}) => {

    const Wrapper = ({ children, ...other }) => {
        return (
            <>
                {withBox ?
                    <Box sx={{ display: 'flex', }}>
                        {children}
                    </Box> :
                    <></>}
            </>
        )
    }

    return (
        <>
            <Wrapper>
                <PrintableButton
                    PrintContent={() => (
                        <InvoicePreview
                            invoiceData={item}
                            printerable={true}
                            withPrintMarginT={withPrintMarginT}
                        />
                    )}
                />
            </Wrapper>
            {/* <Box sx={{ display: 'flex', }}>
                <PrintableButton
                    PrintContent={() => (
                        <InvoicePreview
                            printerable={true}
                            withPrintMarginT={withPrintMarginT}
                            invoiceData={item}
                        />
                    )}
                />
            </Box> */}
        </>
    )
}

export default InvoicePrintButton