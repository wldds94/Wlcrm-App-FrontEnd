import React from 'react'

// project import
import ChartsCard from 'components/apex-charts/card/ChartsCard'

// utils
import { sumArray } from 'utils/array'

const SummaryWeek = ({
    data = [],
    memoryDataCallback = (data) => data,
    memoryDataDependecies= [],
    defaultType = "sparkline",
    ...other
}) => {

    return (
        <>
            <ChartsCard
                classesContainer={['wlcrm-chart-sparkline']}
                withHeader={false}
                withWrapToolbar={false}
                chartsTitlePreparation={sumArray}
                chartsSubTitle="Totale Settimana"
                data={data}
                memoryDataCallback={memoryDataCallback}
                memoryDataDependecies={memoryDataDependecies}
                parallelSeries={0}
                defaultType={defaultType}
                defaultTypeCategory="lastWeek"
                toggler={false}
            />
        </>
    )
}

export default SummaryWeek