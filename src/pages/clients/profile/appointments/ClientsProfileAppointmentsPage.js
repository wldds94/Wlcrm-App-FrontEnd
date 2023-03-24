import React from 'react'

// project import
import ClientsProfileAppointmentsPanel from './ClientsProfileAppointmentsPanel'

// hooks
import useClientsChiperId from 'hooks/redux/query/useClientsChiperId'


const ClientsProfileAppointmentsPage = () => {
    console.log('ClientsProfilePage');

    const {client, events} = useClientsChiperId()
    
    return (
        <>
            <ClientsProfileAppointmentsPanel
                client={client}
                events={events}
            />
        </>
    )
}

export default ClientsProfileAppointmentsPage