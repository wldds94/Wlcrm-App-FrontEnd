import React from 'react'

import ChartsCard from 'components/apex-charts/card/ChartsCard'

// utils
import { getPercentCount, getUniqueByColumn } from 'utils/app/stats/stats-density'

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
            memoryCategoriesCallback={getUniqueByColumn}
            getUnique={getUniqueByColumn}
            columnParallal="status"
            fieldDate="status"// fieldDate="date"
            // parallelSeries={0}
            defaultType={defaultType}
            defaultTypeSeries="status"
            toggler={false}
            themeColor={"status"}
        />
    )
}

export default SummaryDeleted