import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getClinicalStatus, getClinicalSyncStatus, syncClinical } from 'store/reducers/clinical';


const ClinicalSynchronizer = () => {
    // const POLL_TIME_CHAT = 1000 * 60
    const POLL_TIME = 1000 * 300 //  30 // 90// 60
    // const POLL_TIME_TEST = 1000 * 10 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    /**
     * Necessary Data
     *  */ 
    // // CLINICAL
    const clinicalStatus = useSelector(getClinicalStatus)
    const clinicalSyncStatus = useSelector(getClinicalSyncStatus)
    // const clinicalList = useSelector(getClinicalList)

    // clinical
    useEffect(() => {
        console.log('Active Interval Clinical Timer');
        const clinicalTimer = setInterval(() => {
            if (clinicalStatus !== 'loading' && clinicalSyncStatus !== 'loading') {
                dispatch(syncClinical())
            }
        }, POLL_TIME)

        return () => clearInterval(clinicalTimer)
    }, [])

    return (
        <></>
    )
}

export default ClinicalSynchronizer