import React from 'react'

// project import
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout'

// redux
import useClientsChiperId from 'hooks/redux/query/useClientsChiperId'


const ClientsProfileHeaderNav = () => {

    const {client} = useClientsChiperId() 

    const headerData = {
        text: client?.name,
        info: [{
            value: client?.name,
        }, {
            value: client?.piva,
        }],
        status: client?.status,
    }

    return (
        <>
            <RouterHeaderLayout
                data={headerData}
            />
        </>
    )
}

export default ClientsProfileHeaderNav