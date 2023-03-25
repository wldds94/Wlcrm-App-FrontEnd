//import dayjs from 'dayjs' // ES 2015
const dayjs = require('dayjs')
require('dayjs/locale/it')
dayjs.locale('it') // use locale globally
// import 'dayjs/locale/de' // ES 2015 
var localeData = require('dayjs/plugin/localeData')
dayjs.extend(localeData)
var dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
var isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
var isLeapYear = require('dayjs/plugin/isLeapYear') // dependent on isLeapYear plugin
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
// for the list of hours
var duration = require('dayjs/plugin/duration')
dayjs.extend(duration)
// UTC
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const getDayJS = () => {
    return dayjs
}

/**
 * TODAY DATE FORMAT
 */
export const getDateFormat = (date = false, daysDeelay = 0, formatDate = 'DD MMM YYYY', byUnix = false) => {
    const dateDayjs = date !== false 
        ? ( byUnix !== false ? dayjs.unix(date) : dayjs(date) )
        : dayjs()
    const search = Number(daysDeelay) !== 0 ? dateDayjs.add(daysDeelay, 'day') : dateDayjs

    return search.format(formatDate)
}

/**
 * 
 */
export const getAge = (dateString) => {
    const dayjsBirthday = dayjs(dateString);
    return dayjs().diff(dayjsBirthday, 'year')
}

// export const isInTheFuture = (date) => {
//     // console.log(date);
//     return Boolean(dayjs(date).isSameOrAfter(dayjs(), 'day') > 0)
// }

/**
 * range => Number of days
 */
export const todayIsInByRange = (range = 7, startDate = false, deelay = false, todayDeelay = false) => {
    const recallDate = Number(deelay) > 0 ? dayjs(startDate).add(Number(deelay), 'day') : dayjs()
    // console.log(recallDate);
    const today = dayjs(dayjs().format('YYYY-MM-DD'))
    // console.log(today);
    const diffByToday = today.diff(recallDate, 'day')
    // console.log(diffByToday);

    const status = diffByToday < 0 ? -1 : ((diffByToday === 0) ? 0 : 1)
    // const color = diff < 0 ? 'green' : ((diff === 0) ? 'orange' : 'red')
    return {
        inRange: Math.abs(diffByToday + (todayDeelay !== false ? Number(todayDeelay) : 0)) <= range, // Boolean(recallDate.isBetween(start, end)),
        diff: diffByToday,
        status: status,
        label: getDayLabelByToday(-diffByToday, true)
        // color: color,
    }
}

/**
 * DAY LABEL
 */
export const getDayLabelByToday = (diffDays, fullDaysLabel = false) => {
    const diff = Number(diffDays)

    const fullDaysLabels = {
        0: 'giorno',
        1: 'giorni',
    }

    const base = fullDaysLabel ? ' ' + (diff > 1 ? fullDaysLabels[1] : fullDaysLabels[0]) : ' gg'
    const back = ' fa'
    const future = 'Tra '
    const today = 'Oggi'
    const days = Math.abs(diff)

    return diff === 0
        ? today : (
            diff < 0 ? (
                days + base + back
            ) : future + days + base
        )
}

export const getMonthLabel = () => {
    return dayjs.months()
}

export const getHourLabel = () => {
    // return dayjs.duration().hours()
    var result = []; // Results will go here

    // Loop from current hour number to 23
    for (var i = 0; i < 24; i++) {
        result.push(i + ":00");  // Put loop counter into array with "00" next to it
    }
    return result
}

export const getYears = (before = 0, after = 0) => {
    let currentYear = dayjs().year()
    var max = currentYear + Number(after)
    var min = currentYear - Number(before)

    var years = []

    for (var i = max; i >= min; i--) {
        years.push(i)
    }
    return years
}

// /**
//  * FILTERS
//  */
// export const filterDateBetween = (list = [], startDate = null, endDate = null) => {
//     const innerStartDate = startDate === null || !startDate.length ? '0000-01-01' : startDate
//     const innerEndDate = endDate === null || !endDate.length ? "3000-01-01" : endDate
//     const startSearchDate = dayjs(innerStartDate)
//     const endSearchDate = dayjs(innerEndDate)

//     return list.filter(item => {
//         const itemDate = dayjs(item.date)
//         return itemDate.isBetween(startSearchDate, endSearchDate) // .isAfter(searchDate)
//     })
// }