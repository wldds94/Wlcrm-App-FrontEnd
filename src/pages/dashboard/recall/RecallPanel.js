import React, { useMemo, useState } from 'react'

// material ui
import { Box, Button, IconButton, Typography, Stack } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import SimpleHeaderBoxed from 'components/typography/SimpleHeaderBoxed'
import RecallCard from './components/RecallCard'

// redux hooks
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData'

// utils
import { getEventsRecallMapped } from 'utils/app/event'

// assets
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getDateFormat } from 'utils/libs/dayjsUtils'

const RecallPanel = ({
    withClientProfileLink = false,
}) => {
    const { data: events, users, clients } = useSchedulerData()

    const [rangeDay, setRangeDay] = useState(0)
    const [todayDeelay, setTodayDeelay] = useState(0)

    const currentData = useMemo(() => {
        return getEventsRecallMapped(events, rangeDay, todayDeelay)
    }, [events, rangeDay, todayDeelay])
    console.log(currentData);

    const HeaderActionComponent = () => {
        return (
            <>
                <Stack direction="row" gap={1} >
                    {todayDeelay !== 0 && <Button size="small" onClick={() => setTodayDeelay(0)}>
                        Oggi
                    </Button>}
                    <IconButton size="small" color="primary" onClick={() => setTodayDeelay(todayDeelay - 1)}>
                        <Stack direction="row" alignItems="center" >
                            <FiChevronLeft />                        
                        </Stack>
                    </IconButton>

                    <Stack direction="row" alignItems="center" >
                        <Typography variant="h6b" >{getDateFormat(false, todayDeelay)}</Typography>
                    </Stack>

                    <IconButton size="small"  color="primary" onClick={() => setTodayDeelay(todayDeelay + 1)} >
                        <Stack direction="row" alignItems="center" >
                            <FiChevronRight />
                        </Stack>
                    </IconButton>
                </Stack>
            </>
        )
    }

    return (
        <>
            <AccordionCard
                bottomBorder={false}
                fullWidth={true}
                ContentSummary={() => <>
                    <SimpleHeaderBoxed
                        title={'Richiami Giornalieri'}
                        // description={'Richiami Giornalieri'}
                        lightShadow={true}
                        hasAction={true}
                        ActionComponent={HeaderActionComponent}
                    />
                </>}
                ContentDetails={() => <Box sx={{ maxHeight: '400px', overflow: 'auto'}}>
                    {currentData?.map((item, index) => {
                        return (
                            <RecallCard
                                key={index}
                                item={item}
                                withClientInfo={true}
                                withClientProfileLink={withClientProfileLink}
                            />
                        )
                    })}
                    {Number(currentData?.length) < 1 && <Box sx={{ p: '1rem' }}>
                        <Typography>Spiacenti nessun richiamo disponibile</Typography>
                    </Box>}
                </Box>}
            />
        </>
    )
}

export default RecallPanel