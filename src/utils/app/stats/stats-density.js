export const getCountByColumn =  (
    data = [], 
    period = false, 
    columnParallal = false, 
    fieldValue = false,
    fieldDate = false, 
    categories = [], 
    getUnique = (data, columnParallal) => {return []},
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = () => {return -1},
    transformValueToPush = (value) => {return value},
) => {
    const unique = getUnique(data, columnParallal)

    let series = new Array(unique.length).fill(0)
    data?.map((item, index) => {
        const position = fieldDate !== false ? unique.indexOf(item[fieldDate]) : 0
        series[position] += 1
    })

    return series // [{ data: series }]
    // return []
}

export const getDensityByColumn =  (
    data = [], 
    period = false, 
    columnParallal = false, 
    fieldValue = false,
    fieldDate = false, 
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
                y.push(transformValueToPush(row[fieldDate]))
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
    period = false, 
    columnParallal = false, 
    fieldValue = false,
    fieldDate = false, 
    categories = [], 
    getUnique = (data, columnParallal) => {return []},
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = () => {return -1},
    transformValueToPush = (value) => {return value},
) => {
    const series = getCountByColumn(
        data, 
        period, 
        columnParallal, 
        fieldValue,
        fieldDate, 
        categories, 
        getUnique,
        transformValueToCompare,
        getPositionByPeriod,
        transformValueToPush,
    ) 

    return [{ data: series }]
}

export const getUniqueByColumn = (data, column) => {
    console.log(data);
    return [...new Set(data.map(item => column !== false ? item[column] : item))]
}