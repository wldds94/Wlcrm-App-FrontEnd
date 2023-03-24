import React, { useEffect, useState } from 'react'

// material ui
import { IconButton, Stack } from '@mui/material'

// project import
import ClientsInfoPanel from './components/ClientsInfoPanel'
import ClientForm from 'pages/clients/common/ClientForm'

// icons
import { ClearIcon, EditIcon } from 'assets/font-icons/icons'

// hooks
import useClientsChiperId from 'hooks/redux/query/useClientsChiperId'


const ClientsProfilePage = () => {
    console.log('ClientsProfilePage');

    const {client} = useClientsChiperId()
    // const client = null // useClientsChiperId()

    const [clientEditable, setClientEditable] = useState(false)

    return (
        <>
            <Stack direction="row" justifyContent="end" alignItems="center" >
                {!clientEditable && <IconButton onClick={() => setClientEditable(true)} >
                    <EditIcon />
                </IconButton>}
                {clientEditable && <IconButton onClick={() => setClientEditable(false)} >
                    <ClearIcon />
                </IconButton>}
            </Stack>
            {!clientEditable && <ClientsInfoPanel client={client} />}
            {(client !== null && clientEditable) && <ClientForm formData={client} editable={clientEditable} />}
        </>
    )
}

export default ClientsProfilePage