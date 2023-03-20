import React, { useEffect, useMemo, useState } from 'react'

// Dayjs
import dayjs from 'dayjs' // ES 2015

// project import
import ListsItems from 'components/list-view/ListsItems';
import EventForm from 'pages/calendar/components/appointment/EventForm';
import AppointmentCard from 'pages/calendar/common/events/AppointmentCard';

// assets
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { AZSortingIcon, ZASortingIcon } from 'assets/font-icons/icons';

// utils
import { isDeepEqual } from 'utils/equal';

const ScheduleList = ({
    data = [],
    clients = [],
    users = [],
}) => {
    console.log('InvoicesList');
    console.log(data);
    const [current, setCurrent] = useState(data)
    useEffect(() => {
        if (!isDeepEqual(current, data)) {
            setCurrent(data)
        }
    }, [data])

    /**
     * SORTING
     */
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

    /**
     * FILTERS
     */
    const [currentGroupingUsers, setCurrentGroupingUsers] = React.useState([])
    const [currentGroupingClient, setCurrentGroupingClient] = React.useState([]) // const [currentUser, setCurrentUser] = React.useState([]) // React.useState(0)
    const [currentFilterStartDate, setCurrentFilterStartDate] = React.useState("")
    const [currentFilterEndDate, setCurrentFilterEndDate] = React.useState("")

    const [resettable, setResettable] = useState(checkReset())
    function checkReset() {
        return Boolean(
            !isDeepEqual(currentGroupingUsers, []) // JSON.stringify(currentFilterUsers) !== JSON.stringify([])
            || currentFilterStartDate !== ""
            || currentFilterEndDate !== ""
            || !isDeepEqual(currentGroupingClient, [])
        )
    }
    useEffect(() => {
        const reset = checkReset()
        console.log(reset);
        if (reset !== resettable) {
            setResettable(reset)
        }
    }, [currentGroupingUsers, currentFilterStartDate, currentFilterEndDate, currentGroupingClient])
    const resetFilters = () => {
        setCurrentGroupingUsers([])
        setCurrentFilterStartDate("")
        setCurrentFilterEndDate("")
        setCurrentGroupingClient([])
    }

    const handleDateChange = (value, name) => {
        if (name === "startDate") {
            console.log(value);
            setCurrentFilterStartDate(value)
        }
        if (name === "endDate") {
            console.log(value);
            setCurrentFilterEndDate(value)
        }
    }

    const filters = [
        {
            type: 'divider',
            value: "Per Data",
        },
        {
            key: 'startDate',
            value: currentFilterStartDate,
            type: 'date',
            isSmall: true,
            onChange: (value) => {
                if (value !== currentFilterStartDate) {
                    setCurrentFilterStartDate(value)
                }
            }
        },
        {
            key: 'endDate',
            value: currentFilterEndDate,
            type: 'date',
            isSmall: true,
            onChange: (value) => {
                if (value !== currentFilterEndDate) {
                    setCurrentFilterEndDate(value)
                }
            }
        },
        {
            type: 'divider',
            value: "Filtra per Utente",
        },
        {
            key: 'users',
            value: currentGroupingUsers,
            type: 'multiple-select',
            label: "Seleziona Utente",
            options: users,
            onChange: (value) => {
                console.log(value);
                if (!isDeepEqual(currentGroupingUsers, value)) {
                    setCurrentGroupingUsers(value)
                }
            }
        },
        {
            type: 'divider',
            value: "Per Paziente",
        },
        {
            key: 'clients',
            value: currentGroupingClient,
            type: 'multiple-select',
            label: "Seleziona Paziente",
            options: clients,
            onChange: (value) => {
                console.log(value);
                if (!isDeepEqual(currentGroupingClient, value)) {
                    setCurrentGroupingClient(value)
                }
            }
        },
    ]

    const filterEvents = (events, clientsIDs, startDate, endDate, usersIDs) => {
        const filteredByClient = filterEventsByClient(events, clientsIDs) // console.log(filteredByClient);

        const resFiltered = filterDate(filteredByClient, startDate, endDate) // console.log(resFiltered);
        return filterEventsByUsers(resFiltered, usersIDs)
    }

    const filterDate = (events, startDate = "", endDate = "") => {
        const innerStartDate = startDate === "" ? '0000-01-01' : startDate
        const innerEndDate = endDate === "" ? "3000-01-01" : endDate
        const startSearchDate = dayjs(innerStartDate)
        const endSearchDate = dayjs(innerEndDate)

        return events.filter(event => {
            const eventDate = dayjs(event.endDate)
            return eventDate.isBetween(startSearchDate, endSearchDate) // .isAfter(searchDate)
        })
    }

    const filterEventsByClient = (events, clientsIDs) => events.filter(event => {
        // console.log(users); console.log(usersIDs); console.log(user);
        if (!clientsIDs.length || !clientsIDs) {
            return true
        }
        return clientsIDs.includes(Number(event.clientId))

    });

    const filterEventsByUsers = (events, usersIDs) => events.filter(event => {
        // console.log(users); console.log(usersIDs); console.log(user);
        if (!usersIDs.length || !usersIDs) {
            return true
        }
        return usersIDs.includes(Number(event.userId))

    });

    // VISIBILE DATA TO DISPLAY
    const visibleList = useMemo(() => {
        return filterEvents(current, currentGroupingClient, currentFilterStartDate, currentFilterEndDate, currentGroupingUsers)
    }, [current, currentGroupingUsers, currentGroupingClient, currentFilterStartDate, currentFilterEndDate])

    return (
        <>
            <ListsItems
                items={visibleList}
                sortItems={sortItems}
                sortSelected="-startDate"
                withAddItem={true}
                AddContentCard={() => <EventForm />}
                ContentCard={(props) => <AppointmentCard lightBoxShadow={false} withProfileLink={true} {...props} />}
                withFilters={true}
                filters={filters}
                withResetFilter={resettable}
                handleResetFilter={() => resetFilters()}
                // FilterContent={() => <FiltersForm
                //     users={users}
                //     handleUserChange={handleUserChange}
                //     clients={clients}
                //     handleClientChange={handleClientChange}
                //     handleDateChange={handleDateChange}
                // />}
            />
        </>
    )
}

export default ScheduleList