import React from 'react'

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getInvoicesSyncMessage, getInvoicesSyncTime, getInvoicesSyncUpdate, syncInvoiceData } from 'store/reducers/invoice';

// project import
import SyncNotification from './components/SyncNotification';

// icons
import {GiMoneyStack} from 'react-icons/gi'

const InvoiceSync = () => {
    const dispatch = useDispatch()

    const syncUpdate = useSelector(getInvoicesSyncUpdate) // console.log(syncUpdate);
    const syncMessage = useSelector(getInvoicesSyncMessage)
    const syncTime = useSelector(getInvoicesSyncTime)

    const handleSync = (e) => {
        // console.log('Sync Clients');
        dispatch(syncInvoiceData())
    }

    return (
        <>
            {syncUpdate &&
                <>
                    <SyncNotification
                        NoticeIcon={GiMoneyStack}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    />
                </>}
        </>
    )
}

export default InvoiceSync