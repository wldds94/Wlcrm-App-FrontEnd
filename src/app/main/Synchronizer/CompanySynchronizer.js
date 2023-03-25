import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getOptionsStatus, getOptionsSyncStatus, syncOptions } from 'store/reducers/options';



const CompanySynchronizer = () => {
    const POLL_TIME = 1000 * 120 //  120 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    /**
     * Necessary Data
     *  */ 
    // // // OPTIONS
    const optionsStatus = useSelector(getOptionsStatus)
    const optionsSyncStatus = useSelector(getOptionsSyncStatus)
 
    // options
    useEffect(() => {
        console.log('Active Interval Company Timer');
        const companyTimer = setInterval(() => {
            if (optionsStatus !== 'loading' && optionsSyncStatus !== 'loading') {
                dispatch(syncOptions())
            }
        }, POLL_TIME)

        return () => clearInterval(companyTimer)
    }, [])

    return (
        <></>
    )
}

export default CompanySynchronizer