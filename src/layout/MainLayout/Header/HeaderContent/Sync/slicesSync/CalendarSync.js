import React, { useEffect } from 'react'

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getCalendarSyncMessage, getCalendarSyncTime, getCalendarSyncUpdate, syncCalendarData } from 'store/reducers/calendar';

// project import
import SyncNotification from './components/SyncNotification';

// icons
import {TbCalendarEvent} from 'react-icons/tb'

const CalendarSync = ({
    dispatchResync = false,
}) => {
    const dispatch = useDispatch()

    // const syncStatus = useSelector(getSyncStatus)
    const syncMessage = useSelector(getCalendarSyncMessage)
    const syncUpdate = useSelector(getCalendarSyncUpdate)
    const syncTime = useSelector(getCalendarSyncTime)

    const handleSync = (e) => {
        console.log('Sync Calendar');
        dispatch(syncCalendarData())
    }

    useEffect(() => {
        if (dispatchResync/*  !== haveToResync */) {
            handleSync()
        }
    }, [dispatchResync])

    return (
        <>
            {syncUpdate &&
                <>
                    <SyncNotification
                        NoticeIcon={TbCalendarEvent}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    />
                </>}
        </>

    )
}

export default CalendarSync