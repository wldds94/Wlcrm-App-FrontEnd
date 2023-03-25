import { getDateFormat, getYears } from "utils/libs/dayjsUtils"

export const getSummary = (
    data = [],
    typeSeries = false,
    columnParallal = false,
    fieldValue = false,
    fieldParallal = false, // fieldDate
    fieldParallalValue = false,
    categories = [],
    getUnique = (data, columnParallal) => { return [] },
    transformValueToCompare = (value) => { return value },
    getPositionByPeriod = () => { return -1 },
    transformValueToPush = (value) => { return value },
) => {
    let res = []
    const unique = getUnique(data, columnParallal)
    // console.log(unique);
    // console.log(data); // console.log(unique);
    for (let i = 0; i < unique.length; i++) {
        const parallelData = data?.filter((item) => {
            return fieldParallal !== false && String(transformValueToCompare(item[fieldParallal])) === String(unique[i])
        })
        let resData = new Array(categories.length).fill(0)
        // console.log(parallelData);

        parallelData?.map((row) => {
            const position = fieldParallalValue !== false ?
                getPositionByPeriod(typeSeries, row[fieldParallalValue])
                : (fieldParallal ? getPositionByPeriod(typeSeries, row[fieldParallal]) : -1 )// dayjs(invoice?.date).month()
            // console.log(position);
            if (position >= 0) {
                resData[position] += (fieldValue !== false && row[fieldValue]) ? Number(row[fieldValue]) : 1
            }
        })

        let aux = {
            name: unique[i],
            data: resData
        }
        res.push(transformValueToPush(aux))
    }

    return res
}

export const getYearsCategories = (data, columnParallal) => {
    return getYears(2)
}

export const getCurrentYearsCategories = (data, columnParallal) => {
    return getYears(0)
}

export const getDateInYear = (value) => {
    return getDateFormat(value, 0, "YYYY")
}

