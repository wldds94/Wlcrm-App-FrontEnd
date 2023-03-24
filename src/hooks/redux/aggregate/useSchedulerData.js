import { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'
// slice
// import { getCalendarEvents } from 'store/reducers/calendar';
// import { getClinicalList } from 'store/reducers/clinical';
import { getOptionsServices } from 'store/reducers/options';

import useCryptoJS from 'hooks/useCryptoJS';

import useClients from '../useClients';
import useUsers from '../useUsers';
import useEvents from '../useEvents';
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
            const aux = Object.assign({}, item)
            // aux.journals = journals?.filter(row => Number(row?.eventId) === Number(item?.id))
            aux.user = users?.find(row => Number(row?.ID) === Number(item?.userId))
            aux.client = clients?.find(row => Number(row?.id) === Number(item?.clientId))
            aux.service = services ? services?.find(row => Number(row?.id) === Number(item?.serviceId)) : {}
            // return aux
            return {
                ...item,
                ...aux,
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