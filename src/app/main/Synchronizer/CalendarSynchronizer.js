import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getCalendarStatus, getCalendarSyncStatus, syncEvents } from 'store/reducers/calendar';


const CalendarSynchronizer = () => {
    // const POLL_TIME_CHAT = 1000 * 30
    const POLL_TIME = 1000 * 300 //  30 // 90// 60
    // const POLL_TIME_TEST = 1000 * 10 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    // // CALENDAR
    const calendarStatus = useSelector(getCalendarStatus)
    const calendarSyncStatus = useSelector(getCalendarSyncStatus)

    // calendar
    useEffect(() => {
        const calendarTimer = setInterval(() => {
            if (calendarStatus !== 'loading' && calendarSyncStatus !== 'loading') {
                dispatch(syncEvents())
            }
        }, POLL_TIME)

        return () => clearInterval(calendarTimer)
    }, [])

    return (
        <></>
    )
}

export default CalendarSynchronizer