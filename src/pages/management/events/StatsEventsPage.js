import React from 'react'

// material-ui
import { Box, Grid, Stack } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard'

// hooks
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData'
// import SummaryDeleted from './components/SummaryDeleted'
// import { getSummaryInvoices } from 'utils/app/invoice'
// import ChartsCard from 'components/apex-charts/card/ChartsCard'
// import SummaryRecallRadial from './components/SummaryRecallRadial'

const StatsEventsPage = () => {
    const { data } = useSchedulerData()

    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={12} md={5} >
                    <Grid container spacing={2} >
                        <Grid item xs={6} sm={12} md={12} >
                            <AccordionCard
                                bottomBorder={false}
                                fullWidth={true}
                                ContentDetails={() => <>
                                    
                                </>}
                            />
                        </Grid>
                        <Grid item xs={6} sm={12} >
                            <AccordionCard
                                bottomBorder={false}
                                fullWidth={true}
                                ContentDetails={() => <>
                                    
                                </>}
                            />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={7} >
                    {/* <ChartsCard
                        cardTitle="Ultimo Mese / Settimana"
                        data={data}
                        memoryDataCallback={getSummaryInvoices}
                        memoryDataDependecies={[false, 'startDate']}
                        // memoryCategoriesCallback={getCatByPeriod}
                        defaultTypeCategory="lastWeek"
                        defaultTypesCategories={[{
                            value: 'lastWeek',
                            label: 'Week',
                        }, {
                            value: 'lastMonth',
                            label: 'Mese',
                        }]}
                    /> */}
                </Grid>
                <Grid item xs={12} >
                    <Box>
                        {/* <ChartsCard
                            cardTitle="Confronto Annuale per Ora"
                            data={data}
                            memoryDataCallback={getSummaryInvoices}
                            memoryDataDependecies={[false, 'startDate', 'status']}
                            // memoryCategoriesCallback={getCatByPeriod}
                            defaultTypeCategory="hour"
                            toggler={false}
                            themeColor={"status"}
                        /> */}
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    {/* <ChartsCard
                        cardTitle="Confronto Annuo sul Triennio"
                        data={data}
                        memoryDataCallback={getSummaryInvoices}
                        memoryDataDependecies={[false, 'startDate']}
                        // memoryCategoriesCallback={getCatByPeriod}
                        defaultTypeCategory="months"
                    /> */}
                </Grid>
            </Grid>
        </>
    )
}

export default StatsEventsPage