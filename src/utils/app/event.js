import { getHourAndDate } from "utils/date"
import { todayIsInByRange } from "utils/libs/dayjsUtils"

/**
 * Get the research label
 * 
 * @param {Object} user 
 * @returns {Object} 
 */
export const getEventResarchLabel = (event/* , trimmed = true, byMeta = true */) => {
    const { hour, date } = getHourAndDate(event?.startDate)
    let res = ""
    res += event?.title + " | " + date + " - " + hour 
    return res
}


/**
 * Get the events mapped for the recall
 * 
 * @param {Object} user 
 * @returns {Object} 
 */
export const getEventsRecallMapped = (events, range = 7, todayDeelay = false) => {
    const array = []
    events
        ?.map((item, index) => {
            if (item?.hasRecall) {
                const row = todayIsInByRange(range, item?.startDate, item?.recallAfter, todayDeelay)

                if (row.inRange) {
                    let aux = Object.assign({}, item)
                    aux.recall = row
                    array.push({ ...aux })
                }
            }
        }) // console.log(array);

    const res = array?.sort((a, b) => {
        const aRecall = a?.recall // console.log(a); // console.log(aRecall);
        const bRecall = b?.recall // console.log(b); // console.log(bRecall);
        // console.log(Number(aRecall?.diff) > Number(bRecall?.diff));
        return Number(bRecall?.diff) - Number(aRecall?.diff)
    })
    // console.log(res);
    return res
}

// /**
//  * STATS
//  * 
//  * reArrange
//  */
// export const getBubbleData = (data, column) => {

// }