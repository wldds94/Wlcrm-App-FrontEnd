import React, { useEffect, useState } from 'react'

// project import
import ChartsCard from 'components/apex-charts/card/ChartsCard'

// utils
import { sumArray } from 'utils/array'
import { isDeepEqual } from 'utils/equal'

const SummaryYear = ({
    data = [],
    memoryDataCallback = (data) => [],
    memoryCategoriesCallback = (data) => [],
    memoryDataDependecies = [],
    columnParallal = "year",
    fieldDate = "date",
    fieldValue = "subtotal",
    transformValueToCompare = (value) => { return value },
    getPositionByPeriod = (period, value) => { return -1 },
    getUnique = () => { return [] },
    defaultType = "sparkline",
    chartsSubTitle = "Totale Anno",
    titleLabelColor = "#42b557",
    ...other
}) => {
    const [currentData, setCurrentData] = useState(data)
    useEffect(() => {
        if (!isDeepEqual(data, currentData)) {
            setCurrentData(data)
        }
    }, [data])

    return (
        <>
            <ChartsCard
                classesContainer={['wlcrm-chart-sparkline']}
                withHeader={false}
                withWrapToolbar={false}
                chartsTitlePreparation={sumArray}
                chartsSubTitle={chartsSubTitle} // "Totale Anno"
                titleLabelColor={titleLabelColor}
                data={currentData}
                memoryDataCallback={memoryDataCallback}
                memoryCategoriesCallback={memoryCategoriesCallback}
                columnParallal={columnParallal}
                fieldDate={fieldDate}
                fieldValue={fieldValue}
                transformValueToCompare={(value) => transformValueToCompare(value)}
                getPositionByPeriod={(period, value) => getPositionByPeriod(period, value)}
                getUnique={getUnique}
                defaultType={defaultType}
                defaultTypeSeries="months"
                toggler={false}
            />
        </>
    )
}

export default SummaryYear