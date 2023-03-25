import React from 'react'

// material-ui
import { Box, Grid, Stack } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import SummaryDeleted from 'pages/management/events/components/SummaryDeleted';
import SummaryRecallRadial from 'pages/management/events/components/SummaryRecallRadial';
import ChartsCard from 'components/apex-charts/card/ChartsCard';

// hooks
import useAccountData from 'hooks/redux/aggregate/useAccountData';

// utils
import { getDateInYear, getSummary, getYearsCategories } from 'utils/app/stats/stats-summary'
import { getUniqueByColumn } from 'utils/app/stats/stats-density';
import { getCategoriesByPeriod, getPositionByPeriod } from 'utils/app/stats/stats';

const AccountDashboardPage = () => {
    const {
        account,
        events,
    } = useAccountData()
    console.log(account);
    console.log(events);

    return (
        <Grid container spacing={2} >
            <Grid item xs={6} /* sm={12} md={12} */ >
                <AccordionCard
                    bottomBorder={false}
                    fullWidth={true}
                    ContentDetails={() => <>
                        <SummaryDeleted
                            data={events}
                        />
                    </>}
                />
            </Grid>
            <Grid item xs={6} /* sm={12} */ >
                <AccordionCard
                    bottomBorder={false}
                    fullWidth={true}
                    ContentDetails={() => <>
                        <SummaryRecallRadial
                            data={events}
                        />
                    </>}
                />
            </Grid>
            <Grid item xs={12} >
                <ChartsCard
                    cardTitle="Ultimo Mese / Settimana"
                    data={events?.filter(item => item.status !== 'deleted')}
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
        </Grid>
    )
}

export default AccountDashboardPage