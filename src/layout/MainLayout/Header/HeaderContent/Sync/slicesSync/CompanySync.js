import React, { useEffect } from 'react'

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { getOptionsSyncMessage, getOptionsSyncTime, getOptionsSyncUpdate, syncOptionsData } from 'store/reducers/options';
// slices

// project import
import SyncNotification from './components/SyncNotification';

// icons
import {TbBuildingStore} from 'react-icons/tb'

const CompanySync = ({
    dispatchResync = false,
}) => {
    const dispatch = useDispatch()

    const syncUpdate = useSelector(getOptionsSyncUpdate) // console.log(syncUpdate);
    const syncMessage = useSelector(getOptionsSyncMessage)
    const syncTime = useSelector(getOptionsSyncTime)

    const handleSync = (e) => {
        // console.log('Sync Clients');
        dispatch(syncOptionsData())
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
                        NoticeIcon={TbBuildingStore}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    />
                </>}
        </>
    )
}

export default CompanySync