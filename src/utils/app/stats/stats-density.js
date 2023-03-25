export const getCountByColumn =  (
    data = [],
    typeSeries = false,
    columnParallal = false,
    fieldValue = false,
    fieldParallal = false, // fieldDate
    fieldParallalValue = false,
    categories = [], 
    getUnique = (data, columnParallal) => {return []},
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = () => {return -1},
    transformValueToPush = (value) => {return value},
) => {
    const unique = getUnique(data, columnParallal)

    let series = new Array(unique.length).fill(0)
    data?.map((item, index) => {
        const position = fieldParallal !== false ? unique.indexOf(item[fieldParallal]) : 0
        series[position] += 1
    })

    return series // [{ data: series }]
    // return []
}

export const getDensityByColumn =  (
    data = [],
    typeSeries = false,
    columnParallal = false,
    fieldValue = false,
    fieldParallal = false, // fieldDate
    fieldParallalValue = false,
    categories = [], 
    getUnique = (data, columnParallal) => {return []},
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = () => {return -1},
    transformValueToPush = (value) => {return value},
) => {
    const unique = getUnique(data, columnParallal)

    let series = []
    unique?.map((item, index) => {
        let x = item
        let y = []
        data?.map((row, index) => {
            if (row[columnParallal] === item) {
                y.push(transformValueToPush(row[fieldParallal]))
            }
        })
        series.push({
            x: x,
            y: y,
        })
    })

    return [{ data: series }]
    // return []
}

export const getCountByColumnWithData = (
    data = [],
    typeSeries = false,
    columnParallal = false,
    fieldValue = false,
    fieldParallal = false, // fieldDate
    fieldParallalValue = false,
    categories = [], 
    getUnique = (data, columnParallal) => {return []},
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = () => {return -1},
    transformValueToPush = (value) => {return value},
) => {
    const series = getCountByColumn(
        data, 
        typeSeries, 
        columnParallal, 
        fieldValue,
        fieldParallal, 
        fieldParallalValue,
        categories, 
        getUnique,
        transformValueToCompare,
        getPositionByPeriod,
        transformValueToPush,
    ) 

    return [{ data: series }]
}

export const getPercentCount = (
    data = [],
    typeSeries = false,
    columnParallal = false,
    fieldValue = false,
    fieldParallal = false, // fieldDate
    fieldParallalValue = false,
    categories = [], 
    getUnique = (data, columnParallal) => {return []},
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = () => {return -1},
    transformValueToPush = (value) => {return value},
) => {
    const rows = getCountByColumn(
        data, 
        typeSeries, 
        columnParallal, 
        fieldValue,
        fieldParallal, 
        fieldParallalValue,
        categories, 
        getUnique,
        transformValueToCompare,
        getPositionByPeriod,
        transformValueToPush,
    ) 

    const series = rows?.map(item => {return /* Math.floor*/( (item / data.length) * 100).toFixed(2)})
    return series
}

export const getUniqueByColumn = (data, column) => {
    console.log(data)
    return [...new Set(data.map(item => column !== false ? item[column] : item))]
}