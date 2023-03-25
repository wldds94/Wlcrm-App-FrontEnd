import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getInvoicesStatus, getInvoicesSyncStatus, syncInvoices } from 'store/reducers/invoice';


const InvoicesSynchronizer = () => {
    const POLL_TIME_CHAT = 1000 * 30
    const POLL_TIME = 1000 * 60 //  30 // 90// 60
    const POLL_TIME_TEST = 1000 * 120 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    // // INOVICES
    const invoicesStatus = useSelector(getInvoicesStatus)
    const invoicesSyncStatus = useSelector(getInvoicesSyncStatus)
    // const invoicesList = useSelector(getAllInvoices)

    // invoices
    useEffect(() => {
        // console.log('Active Interval Invoice Timer');
        const invoicesTimer = setInterval(() => {
            if (invoicesStatus !== 'loading' && invoicesSyncStatus !== 'loading') {
                dispatch(syncInvoices())
            }
        }, POLL_TIME_TEST)

        return () => clearInterval(invoicesTimer)
    }, [])

    return (
        <></>
    )
}

export default InvoicesSynchronizer