import { getDayJS, getDayLabelByToday, getHourLabel, getMonthLabel } from "utils/libs/dayjsUtils";

const dayjs = getDayJS()
/**
 * STATS
 */
export const getCategoriesByPeriod = (data, period = 'months') => {
    // const dayjs = getDayJS()

    let res = []
    switch (period) {
        case 'months':
            res = getMonthLabel() //  dayjs.months()
            break;
        case 'weeks':
            let weeksLen = dayjs().isoWeeksInYear() // let weeks = []
            for (let i = 0; i < weeksLen; i++) {
                res[i] = 'Week ' + i;
            }
            // res = dayjs.months()
            break;
        case 'lastWeek':
            const lastWeekDays = 7
            // const numberDay = dayjs().dayOfYear() // let weeks = []
            for (let i = 0; i < lastWeekDays; i++) {
                res[lastWeekDays - (i + 1)] = getDayLabelByToday(-Number(i)) // i > 0 ? i + ' gg fa' : 'Oggi';
            }
            // res = dayjs.months()
            break;
        case 'lastMonth':
            const lastMonthDays = 31
            // const numberDay = dayjs().dayOfYear() // let weeks = []
            for (let i = 0; i < lastMonthDays; i++) {
                res[lastMonthDays - (i + 1)] = getDayLabelByToday(-Number(i)) // i > 0 ? i + ' gg fa' : 'Oggi';
            }
            // res = dayjs.months()
            break;
        case 'hour':
            res = getHourLabel() //  dayjs.months()
            break;
        default:
            break;
    }
    return res
}

export const getPositionByPeriod = (period = 'months', date) =>  {
    let position = -1
    console.log(period);
    console.log(date);
    switch (period) {
        case 'months':
            position = dayjs(date).month()
            break;
        case 'weeks':
            position = dayjs(date).week()
            break;
        case 'lastWeek':
            const lastWeekDays = 7
            const numberWeekDay = dayjs(date).dayOfYear() // let weeks = []
            const todayWeekDay = dayjs().dayOfYear() // let weeks = []
            const diffWeekDay = todayWeekDay - numberWeekDay
            if (diffWeekDay >= 0 && diffWeekDay < lastWeekDays) {
                position = lastWeekDays - (diffWeekDay + 1)
            }
            break;
        case 'lastMonth':
            const lastMonthDays = 31
            const numberMonthDay = dayjs(date).dayOfYear() // let weeks = []
            const todayMonthDay = dayjs().dayOfYear() // let weeks = []
            const diffMonthDay = todayMonthDay - numberMonthDay
            if (diffMonthDay >= 0 && diffMonthDay < lastMonthDays) {
                position = lastMonthDays - (diffMonthDay + 1)
            }
            break;
        case 'hour':
            console.log(date);
            position = dayjs(date).hour() // position = 0
            break;
        default:
            break;
    }
    return position
}