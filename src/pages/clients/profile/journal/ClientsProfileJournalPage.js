import React, { useEffect, useState } from 'react'

// project import
import ClientsProfileJournalPanel from './ClientsProfileJournalPanel'

// hooks
import useClientsChiperId from 'hooks/redux/query/useClientsChiperId'
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData'

// utils
import { isDeepEqual } from 'utils/equal'

const ClientsProfileJournalPage = () => {

    const { client, journals: data, users, clients } = useClientsChiperId() // console.log(client, journals);
    const { data: events } = useSchedulerData() // console.log(client, journals);
    
    const [current, setCurrent] = useState(data)
    useEffect(() => {
        if (!isDeepEqual(current, data)) {
            setCurrent(data)
        }
    }, [data])

    return (
        <>
            <ClientsProfileJournalPanel
                client={client}
                data={current}
                clients={clients}
                users={users}
                events={events}
            />
        </>
    )
}

export default ClientsProfileJournalPage