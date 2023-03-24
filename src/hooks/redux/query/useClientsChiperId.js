import { useMemo } from "react";
import { useParams } from "react-router-dom";

// hooks
import useClients from "../useClients";
import useEvents from "../useEvents";
import useInvoicesData from "../useInvoicesData";
import useJournals from "../useJournals";
import useUsers from "../useUsers";

const useClientsChiperId = () => {
    const { clientsChiperID } = useParams()
    // console.log(clientsChiperID);
    // const decodedClientsChiperID = decodeURIComponent(clientsChiperID)

    const {clients} = useClients() // ByData(clientsData)

    const currentClient = useMemo(() => {
        if (clientsChiperID !== undefined) {
            const clientFind = clients.find(client => { // console.log(client.chiperId); console.log(clientsChiperID);
                return String(client.chiperId) === String(clientsChiperID)
            }) // console.log(clientFind);

            return clientFind
        }
    }, [clientsChiperID, clients])

    const {data: allInvoices} = useInvoicesData()
    const clientsInvoice = useMemo(() => {
        return allInvoices?.filter(item => Number(item?.clientId) === Number(currentClient?.id))
    }, [currentClient, allInvoices])
    // const clientsInvoice = useSelector(state => getInvoiceByClient(state, currentClient))

    const {data: allJournals} = useJournals()
    const clientsJournal = useMemo(() => {
        return allJournals?.filter(item => Number(item?.clientId) === Number(currentClient?.id))
    }, [currentClient, allJournals])
    // const clientsJournal = useSelector(state => selectJournalsByClientID(state, currentClient?.id))
    // // console.log(clientsJournal);

    const {events: allEvents} = useEvents()
    // const clientsAppointments = useSelector(state => selectEventsByClientID(state, currentClient?.id))
    const clientsEvents = useMemo(() => {
        return allEvents?.filter(item => Number(item?.clientId) === Number(currentClient?.id))
    }, [currentClient, allEvents])

    const users = useUsers()

    return {
        client: currentClient,
        clients: clients,
        invoices: clientsInvoice,
        journals: clientsJournal, // clientsJournal,
        events: clientsEvents,
        users: users,
    }
}

export default useClientsChiperId