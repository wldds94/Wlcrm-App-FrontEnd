import React, { useEffect, useState } from 'react'

// project import
import ListsItems from 'components/list-view/ListsItems'
import EventForm from 'pages/calendar/components/appointment/EventForm';
import AppointmentCard from 'pages/calendar/common/events/AppointmentCard';

// assets
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { AZSortingIcon, ZASortingIcon } from 'assets/font-icons/icons';

// utils
import { isDeepEqual } from 'utils/equal';

const ClientsProfileAppointmentsPanel = ({
    client,
    events,
    ...other
}) => {
    const [currentClient, setCurrentClient] = useState(client)
    const [currentEvents, setCurrentEvents] = useState(events)
    useEffect(() => {
        if (client?.id !== currentClient?.id) {
            console.log('I have to Update ClientsProfileAppointmentsPanel - client');
            setCurrentClient(client)
        }
        if (!isDeepEqual(events, currentEvents)) {
            console.log('I have to Update ClientsProfileAppointmentsPanel - events');
            setCurrentEvents(events)
        }
    }, [client, events])

    const sortItems = [
        {
            key: "-startDate",
            icon: <TodayIcon />,
            label: "Dal più recente",
            // onClick: () => handleSort("-startDate"),
        },
        {
            key: "startDate",
            icon: <InsertInvitationIcon />,
            label: "Dal meno recente",
            // onClick: () => handleSort("startDate"),
        },
        {
            key: "title",
            icon: <AZSortingIcon />,
            label: "A-Z",
        },
        {
            key: "-title",
            icon: <ZASortingIcon />,
            label: "Z-A",
        },
    ]

    return (
        <>
            <ListsItems
                items={currentEvents}
                sortItems={sortItems}
                sortSelected="-startDate"
                withAddItem={true}
                AddContentCard={() => <EventForm formData={{ clientId: currentClient?.id }} visibleParameters={{ client: false, }} />}
                ContentCard={(props) => <AppointmentCard withClientInfo={false} lightBoxShadow={false} {...props} />}
            />
        </>
    )
}

export default ClientsProfileAppointmentsPanel