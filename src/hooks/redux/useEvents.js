import { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'
// slice
import { getCalendarEvents } from 'store/reducers/calendar';

import useCryptoJS from 'hooks/useCryptoJS';

const useEvents = () => {
    const cryptoJS = useCryptoJS()

    // events
    const eventsData = useSelector(getCalendarEvents); // console.log(data);

    const data = useMemo(() => {
        return eventsData?.map((item, index) => {
            // const defaultItem = withMapping ? { ...mapEventData(item, clients, users, journals, services)} : {...item}
            return {
                ...item,
                title: cryptoJS.decrypt(item?.title),
                notes: cryptoJS.decrypt(item?.notes),
            }
        })
    }, [eventsData])

    return {
        events: data,
        data: data?.filter(item => item.status !== 'trash'),
        trash: data?.filter(item => item.status === 'trash'),
    }
}

export default useEvents