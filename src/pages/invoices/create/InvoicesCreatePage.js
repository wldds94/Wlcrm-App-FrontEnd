import React from 'react'
import { Box } from '@mui/material'

import SubTabHeader from 'components/page-tab/header/SubTabHeader'
import PageTab from 'components/page-tab/PageTab'

import InvoiceFormStepper from '../common/InvoiceFormStepper'
import InvoiceTitle from '../common/InvoiceTitle'

const InvoicesCreatePage = () => {
    const TitleComponent = () => <InvoiceTitle /* item={invoice} */ />

    return (
        <>
            <PageTab
                HeaderComponent={() => (
                    <SubTabHeader
                        // item={invoice}
                        TitleComponent={TitleComponent}
                    />
                )}
            >
                <Box sx={{ p: 3, }}>
                    <InvoiceFormStepper />
                </Box>
            </PageTab>


            {/* <InvoiceForm /> */}
        </>
    )
}

export default InvoicesCreatePage