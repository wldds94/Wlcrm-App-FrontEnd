import React, { useEffect, useMemo, useState } from 'react'

// project import
import ListsItems from 'components/list-view/ListsItems'
import ClientsListCard from './components/ClientsListCard'

// icons
import { AZSortingIcon, SortArrowDown, SortArrowUp, ZASortingIcon } from 'assets/font-icons/icons'

// hooks
import useClients from 'hooks/redux/useClients'

// utils
import { isDeepEqual } from 'utils/equal'
import ClientForm from '../common/ClientForm'

const ClientsListPage = () => {
    console.log('ClientsListPage');
    // const clients = useSelector(getAllClients)
    // const workableClients = useSelector(getAllWorkableClients)
    const {workable: workableClients} = useClients()

    const [current, setCurrent] = useState(workableClients)
    useEffect(() => {
        if (!isDeepEqual(current, workableClients)) {
            setCurrent(workableClients)
        }
    }, [workableClients])
    console.log(current);
    // const savingClientsIDs = useSelector(getClientsSavingIDs)
    // console.log(savingClientsIDs);

    const sortItems = [
        {
            key: "last_name",
            icon: <AZSortingIcon />,
            label: "Cognome (A-Z)",
        },
        {
            key: "-last_name",
            icon: <ZASortingIcon />,
            label: "Cognome (Z-A)",
        },
        {
            key: "first_name",
            icon: <AZSortingIcon />,
            label: "Nome (A-Z)",
        },
        {
            key: "-first_name",
            icon: <ZASortingIcon />,
            label: "Nome (Z-A)",
        },
        {
            key: "-birth_date",
            icon: <SortArrowDown />,
            label: "Più giovane",
        },
        {
            key: "birth_date",
            icon: <SortArrowUp />,
            label: "Meno giovane",
        },
    ]

    const filterItems = [
        {
            key: "search",
            value: "",
            label: "Cerca per Nome / Cognome / PIVA",
        },
        {
            key: "birth_date",
            alue: "",
            label: "Cerca per Nome / Cognome / PIVA",
        },
        {
            key: "-birth_date",
            alue: "",
            label: "Cerca per Nome / Cognome / PIVA",
        },
    ]

    const [search, setSearch] = useState("")

    const handleSearchField = (value) => {
        console.log('Handle Search: ' + value);
        if (value !== search) {
            if (value?.length > 2) {
                setSearch(value?.toLowerCase())
            } else if (value?.length === 0) {
                setSearch("")
            }
        }
    }

    const visibleList = useMemo(() => {
        return search?.length > 0 
            ? current?.filter((item) => item?.first_name?.toLowerCase().indexOf(search) > -1 
                || item?.last_name?.toLowerCase().indexOf(search) > -1 )
            : current
    }, [search, current])

    return (
        <>
            <ListsItems
                // items={workableClients}
                items={visibleList}
                sortItems={sortItems}
                sortSelected="last_name"
                // offItems={savingClientsIDs}
                withAddItem={true}
                AddContentCard={() => <ClientForm />}
                // withFilters={true}
                withSearch={true}
                onChangeSearch={handleSearchField}
                ContentCard={(props) => <ClientsListCard {...props} />}
            />
        </>
    )
}

export default ClientsListPage