import React from 'react'

import ChartsCard from 'components/apex-charts/card/ChartsCard'
import { getCountByColumn, getPercentCount } from 'utils/stats'

const SummaryDeleted = ({
    data = [],
    memoryDataCallback = (data) => data,
    defaultType = "radialBar",
    ...other
}) => {
    return (
        <ChartsCard
            classesContainer={['wlcrm-chart-small']}
            withHeader={false}
            // cardTitle="Panoramica Appuntamenti"
            withWrapToolbar={false}
            chartsTitle="Panoramica Appuntamenti"
            // chartsTitlePreparation={() => "Panoramica Appuntamenti"}
            // chartsSubTitle="Panoramica Stato"
            data={data}
            memoryDataCallback={getPercentCount}
            parallelSeries={0}
            defaultType={defaultType}
            defaultTypeCategory="status"
            toggler={false}
            themeColor={"status"}
        />
    )
}

export default SummaryDeleted