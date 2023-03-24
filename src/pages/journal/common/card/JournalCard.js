import React from 'react'

// material-ui
import { Box, Grid, Stack } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import JournalCardContent from './JournalCardContent'

const JournalCard = ({
    item = {},
    withClientInfo = true,
    withClientProfileLink = false,
    lightBoxShadow = true,
    ...other
}) => {
    return (
        <>
            <AccordionCard
                bottomBorder={false}
                fullWidth={true}
                lightBoxShadow={lightBoxShadow}
                // ContentSummary={() => <SimpleHeaderBoxed title={'Prossimi Appuntamenti'} lightShadow={true} />}
                ContentDetails={() => <>
                    <JournalCardContent item={item} withClientInfo={withClientInfo} withClientProfileLink={withClientProfileLink} />
                </>}
            />
        </>
    )
}

export default JournalCard