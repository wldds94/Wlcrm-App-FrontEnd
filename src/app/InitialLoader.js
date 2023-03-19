import React, { useEffect } from 'react'

// react-redux
import { useSelector } from 'react-redux'
// slices
import { getAuthvalidateStatus } from 'store/reducers/auth'
import { getUsersStatus } from 'store/reducers/users';
// import { getClientsStatus } from 'store/reducers/client';
// import { getOptionsStatus } from 'store/reducers/options';
// import { getInvoicesStatus } from 'store/reducers/invoice';
// import { getCalendarStatus } from 'store/reducers/calendar';
// import { getClinicalStatus } from 'store/reducers/clinical';
// import { getChatStatus } from 'store/reducers/chat';
// import { getShoppingStatus } from 'store/reducers/shopping';

// assets
import CircularProgress from '@mui/material/CircularProgress';

const InitialLoader = ({ children, ...other }) => {
    const tokenValidationStatus = useSelector(getAuthvalidateStatus)

    // // USERS
    const usersStatus = useSelector(getUsersStatus)
    // // // CLIENTS
    // const clientsStatus = useSelector(getClientsStatus)
    // // // OPTIONS
    // const optionsStatus = useSelector(getOptionsStatus)
    // // // INOVICES
    // const invoicesStatus = useSelector(getInvoicesStatus)
    // // // CALENDAR - SCHEDULE
    // const calendarStatus = useSelector(getCalendarStatus)
    // // // CLINICAL
    // const clinicalStatus = useSelector(getClinicalStatus)
    // // // CHAT
    // const chatStatus = useSelector(getChatStatus)
    // // // SHOPPING
    // const shoppingStatus = useSelector(getShoppingStatus)

    const haveToInitialize = usersStatus === 'idle'
        // || clientsStatus === 'idle'
        // || invoicesStatus === 'idle'
        // || optionsStatus === 'idle'
        // || calendarStatus === 'idle'
        // || clinicalStatus === 'idle'
        // || chatStatus === 'idle'
        // || shoppingStatus === 'idle'

    return (
        <>
            {(tokenValidationStatus === "loading" && haveToInitialize) && (
                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                }}>
                    <CircularProgress />
                </div>
            )}

            {children}
        </>
    )
}

export default InitialLoader