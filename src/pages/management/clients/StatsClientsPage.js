import React, { useMemo } from 'react'

// material-ui
import { Box, Grid, Stack } from '@mui/material'
// styled
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard';
import ChartsCard from 'components/apex-charts/card/ChartsCard';

// hooks
import useClients from 'hooks/redux/useClients';
import { getCountByColumn, getCountByColumnWithData, getDensityByColumn, getUniqueByColumn } from 'utils/app/stats/stats-density';
import { getAge } from 'utils/libs/dayjsUtils';

const StatsClientsPage = () => {
    const { clients } = useClients()

    // const categoriesMemo = useMemo(() => (
    //     return getU
    // ), [clients])
    // const seriesMemo = getDensityByColumn(clients, false, 'sex', false, 'birth_date', [],)

    return (
        <Grid container spacing={3} >
            <Grid item xs={12} >
                <Stack direction={"column"} gap={1.5} >
                    <Stack direction="column"/* {matchDownSM ? "column" : "row"} */ gap={2} justifyContent="space-between" >
                        <AccordionCard
                            bottomBorder={false}
                            fullWidth={true}
                            ContentDetails={() => <>
                                <ChartsCard
                                    classesContainer={['wlcrm-chart-small']}
                                    cardTitle="Frequenza Genere Paziente"
                                    withWrapToolbar={false}
                                    data={clients}
                                    memoryDataCallback={getCountByColumn}
                                    defaultTypeSeries="sex"
                                    memoryCategoriesCallback={getUniqueByColumn}
                                    getUnique={getUniqueByColumn}
                                    columnParallal="sex"
                                    fieldDate="sex"
                                    toggler={false}
                                    defaultType="donut"
                                    themeColor="genre"
                                />
                            </>}
                        />
                        <AccordionCard
                            bottomBorder={false}
                            fullWidth={true}
                            ContentDetails={() => <>
                                <ChartsCard
                                    cardTitle="Frequenza Pazienti per Località"
                                    withWrapToolbar={false}
                                    data={clients}
                                    memoryDataCallback={getCountByColumnWithData}
                                    defaultTypeSeries="province"
                                    memoryCategoriesCallback={getUniqueByColumn}
                                    getUnique={getUniqueByColumn}
                                    columnParallal="province"
                                    fieldDate="province"
                                // toggler={false}
                                />
                            </>}
                        />
                    </Stack>
                    <Box>
                        <ChartsCard
                            classesContainer={['wlcrm-chart-boxPlot']}
                            cardTitle="Densità Età Paziente per Genere"
                            withWrapToolbar={false}
                            data={clients}
                            memoryDataCallback={getDensityByColumn}
                            getUnique={getUniqueByColumn}
                            columnParallal="sex"
                            fieldDate="birth_date"
                            transformValueToPush={getAge}
                            defaultType="boxPlot"
                            defaultTypeSeries="sex"
                        />
                    </Box>
                </Stack>
            </Grid>

            <Grid item xs={12} >
                { }
            </Grid>
        </Grid>
    )
}

export default StatsClientsPage