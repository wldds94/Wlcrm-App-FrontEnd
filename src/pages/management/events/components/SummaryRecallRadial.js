import React from 'react'

import ChartsCard from 'components/apex-charts/card/ChartsCard'
import { getCountByColumn, getPercentCount } from 'utils/stats'

const SummaryRecallRadial = ({
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
            chartsTitle="Panoramica Richiami"
            // chartsTitlePreparation={() => "Panoramica Appuntamenti"}
            // chartsSubTitle="Panoramica Stato"
            data={data}
            memoryDataCallback={getPercentCount}
            parallelSeries={0}
            defaultType={defaultType}
            defaultTypeCategory="recallStatus"
            toggler={false}
            themeColor={"status"}
        />
    )
}

export default SummaryRecallRadial