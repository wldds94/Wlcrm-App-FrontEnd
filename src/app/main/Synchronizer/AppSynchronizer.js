import React, { useEffect } from 'react'

// // Store
// import { useSelector, useDispatch } from 'react-redux';
// // Auth
// import { getAuthStatus, selectCurrentToken, tokenValidation } from "store/reducers/auth"; import { cleanClient, fetchClients, getAllClients, getClientsStatus, syncClients } from 'store/reducers/client';
// // slices
// import { fetchInvoices, getAllInvoices, getInvoicesStatus } from 'store/reducers/invoice';
// import { fetchOptions, getOptions, getOptionsStatus } from 'store/reducers/options';
// import { fetchEvents, getCalendarEvents, getCalendarStatus } from 'store/reducers/calendar';
// import { fetchClinical, getClinicalList, getClinicalMessage, getClinicalStatus } from 'store/reducers/clinical';
// import { fetchUsers, getAllUsers, getUsersStatus } from 'store/reducers/user';
// import { fetchMessages, getAllMessages, getChatStatus, syncChat } from 'store/reducers/chat';
// import { fetchShopping, getShoppingList, getShoppingStatus, syncShopping } from 'store/reducers/shopping';

// project import
// import AjaxLoading from 'components/loader/AjaxLoading';
// import SecondaryAjaxLoading from 'components/loader/SecondaryAjaxLoading';
// import Alerts from 'app/main/Alerts/Alerts';
import ChatSynchronizer from './ChatSynchronizer';
import ShoppingSynchronizer from './ShoppingSynchronizer';
import ClientsSynchronizer from './ClientsSynchronizer';
import InvoicesSynchronizer from './InvoicesSynchronizer';
import CompanySynchronizer from './CompanySynchronizer';
import UsersSynchronizer from './UsersSynchronizer';
import ClinicalSynchronizer from './ClinicalSynchronizer';
import CalendarSynchronizer from './CalendarSynchronizer';

const Synchronizer = () => {
    // const POLL_TIME_CHAT = 1000 * 30
    // const POLL_TIME = 1000 * 60 //  30 // 90// 60
    // const POLL_TIME_TEST = 1000 * 10 //  30 // 90// 60
    // // redux
    // const dispatch = useDispatch();

    // /**
    //  * Necessary Data
    //  *  */ 
    // // // AUTH
    // const authStatus = useSelector(getAuthStatus)

    // // // CLIENTS
    // const clientsList = useSelector(getAllClients)
    // const clientsStatus = useSelector(getClientsStatus)
    // // // INOVICES
    // const invoicesStatus = useSelector(getInvoicesStatus)
    // const invoicesList = useSelector(getAllInvoices)
    // // // OPTIONS
    // const optionsStatus = useSelector(getOptionsStatus)
    // const optionsList = useSelector(getOptions)
    // // // CALENDAR - SCHEDULE
    // const calendarStatus = useSelector(getCalendarStatus)
    // const eventsList = useSelector(getCalendarEvents)
    // // // CLINICAL
    // const clinicalStatus = useSelector(getClinicalStatus)
    // const clinicalList = useSelector(getClinicalList)
    // // // USERS
    // const usersStatus = useSelector(getUsersStatus)
    // const usersList = useSelector(getAllUsers)
    // // CHAT
    // const messages = useSelector(getAllMessages)
    // const chatStatus = useSelector(getChatStatus)
    // // // SHOPPING
    // const shoppingStatus = useSelector(getShoppingStatus)
    // const shoppingList = useSelector(getShoppingList)

    // // shopping
    // useEffect(() => {
    //     const shoppingTimer = setInterval(() => {
    //         if (shoppingStatus !== 'loading') {
    //             dispatch(syncShopping())
    //         }
    //     }, POLL_TIME_TEST)

    //     return () => clearInterval(shoppingTimer)
    // }, [shoppingList])

    return (
        <>
            <ClientsSynchronizer />
            <ChatSynchronizer />
            <ShoppingSynchronizer />
            <InvoicesSynchronizer />
            <CompanySynchronizer />
            <UsersSynchronizer />
            <ClinicalSynchronizer />
            <CalendarSynchronizer />
        </>
    )
}

export default Synchronizer