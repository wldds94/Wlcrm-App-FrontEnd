import { getDateFormat, getYears } from "utils/libs/dayjsUtils"

export const getSummary = (
    data = [], 
    period = false, 
    columnParallal = false, 
    fieldValue = false,
    fieldDate = false, 
    categories = [], 
    getUnique = (data, columnParallal) => {return []},
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = () => {return -1}
) => {
    let res = []
    const unique = getUnique(data, columnParallal)
    console.log(data);
    console.log(unique);
    for (let i = 0; i < unique.length; i++) {
        const parallelData = data?.filter((item) => 
            fieldDate !== false && String(transformValueToCompare(item[fieldDate])) === String(unique[i]))
        let resData = new Array(categories.length).fill(0)

        parallelData?.map((row) => {
            const position = fieldDate ? getPositionByPeriod(period, row[fieldDate]) : -1 // dayjs(invoice?.date).month()
            if (position >= 0) {
                resData[position] += (fieldValue !== false && row[fieldValue]) ? Number(row[fieldValue]) : 1
            }
        })

        let aux = {
            name: unique[i],
            data: resData
        }
        res.push(aux)
    }

    return res
}

export const getYearsCategories = (data, columnParallal) => {
    return getYears(2)
}

export const getDateInYear = (value) => {
    return getDateFormat(value, 0, "YYYY")
}

