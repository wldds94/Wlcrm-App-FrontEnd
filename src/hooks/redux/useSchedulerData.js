import React, { useEffect, useMemo, useState } from 'react'

// redux
import { useSelector } from 'react-redux'
// slice
// import { getCalendarEvents } from 'store/reducers/calendar';
// import { getClinicalList } from 'store/reducers/clinical';
import { getOptionsServices } from 'store/reducers/options';

import useCryptoJS from 'hooks/useCryptoJS';

import useClients from './useClients';
import useUsers from './useUsers';
import useEvents from './useEvents';
// import useJournalData from './useJournalData';

// utils

const useSchedulerData = (withMapping = true) => {
    const cryptoJS = useCryptoJS()

    // events
    const {events: eventsData} = useEvents() // useSelector(getCalendarEvents); // console.log(data);

    const services = useSelector(getOptionsServices) // console.log(services);

    // filters - grouping
    const users = useUsers() // useSelector(getAllUsersEvents) // console.log(users);
    const {clients} = useClients() // useSelector(selectAllClients)

    const data = useMemo(() => {
        return eventsData?.map((item, index) => {
            // const defaultItem = withMapping ? { ...mapEventData(item, clients, users, journals, services)} : {...item}
            return {
                ...item,
                title: cryptoJS.decrypt(item?.title),
                notes: cryptoJS.decrypt(item?.notes),
            }
        })
    }, [eventsData, users, clients, services])

    return {
        events: data,
        data: data?.filter(item => item.status !== 'trash'),
        trash: data?.filter(item => item.status === 'trash'),
        users: users, 
        clients: clients, 
    }
}

export default useSchedulerData