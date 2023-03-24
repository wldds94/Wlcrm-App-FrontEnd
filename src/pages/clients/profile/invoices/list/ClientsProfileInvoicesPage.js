import React, { useEffect, useState } from 'react'

// project import
import InvoicesList from 'pages/invoices/common/InvoicesList';

// hooks
import useClientsChiperId from 'hooks/redux/query/useClientsChiperId'

// utils
import dynamicSortMultiple from 'utils/array'


const ClientsProfileInvoicesPage = () => {
    console.log('ClientsProfileInvoicesPage');

    const { client, invoices, clients } = useClientsChiperId()

    const [current, setCurrent] = useState(invoices)

    const [currentMin, setCurrentMin] = useState(0)
    const [currentMax, setCurrentMax] = useState(100)

    useEffect(() => {
        if (JSON.stringify(current) !== JSON.stringify(invoices)) {
            setCurrent(invoices)
        }

        const lowest = invoices.sort(dynamicSortMultiple('subtotal'))[0]?.subtotal
        console.log(lowest);
        if (lowest && lowest !== currentMin) {
            setCurrentMin(lowest ? Number(lowest) - 1 : 0)
        } else {

        }
        const highest = invoices.sort(dynamicSortMultiple('-subtotal'))[0]?.subtotal
        if (highest && highest !== currentMax) {
            setCurrentMax(highest ? Number(highest) + 1 : 100)
        }
    }, [invoices])
    
    useEffect(() => {
        
    }, [current])

    return (
        <>
            <InvoicesList
                data={current}
                clients={clients}
                client={client}
                formStep={3}
                minPrice={currentMin}
                maxPrice={currentMax}
            />
        </>
    )
}

export default ClientsProfileInvoicesPage