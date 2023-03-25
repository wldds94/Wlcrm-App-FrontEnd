import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getClientsStatus, getClientsSyncStatus, syncClients } from 'store/reducers/client';

const ClientsSynchronizer = () => {
    const POLL_TIME_CHAT = 1000 * 30
    const POLL_TIME = 1000 * 60 //  30 // 90// 60
    const POLL_TIME_TEST = 1000 * 120 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    /**
     * Necessary Data
     *  */ 
    // // CLIENTS
    // const clientsList = useSelector(getAllClients)
    const clientsStatus = useSelector(getClientsStatus)
    const clientsSyncStatus = useSelector(getClientsSyncStatus)

    // messages
    useEffect(() => {
        // console.log('Active Interval Client Timer');
        const clientTimer = setInterval(() => {
            if (clientsStatus !== 'loading' && clientsSyncStatus !== 'loading') {
                dispatch(syncClients())
            }
        }, POLL_TIME_TEST)

        return () => clearInterval(clientTimer)
    }, [])

    return (
        <></>
    )
}

export default ClientsSynchronizer