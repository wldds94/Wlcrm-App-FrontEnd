import React, { useEffect, useState } from 'react'

// dayjs // ES 2015
// import dayjs from 'dayjs'
import 'dayjs/locale/it';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getShoppingSyncMessage, getShoppingSyncTime, getShoppingSyncUpdate, syncShoppingData } from 'store/reducers/shopping';

// project import
import SyncNotification from './components/SyncNotification';

// icons
import { ImGift } from 'react-icons/im'


const ShoppingSync = ({
    dispatchResync = false,
}) => {
    // console.log('ShoppingSync');

    const dispatch = useDispatch()

    // const syncStatus = useSelector(getSyncStatus)
    const syncMessage = useSelector(getShoppingSyncMessage)
    const syncUpdate = useSelector(getShoppingSyncUpdate)
    const syncTime = useSelector(getShoppingSyncTime)

    const handleSync = (e) => {
        console.log('Sync Shopping');
        dispatch(syncShoppingData(/* { value: 'Test' } */))//.unwrap()
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
                        NoticeIcon={ImGift}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    // dispatchResync={haveToResync}
                    />
                </>}
        </>

    )
}

export default ShoppingSync