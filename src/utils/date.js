// dayjs
import dayjs from 'dayjs'
import 'dayjs/locale/it';

/**
 * Get Human Readable Date
 * 
 * @param {Object} user 
 * @returns {Object} 
 */
export const getHumanReadableDate = (dateValue/* , trimmed = true, byMeta = true */) => {
    let dateString = ""
    // res += event?.title + " - "

    const res = dayjs(dateValue).locale('it').format("dddd DD MMMM YYYY")
    
    return res[0].toUpperCase() + res.substring(1)
}


/**
 * Covnert // 2021-09-16 => 16-09-2021 or // 16-09-2021 => 2021-09-16
 * 
 * @param {string} dateString
 * 
 * @returns string
 */
export default function convertDate(dateString) {

    return (dateString && dateString.length) ? dateString.split("-").reverse().join("-") : "";
}

/**
 * Get [HOUR , DATE]
 * 
 * @param {Object} dateValue 
 * @returns {Object} 
 */
export const getHourAndDate = (dateValue/* , trimmed = true, byMeta = true */) => {
    const dayjsVal = dayjs(dateValue).locale('it') // .format("HH:mm")
    return {
        hour: dayjsVal.format("HH:mm"),
        date: dayjsVal.format("D MMM YYYY"),
    }
}