import React, { useEffect, useMemo, useState } from 'react'

// material ui
import { Box } from '@mui/material'

// project import
import PagePanelHeader from 'components/page/panel/header/PagePanelHeader'
import InvoicesList from '../common/InvoicesList'

// icons
import { routers } from '../InvoicesRouterPage'

// hooks
import useInvoicesData from 'hooks/redux/useInvoicesData'

// utils
import dynamicSortMultiple from 'utils/array'
import { isDeepEqual } from 'utils/equal'

const InvoicesListPage = () => {
    const { data: invoices, users, clients } = useInvoicesData() // console.log(invoices);
    const [current, setCurrent] = useState(invoices)

    const [currentMin, setCurrentMin] = useState(0)
    const [currentMax, setCurrentMax] = useState(100)

    useEffect(() => {
        if (!isDeepEqual(current, invoices)) {
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

    return (
        <>
            <Box sx={{ p: 3 }}>
                <PagePanelHeader routers={[routers[0]]}/*  withPadding={true}  */ />
                <InvoicesList
                    data={current}
                    clients={clients}
                    minPrice={currentMin}
                    maxPrice={currentMax}
                />
                {/* <ListsItems
                    items={visibleList}
                    sortItems={sortItems}
                    sortSelected="-number"
                    withAddItem={true}
                    AddContentCard={() => <InvoiceFormStepper />}
                    ContentCard={(props) => <InvoicesCard {...props} />}
                    withFilters={true}
                    filters={filters}
                    withResetFilter={resettable}
                    handleResetFilter={() => resetFilters()}
                // FilterContent={() => <FilterContent />}
                /> */}
            </Box>

        </>
    )
}

export default InvoicesListPage