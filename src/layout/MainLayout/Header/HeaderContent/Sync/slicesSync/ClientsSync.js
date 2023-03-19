import React from 'react'

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getClientsSyncMessage, getClientsSyncTime, getClientsSyncUpdate, syncClientData } from 'store/reducers/client';

// project import
import SyncNotification from './components/SyncNotification';

// icons
import {HiOutlineUserGroup} from 'react-icons/hi'


const ClientsSync = () => {
    console.log('ClientsSync');
    const dispatch = useDispatch()

    const syncUpdate = useSelector(getClientsSyncUpdate) // console.log(syncUpdate);
    const syncMessage = useSelector(getClientsSyncMessage)
    const syncTime = useSelector(getClientsSyncTime)

    const handleSync = (e) => {
        // console.log('Sync Clients');
        dispatch(syncClientData(/* { value: 'Test' } */))//.unwrap()
    }

    return (
        <>
            {syncUpdate &&
                <>
                    <SyncNotification
                        NoticeIcon={HiOutlineUserGroup}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    />
                </>}
        </>
    )
}

export default ClientsSync