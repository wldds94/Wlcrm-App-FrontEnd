import React from 'react'

import ChartsCard from 'components/apex-charts/card/ChartsCard'

// utils
import { getPercentCount, getUniqueByColumn } from 'utils/app/stats/stats-density'

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
            withWrapToolbar={false}
            chartsTitle="Panoramica Richiami"
            data={data}
            memoryDataCallback={getPercentCount}
            memoryCategoriesCallback={getUniqueByColumn}
            getUnique={getUniqueByColumn}
            columnParallal="recallStatus"
            fieldDate="recallStatus"
            defaultType={defaultType}
            defaultTypeSeries="recallStatus"
            toggler={false}
            themeColor={"status"}
        />
    )
}

export default SummaryRecallRadial