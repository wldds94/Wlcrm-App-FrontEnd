import React, { useMemo, useState } from 'react'

// material ui
import { Box, Button, IconButton, Typography, Stack } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import SimpleHeaderBoxed from 'components/typography/SimpleHeaderBoxed'
import useInvoicesData from 'hooks/redux/useInvoicesData'
import InvoicesCard from 'pages/invoices/list/components/InvoicesCard'

const InvoicesPanel = () => {
    const {
        data: invoices,
        users,
        clients,
    } = useInvoicesData()

    const currentData = useMemo(() => {
        return invoices?.filter(item => Number(item?.paid) === 0)
    }, [invoices/* , users, clients */])

    return (
        <AccordionCard
            bottomBorder={false}
            fullWidth={true}
            withHoverBackground={false}
            ContentSummary={() => <>
                <SimpleHeaderBoxed
                    title={'Fatture Scadute'}
                    // description={'Richiami Giornalieri'}
                    lightShadow={true}
                    hasAction={true}
                // ActionComponent={HeaderActionComponent}
                />
            </>}
            ContentDetails={() => <Box sx={{ maxHeight: '345px', overflow: 'auto'}}>
                {currentData?.map((item, index) => {
                    return (
                        <InvoicesCard
                            key={index}
                            item={item}
                            // withActionsCard={false}
                        />
                    )
                })}
                {Number(currentData?.length) < 1 && <Box sx={{ p: '1rem' }}>
                    <Typography>Spiacenti nessuna Fattura insoluta</Typography>
                </Box>}
            </Box>}
        />
    )
}

export default InvoicesPanel