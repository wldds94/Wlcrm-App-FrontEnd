import React, { useEffect, useState } from 'react'

// project import
import ClientsInvoiceNavigation from '../common/ClientsInvoiceNavigation'
import HeaderInvoicePreview from './components/HeaderInvoicePreview'
import InvoicePreview from 'pages/invoices/preview/InvoicePreview'
import PageTab from 'components/page-tab/PageTab'

const ClientsProfileInvoicesPreviewPanel = ({
    item,
    client,
    itemsList,
    ...other
}) => {
    console.log(item);
    const [currentList, setCurrentList] = useState(itemsList)
    useEffect(() => {
        // const newItem = invoicesList?.find(el => el.chiperId === resourceID)
        if (JSON.stringify(itemsList) !== JSON.stringify(currentList)) {
            setCurrentList(itemsList)
        }
    }, [itemsList])

    const [currentItem, setCurrentItem] = useState(item)
    useEffect(() => {
        // const newItem = invoicesList?.find(el => el.chiperId === resourceID)
        if (item?.id !== currentItem?.id) {
            setCurrentItem(item)
        }
    }, [item])

    const [currentClient, setCurrentClient] = useState(client)
    useEffect(() => {
        if (client?.id !== currentClient?.id) {
            setCurrentClient(client)
        }
    }, [client])
    console.log(currentClient, currentItem, currentList);

    const HeaderComponent = () => <HeaderInvoicePreview
        item={currentItem}
        client={currentClient}
    />

    return (
        <>
            {(currentClient && currentItem && currentList)
                && <PageTab
                    HeaderComponent={HeaderComponent}
                    FooterComponent={() => (
                        <ClientsInvoiceNavigation
                            item={currentItem}
                            client={currentClient}
                            itemsList={currentList}
                            servicePath="/fatture/"
                            navPath="/edit"
                        />
                    )}
                >
                    {/* <ClientsInvoiceSubTab
                item={currentItem}
                client={currentClient}
                itemsList={currentList}
                HeaderComponent={HeaderInvoicePreview}
                FooterComponent={() => (
                    <ClientsInvoiceNavigation
                        item={currentItem}
                        client={currentClient}
                        itemsList={currentList}
                        servicePath="/fatture/"
                        navPath="/preview"
                    />
                )}
            > */}
                    <InvoicePreview
                        invoiceData={item}
                        withBackgroundColor={true}
                    />
                    {/* </ClientsInvoiceSubTab> */}
                </PageTab>
            }
        </>
    )
}

export default ClientsProfileInvoicesPreviewPanel