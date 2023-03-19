import React, { useEffect, useMemo, useState } from 'react'

// project import
import ListsItems from 'components/list-view/ListsItems'
import ClientsListCard from '../list/components/ClientsListCard'

// utils
import { isDeepEqual } from 'utils/equal'

// hooks
import useClients from 'hooks/redux/useClients'

const ClientsTrashPage = () => {
    // const deletableClients = useSelector(getAllTrashClients)
    const {trash: deletableClients} = useClients() //  useSelector(getAllTrashClients)
    const [current, setCurrent] = useState(deletableClients)
    useEffect(() => {
        if (!isDeepEqual(current, deletableClients)) {
            setCurrent(deletableClients)
        }
    }, [deletableClients])

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
                items={visibleList}
                // offItems={savingClientsIDs}
                withSearch={true}
                onChangeSearch={handleSearchField}
                ContentCard={(props) => <ClientsListCard {...props} />}
            />
        </>
    )
}

export default ClientsTrashPage