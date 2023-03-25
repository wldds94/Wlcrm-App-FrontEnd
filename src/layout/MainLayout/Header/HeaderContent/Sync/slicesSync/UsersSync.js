import React, { useEffect } from 'react'

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getUsersSyncMessage, getUsersSyncTime, getUsersSyncUpdate, syncUsersData } from 'store/reducers/users';

// project import
import SyncNotification from './components/SyncNotification';

// icons
import {BiNetworkChart} from 'react-icons/bi'

const UsersSync = ({
    dispatchResync = false,
}) => {
    const dispatch = useDispatch()

    // const syncStatus = useSelector(getSyncStatus)
    const syncMessage = useSelector(getUsersSyncMessage)
    const syncUpdate = useSelector(getUsersSyncUpdate)
    const syncTime = useSelector(getUsersSyncTime)

    const handleSync = (e) => {
        console.log('Sync Users');
        dispatch(syncUsersData())
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
                        NoticeIcon={BiNetworkChart}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    />
                </>}
        </>

    )
}

export default UsersSync