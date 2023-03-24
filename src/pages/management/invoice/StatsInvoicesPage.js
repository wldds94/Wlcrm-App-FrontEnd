import React, { useMemo, useState } from 'react'

// material-ui
import { Box, Grid, Stack } from '@mui/material'
// styled
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material'

// project import
import ChartsCard from 'components/apex-charts/card/ChartsCard';
import AccordionCard from 'components/card/list/AccordionCard';
import SummaryYear from './components/SummaryYear';

// hooks
import useInvoicesData from 'hooks/redux/useInvoicesData';

// utils
import { getCategoriesByPeriod, getPositionByPeriod } from 'utils/app/stats/stats';
import { getCurrentYearsCategories, getDateInYear, getSummary, getYearsCategories } from 'utils/app/stats/stats-summary';

const StatsInvoicesPage = () => {
    // // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const { data: invoices } = useInvoicesData()

    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={12} >
                    <Stack direction={matchDownSM ? "column" : "row"} gap={1.5} >
                        <Stack gap={2} justifyContent="space-between" >
                            <AccordionCard
                                bottomBorder={false}
                                fullWidth={true}
                                ContentDetails={() => <>
                                    <SummaryYear
                                        data={invoices?.filter(item => Number(item?.paid) === 0)}
                                        memoryDataCallback={getSummary}
                                        memoryCategoriesCallback={(data, types) => getCategoriesByPeriod(data, types)}
                                        fieldDate="date"
                                        fieldValue="subtotal"
                                        transformValueToCompare={(value) => getDateInYear(value)}
                                        getPositionByPeriod={(period, value) => getPositionByPeriod(period, value)}
                                        getUnique={getCurrentYearsCategories}
                                        chartsSubTitle="Totale Insoluto"
                                        titleLabelColor="#ff4d4f"
                                   />
                                </>}
                            />
                            <AccordionCard
                                bottomBorder={false}
                                fullWidth={true}
                                ContentDetails={() => <>
                                    <SummaryYear
                                        data={invoices?.filter(item => Number(item?.paid) === 1)}
                                        memoryDataCallback={getSummary}
                                        memoryCategoriesCallback={(data, types) => getCategoriesByPeriod(data, types)}
                                        fieldDate="date"
                                        fieldValue="subtotal"
                                        transformValueToCompare={(value) => getDateInYear(value)}
                                        getPositionByPeriod={(period, value) => getPositionByPeriod(period, value)}
                                        getUnique={getCurrentYearsCategories}
                                   />
                                </>}
                            />
                        </Stack>
                        <Box sx={{ flexGrow: 15, }}>
                            <ChartsCard
                                cardTitle="Confronto Ultima Settimana sul Triennio"
                                data={invoices}
                                memoryDataCallback={getSummary}
                                memoryCategoriesCallback={(data, types) => getCategoriesByPeriod(data, types)}
                                columnParallal="year"
                                fieldDate="date"
                                fieldValue="subtotal"
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
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} >
                    <ChartsCard
                        cardTitle="Confronto Annuo sul Triennio"
                        data={invoices}
                        memoryDataCallback={getSummary}
                        // memoryDataDependecies={['subtotal']}
                        memoryCategoriesCallback={(data, types) => getCategoriesByPeriod(data, types)}
                        columnParallal="year"
                        fieldDate="date"
                        fieldValue="subtotal"
                        transformValueToCompare={(value) => getDateInYear(value)}
                        getPositionByPeriod={(period, value) => getPositionByPeriod(period, value)}
                        getUnique={getYearsCategories}
                        defaultTypeSeries="months"
                        defaultTypesSeries={[{
                            value: 'months',
                            label: 'Mese',
                        }, {
                            value: 'weeks',
                            label: 'Week',
                        }]}
                    />
                </Grid>

            </Grid>
            {/* <ApexChart /> */}
        </>
    )
}

export default StatsInvoicesPage