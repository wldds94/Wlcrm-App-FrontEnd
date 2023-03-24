import React, { useEffect, useState } from 'react'

// project import
import JournalsList from 'pages/journal/common/JournalsList';

// icons
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';


const ClientsProfileJournalPanel = ({
    client,
    data,
    users = [],
    clients = [],
    events = [],
    ...other
}) => {
    const [currentClient, setCurrentClient] = useState(client)
    const [currentData, setCurrentData] = useState(data)
    useEffect(() => {
        if (client?.id !== currentClient?.id) {
            console.log('I have to Update ClientsProfileJournalPanel - client');
            setCurrentClient(client)
        }
        if (JSON.stringify(data) !== JSON.stringify(currentData)) {
            console.log('I have to Update ClientsProfileJournalPanel - data');
            setCurrentData(data)
        }
    }, [client, data])

    const sortItems = [
        {
            key: "-startDate",
            icon: <TodayIcon />,
            label: "Dal più recente",
        },
        {
            key: "startDate",
            icon: <InsertInvitationIcon />,
            label: "Dal meno recente",
        },
    ]

    return (
        <>
            <JournalsList
                data={currentData}
                clients={clients}
                users={users}
                events={events}
                withClientsFilter={false}
            />
        </>
    )
}

export default ClientsProfileJournalPanel