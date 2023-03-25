import React from 'react'

// material-ui
import { Box, Grid, Stack } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import SummaryDeleted from './components/SummaryDeleted'
import SummaryRecallRadial from './components/SummaryRecallRadial'
import ChartsCard from 'components/apex-charts/card/ChartsCard'

// hooks
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData'

// utils
import { getCurrentYearsCategories, getDateInYear, getSummary, getYearsCategories } from 'utils/app/stats/stats-summary'
import { getCategoriesByPeriod, getPositionByPeriod } from 'utils/app/stats/stats'
import { getUniqueByColumn } from 'utils/app/stats/stats-density'

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
                                    <SummaryDeleted
                                        data={data}
                                    />
                                </>}
                            />
                        </Grid>
                        <Grid item xs={6} sm={12} >
                            <AccordionCard
                                bottomBorder={false}
                                fullWidth={true}
                                ContentDetails={() => <>
                                    <SummaryRecallRadial
                                        data={data}
                                    />
                                </>}
                            />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={7} >
                    <ChartsCard
                        cardTitle="Ultimo Mese / Settimana"
                        data={data}
                        memoryDataCallback={getSummary}
                        memoryCategoriesCallback={(data, types) => getCategoriesByPeriod(data, types)}
                        columnParallal="year"
                        fieldDate="startDate"
                        transformValueToCompare={(value) => getDateInYear(value)}
                        getPositionByPeriod={(period, value) => getPositionByPeriod(period, value)}
                        getUnique={getYearsCategories}
                        defaultTypeSeries="lastWeek"
                        defaultTypesSeries={[{
                            value: 'lastWeek',
                            label: 'Week',
                        }, {
                            value: 'lastMonth',
                            label: 'Mese',
                        }]}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Box>
                        <ChartsCard
                            cardTitle="Confronto Annuale per Ora"
                            data={data}
                            memoryDataCallback={getSummary}
                            memoryCategoriesCallback={(data, types) => getCategoriesByPeriod(data, types)}
                            getPositionByPeriod={(period, value) => getPositionByPeriod(period, value)}
                            getUnique={getUniqueByColumn}
                            fieldDate="status"
                            // fieldValue="startDate"
                            fieldParallalValue="startDate"
                            columnParallal="status"
                            defaultTypeSeries="hour"
                            toggler={false}
                            themeColor={"status"}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <ChartsCard
                        cardTitle="Confronto Annuo sul Triennio"
                        data={data}
                        memoryDataCallback={getSummary}
                        memoryCategoriesCallback={(data, types) => getCategoriesByPeriod(data, types)}
                        fieldDate="startDate"
                        // fieldValue="subtotal"
                        transformValueToCompare={(value) => getDateInYear(value)}
                        getPositionByPeriod={(period, value) => getPositionByPeriod(period, value)}
                        getUnique={getYearsCategories}
                        defaultTypeSeries="months"
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default StatsEventsPage