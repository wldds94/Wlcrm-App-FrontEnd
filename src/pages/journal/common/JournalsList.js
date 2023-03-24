import React, { useEffect, useMemo, useState } from 'react'

// project import
import ListsItems from 'components/list-view/ListsItems'

// utils
import dynamicSortMultiple from 'utils/array'
import { isDeepEqual } from 'utils/equal';

// dayjs
import dayjs from 'dayjs'

// assets
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

// hooks
import ClinicalJournalForm from 'pages/journal/common/ClinicalJournalForm';
import JournalCard from 'pages/journal/common/card/JournalCard';

const JournalsList = ({
    data = [],
    clients = [],
    users = [],
    events = [],
    withClientsFilter = true,
    withClientInfo = true,
    withClientProfileLink = false,
}) => {
    const [current, setCurrent] = useState(data)
    useEffect(() => {
        if (!isDeepEqual(current, data)) {
            setCurrent(data)
        }
    }, [data])

    const sortItems = [
        {
            key: "-startDate",
            icon: <TodayIcon />,
            label: "Dalla più recente",
        },
        {
            key: "startDate",
            icon: <InsertInvitationIcon />,
            label: "Dalla meno recente",
        },
    ]

    // const { data, users, clients } = useJournalData() // console.log(client, journals);
    // const { data: events } = useSchedulerData() // console.log(client, journals);

    /**
     * FILTERS
     */
    const [currentFilterUsers, serCurrentFilterUsers] = useState([])
    const [currentFilterClients, serCurrentFilterClients] = useState([])
    const [currentFilterStartDate, setCurrentFilterStartDate] = React.useState("")
    const [currentFilterEndDate, setCurrentFilterEndDate] = React.useState("")
  
    const [resettable, setResettable] = useState(checkReset())
    function checkReset() {
        return Boolean(
            !isDeepEqual(currentFilterUsers, []) // JSON.stringify(currentFilterUsers) !== JSON.stringify([])
            || !isDeepEqual([], currentFilterClients)
            || currentFilterStartDate !== ""
            || currentFilterEndDate !== ""
        )
    }
    useEffect(() => {
        const reset = checkReset()
        console.log(reset);
        if (reset !== resettable) {
            setResettable(reset)
        }
    }, [currentFilterUsers, currentFilterStartDate, currentFilterEndDate, currentFilterClients])
    const resetFilters = () => {
        serCurrentFilterUsers([])
        setCurrentFilterStartDate("")
        setCurrentFilterEndDate("")
        serCurrentFilterClients([])
    }

    const clientsFilter = withClientsFilter ? [
        {
            type: 'divider',
            value: "Per Paziente",
        },
        {
            key: 'clients',
            value: currentFilterClients,
            type: 'multiple-select',
            label: "Seleziona Paziente",
            options: clients.sort(dynamicSortMultiple('last_name')),
            onChange: (value) => {
                console.log(value);
                if (!isDeepEqual(currentFilterClients, value)) {
                // if (JSON.stringify(value) !== JSON.stringify(currentFilterUsers)) {
                    serCurrentFilterClients(value)
                }
            }
        },
    ] : []

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
        ...clientsFilter,
        {
            type: 'divider',
            value: "Per Operatore",
        },
        {
            key: 'clients',
            value: currentFilterUsers,
            type: 'multiple-select',
            label: "Seleziona Operatore",
            options: users, // .sort(dynamicSortMultiple('first_name')),
            onChange: (value) => {
                console.log(value);
                if (!isDeepEqual(currentFilterUsers, value)) {
                // if (JSON.stringify(value) !== JSON.stringify(currentFilterUsers)) {
                    serCurrentFilterUsers(value)
                }
            }
        },
    ]

    const filterJournalsList = (list = [], usersList = [], startDate = null, endDate = null, clientsList = []) => {
        // return filterDate(filterByUser(list, usersList), startDate, endDate) // filterDate(filterByUser(list, usersList), startDate, endDate)
        return filterByClients(filterDate(filterByUser(list, usersList), startDate, endDate), clientsList) // filterDate(filterByUser(list, usersList), startDate, endDate)
    }

    const filterByClients = (list = [], clientsList = []) => list.filter(item => {
        if (!clientsList.length || !clientsList) {
            return true
        }
        return clientsList.includes(item.clientId)
    })

    const filterByUser = (list = [], usersList = []) => list.filter(item => {
        if (!usersList.length || !usersList) {
            return true
        }
        return usersList.includes(item.userId)
    })

    const filterDate = (list = [], startDate = null, endDate = null) => {
        const innerStartDate = startDate === null || !startDate.length ? '0000-01-01' : startDate
        const innerEndDate = endDate === null || !endDate.length ? "3000-01-01" : endDate
        const startSearchDate = dayjs(innerStartDate)
        const endSearchDate = dayjs(innerEndDate)

        return list.filter(item => {
            const eventDate = dayjs(item.endDate)
            return eventDate.isBetween(startSearchDate, endSearchDate) // .isAfter(searchDate)
        })
    }

    const visibleList = useMemo(() => {
        return filterJournalsList(current, currentFilterUsers, currentFilterStartDate, currentFilterEndDate, currentFilterClients)
    }, [current, currentFilterUsers, currentFilterStartDate, currentFilterEndDate, currentFilterClients])

    return (
        <ListsItems
            items={visibleList}
            sortItems={sortItems}
            sortSelected="-startDate"
            withAddItem={true}
            AddContentCard={() => <ClinicalJournalForm withClientField={true} events={events} />}
            ContentCard={(props) => <JournalCard withClientInfo={withClientInfo} withClientProfileLink={withClientProfileLink} {...props} />}
            withFilters={true}
            filters={filters}
            withResetFilter={resettable}
            handleResetFilter={() => resetFilters()}
        />
    )
}

export default JournalsList