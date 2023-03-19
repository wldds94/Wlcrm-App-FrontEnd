import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// Auth
import { getAuthStatus } from "store/reducers/auth";
// slices
import { fetchUsers, getAllUsers, getUsersStatus } from 'store/reducers/users';
import { fetchOptions, getOptions, getOptionsStatus } from 'store/reducers/options';
import { fetchClients, getAllClients, getClientsStatus } from 'store/reducers/client';
// import { fetchInvoices, getAllInvoices, getInvoicesStatus } from 'store/reducers/invoice';
// import { fetchEvents, getCalendarEvents, getCalendarStatus } from 'store/reducers/calendar';
// import { fetchClinical, getClinicalList, getClinicalStatus } from 'store/reducers/clinical';
import { fetchMessages, getAllMessages, getChatStatus } from 'store/reducers/chat';
// import { fetchShopping, getShoppingList, getShoppingStatus } from 'store/reducers/shopping';

// project import
import AjaxLoading from 'components/loader/AjaxLoading';
import SecondaryAjaxLoading from 'components/loader/SecondaryAjaxLoading';
import Alerts from 'app/main/Alerts/Alerts';


const Dispatcher = ({ children, ...others }) => {
    const POLL_TIME_CHAT = 1000 * 30
    const POLL_TIME = 1000 * 60 //  30 // 90// 60
    const POLL_TIME_TEST = 1000 * 10 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    /**
     * Necessary Data
     *  */
    // // AUTH
    const authStatus = useSelector(getAuthStatus)

    // // USERS
    const usersStatus = useSelector(getUsersStatus)
    const usersList = useSelector(getAllUsers)
    // // OPTIONS
    const optionsStatus = useSelector(getOptionsStatus)
    const optionsList = useSelector(getOptions)
    // // CLIENTS
    const clientsList = useSelector(getAllClients)
    const clientsStatus = useSelector(getClientsStatus)
    // // // INOVICES
    // const invoicesStatus = useSelector(getInvoicesStatus)
    // const invoicesList = useSelector(getAllInvoices)
    // // // CALENDAR - SCHEDULE
    // const calendarStatus = useSelector(getCalendarStatus)
    // const eventsList = useSelector(getCalendarEvents)
    // // // CLINICAL
    // const clinicalStatus = useSelector(getClinicalStatus)
    // const clinicalList = useSelector(getClinicalList)
    // // CHAT
    const messages = useSelector(getAllMessages)
    const chatStatus = useSelector(getChatStatus)
    // // // SHOPPING
    // const shoppingStatus = useSelector(getShoppingStatus)
    // const shoppingList = useSelector(getShoppingList)

    /**
     * LOAD DATA
     */
    useEffect(() => {
        // console.log('AuthStatus Changed');
        if (authStatus === 'succeeded') {
            console.log('authStatus: ' + authStatus);

            // console.log(usersList);
            if (usersList === null || usersList === undefined) {
                dispatch(fetchUsers())
            }

            // console.log(optionsList);
            if (optionsList === null || optionsList === undefined /* || !clientsList?.length */) {
                dispatch(fetchOptions())
            }

            // console.log(clientsList);
            if (clientsList === null /* || !clientsList?.length */) {
                dispatch(fetchClients())
            }

            // // console.log(eventsList);
            // if (eventsList === null || eventsList === undefined) {
            //     dispatch(fetchEvents())
            // }

            // // console.log(clinicalList);
            // if (clinicalList === null || clinicalList === undefined) {
            //     dispatch(fetchClinical())
            // }

            // // console.log(invoicesList);
            // if (invoicesList === null || invoicesList === undefined) {
            //     dispatch(fetchInvoices())
            // }

            // console.log(messages);
            if (messages === null || messages === undefined) {
                dispatch(fetchMessages())
            }

            // // console.log(shoppingList);
            // if (shoppingList === null || shoppingList === undefined) {
            //     dispatch(fetchShopping())
            // }
        }

    }, [authStatus/* , dispatch */])

    const isLoadingAjax = usersStatus === 'loading'
        || optionsStatus === 'loading'
        || clientsStatus === 'loading'
        // || invoicesStatus === 'loading'
        // || calendarStatus === 'loading'
        // || clinicalStatus === 'loading'
        // CHAT -> CUSTOM

    const hasInitialized = usersList != null
        && optionsList !== null
        && clientsList !== null
        // && eventsList != null
        // && invoicesList != null
        // && shoppingList != null
        // && clinicalList != null
        && messages != null


    return (
        <>
            <div style={{
                width: 'auto',
                position: 'fixed',
                top: '5rem',
                right: '2.1rem',
                zIndex: '99999999',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Alerts />
                {(isLoadingAjax && hasInitialized) && <SecondaryAjaxLoading />}
            </div>
            {(isLoadingAjax && !hasInitialized) && <AjaxLoading />}
            {hasInitialized && children}
        </>
    )
}

export default Dispatcher