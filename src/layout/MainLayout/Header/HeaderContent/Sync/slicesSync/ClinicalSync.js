import React, { useEffect } from 'react'

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalSyncMessage, getClinicalSyncTime, getClinicalSyncUpdate, syncClinicalData } from 'store/reducers/clinical';
// slices

// project import
import SyncNotification from './components/SyncNotification';

// icons
import { BsJournalArrowDown } from 'react-icons/bs'

const ClinicalSync = ({
    dispatchResync = false,
}) => {
    const dispatch = useDispatch()

    // const syncStatus = useSelector(getSyncStatus)
    const syncMessage = useSelector(getClinicalSyncMessage)
    const syncUpdate = useSelector(getClinicalSyncUpdate)
    const syncTime = useSelector(getClinicalSyncTime)

    const handleSync = (e) => {
        console.log('Sync Clinical');
        dispatch(syncClinicalData())
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
                        NoticeIcon={BsJournalArrowDown}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    />
                </>}
        </>

    )
}

export default ClinicalSync