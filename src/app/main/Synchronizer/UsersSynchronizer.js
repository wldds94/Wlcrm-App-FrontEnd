import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getUsersStatus, getUsersSyncStatus, syncUsers } from 'store/reducers/users';


const UsersSynchronizer = () => {
    const POLL_TIME_CHAT = 1000 * 60
    const POLL_TIME = 1000 * 300 //  30 // 90// 60
    const POLL_TIME_TEST = 1000 * 10 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    /**
     * Necessary Data
     *  */ 
    // // USERS
    const usersStatus = useSelector(getUsersStatus)
    const usersSyncStatus = useSelector(getUsersSyncStatus)
    // const usersList = useSelector(getAllUsers)

    // users
    useEffect(() => {
        console.log('Active Interval Users Timer');
        const usersTimer = setInterval(() => {
            if (usersStatus !== 'loading' && usersSyncStatus !== 'loading') {
                dispatch(syncUsers())
            }
        }, POLL_TIME)

        return () => clearInterval(usersTimer)
    }, [])

    return (
        <></>
    )
}

export default UsersSynchronizer