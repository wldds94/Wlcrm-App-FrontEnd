import React from 'react'

// project import
import ClientsProfileInvoicesPreviewPanel from './ClientsProfileInvoicesPreviewPanel'

// hooks
import useClientsChiperId from 'hooks/redux/query/useClientsChiperId'
import useInvoicesChiperId from 'hooks/redux/query/useInvoicesChiperId'

const ClientsProfileInvoicesPreviewPage = () => {

    const {client, invoices} = useClientsChiperId()
    console.log(client, invoices);
    const {invoice} = useInvoicesChiperId()
    console.log(invoice);


    return (
        <>
            <ClientsProfileInvoicesPreviewPanel
                client={client}
                item={invoice}
                itemsList={invoices/* ?.filter(el => el.clientId === chiperID) */}
            />
        </>
    )
}

export default ClientsProfileInvoicesPreviewPage