import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

// hooks
import useInvoicesData from './../useInvoicesData'

// utils
import { isDeepEqual } from 'utils/equal'

const useInvoicesChiperId = () => {
    const { invoicesChiperID } = useParams()

    const {data: invoices} = useInvoicesData() // useSelector(getAllInvoices)
    // console.log(clients);

    const [invoice, setCurrentInvoice] = useState(null)
    useEffect(() => {
        if (invoicesChiperID !== undefined) {
            const invoiceFind = invoices.find(item => { // console.log(client.chiperId); console.log(chiperID);
                return String(item.chiperId) === String(invoicesChiperID)
            }) // console.log(clientFind);
            if (!isDeepEqual(invoiceFind, invoice)) {
                setCurrentInvoice(invoiceFind)
            }
        }
    }, [invoicesChiperID])


    return {
        invoice: invoice,
        // client: client,
    }
}

export default useInvoicesChiperId