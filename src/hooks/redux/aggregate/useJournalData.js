import { useMemo } from 'react'

// redux
// import { useSelector } from 'react-redux'
// slices
// import { getClinicalList } from 'store/reducers/clinical';

// hooks
import useClients from '../useClients';
// import useCryptoJS from 'hooks/useCryptoJS';
import useUsers from '../useUsers';
import useJournals from '../useJournals';

const useJournalData = () => {
    // const cryptoJS = useCryptoJS()
    
    const {journals} = useJournals() //  useSelector(getClinicalList)
    // const events = useSelector(getCalendarEvents); // console.log(data);
    // const services = useSelector(getOptionsServices) // console.log(services);
    const users = useUsers()
    const {clients} = useClients() // useSelector(selectAllClients)

    const data = useMemo(() => {
        return journals?.map((item, index) => {
            return {
                ...item,
                user: users?.find(row => Number(row?.ID) === Number(item?.userId)),
                client: clients?.find(row => Number(row?.id) === Number(item?.clientId)),
            }
        })
    }, [journals, users, clients])

    return {
        data: data, 
        users: users, 
        clients: clients,
        // events: events,
    }
}

export default useJournalData