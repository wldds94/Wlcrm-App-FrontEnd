import React, { useEffect, useMemo, useState } from 'react'

// project import
import ListsItems from 'components/list-view/ListsItems'
import InvoiceFormStepper from 'pages/invoices/common/InvoiceFormStepper'
import InvoicesCard from 'pages/invoices/list/components/InvoicesCard';

// assets
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { HighPriceIcon, LowPriceIcon } from 'assets/font-icons/icons'

// dayjs
import dayjs from 'dayjs'

// utils
import { isDeepEqual } from 'utils/equal';

const InvoicesList = ({
    data = [],
    client = null,
    clients = [],
    clientEditable = true,
    formStep = 0,
    minPrice = 0,
    maxPrice = 100,
}) => {
    console.log('InvoicesList');
    console.log(data);
    const [current, setCurrent] = useState(data)
    useEffect(() => {
        if (!isDeepEqual(current, data)) {
            setCurrent(data)
        }
    }, [data])

    const sortItems = [
        {
            key: "-number",
            icon: <TodayIcon />,
            label: "Dalla più recente",
        },
        {
            key: "number",
            icon: <InsertInvitationIcon />,
            label: "Dalla meno recente",
        },
        {
            key: "-subtotal",
            icon: <HighPriceIcon />,
            label: "Più remunerativa",
        },
        {
            key: "subtotal",
            icon: <LowPriceIcon />,
            label: "Meno remunerativa",
        },
    ]

    /**
     * FILTERS
     */
    const [currentFilterUsers, serCurrentFilterUsers] = useState([])
    const [currentFilterStartDate, setCurrentFilterStartDate] = React.useState("")
    const [currentFilterEndDate, setCurrentFilterEndDate] = React.useState("")
    const [currentFilterRangePrice, serCurrentFilterRangePrice] = useState([minPrice, maxPrice])
    useEffect(() => {
        if (!isDeepEqual([minPrice, maxPrice], currentFilterRangePrice)) {
            serCurrentFilterRangePrice([minPrice, maxPrice])
        }
    }, [minPrice, maxPrice])

    const [resettable, setResettable] = useState(checkReset())
    function checkReset() {
        return Boolean(
            !isDeepEqual(currentFilterUsers, []) // JSON.stringify(currentFilterUsers) !== JSON.stringify([])
            || currentFilterStartDate !== ""
            || currentFilterEndDate !== ""
            || !isDeepEqual([minPrice, maxPrice], currentFilterRangePrice)
        )
    }
    useEffect(() => {
        const reset = checkReset()
        console.log(reset);
        if (reset !== resettable) {
            setResettable(reset)
        }
    }, [currentFilterUsers, currentFilterStartDate, currentFilterEndDate, currentFilterRangePrice])
    const resetFilters = () => {
        serCurrentFilterUsers([])
        setCurrentFilterStartDate("")
        setCurrentFilterEndDate("")
        serCurrentFilterRangePrice([minPrice, maxPrice])
    }

    const filters = [
        {
            type: 'divider',
            value: "Per Data",
        },
        {
            key: 'startDate',
            value: currentFilterStartDate,
            type: 'date',
            isSmall: true,
            onChange: (value) => {
                if (value !== currentFilterStartDate) {
                    setCurrentFilterStartDate(value)
                }
            }
        },
        {
            key: 'endDate',
            value: currentFilterEndDate,
            type: 'date',
            isSmall: true,
            onChange: (value) => {
                if (value !== currentFilterEndDate) {
                    setCurrentFilterEndDate(value)
                }
            }
        },
        {
            type: 'divider',
            value: "Per Paziente",
        },
        {
            key: 'clients',
            value: currentFilterUsers,
            type: 'multiple-select',
            label: "Seleziona Paziente",
            options: clients,
            onChange: (value) => {
                console.log(value);
                if (!isDeepEqual(currentFilterUsers, value)) {
                // if (JSON.stringify(value) !== JSON.stringify(currentFilterUsers)) {
                    serCurrentFilterUsers(value)
                }
            }
        },
        {
            type: 'divider',
            value: "Per Prezzo",
        },
        {
            key: 'price',
            value: currentFilterRangePrice,
            type: 'range',
            // label: "Filtre per Subtotale",
            min: 0,
            max: maxPrice,
            onChange: (value) => {
                console.log(value);
                if (!isDeepEqual(currentFilterRangePrice, value)) { // if (JSON.stringify(value) !== JSON.stringify(currentFilterRangePrice)) {
                    serCurrentFilterRangePrice(value)
                }
            }
        },
    ]

    const filterInvoicesList = (list = [], usersList = [], startDate = null, endDate = null, priceRange = []) => {
        console.log(priceRange);
        // return filterDate(filterByUser(list, usersList), startDate, endDate) // filterDate(filterByUser(list, usersList), startDate, endDate)
        return filterPrice(filterDate(filterByUser(list, usersList), startDate, endDate), ...priceRange) // filterDate(filterByUser(list, usersList), startDate, endDate)
    }

    const filterByUser = (list = [], usersList = []) => list.filter(item => {
        if (!usersList.length || !usersList) {
            return true
        }
        return usersList.includes(item.clientId)
    })

    const filterDate = (list = [], startDate = null, endDate = null) => {
        const innerStartDate = startDate === null || !startDate.length ? '0000-01-01' : startDate
        const innerEndDate = endDate === null || !endDate.length ? "3000-01-01" : endDate
        const startSearchDate = dayjs(innerStartDate)
        const endSearchDate = dayjs(innerEndDate)

        return list.filter(item => {
            const eventDate = dayjs(item.endDate)
            return eventDate.isBetween(startSearchDate, endSearchDate) // .isAfter(searchDate)
        })
    }

    const filterPrice = (list = [], startPrice = null, endPrice = null) => {
        return list?.filter((item) => Number(item?.subtotal) >= Number(startPrice) && Number(item?.subtotal) <= Number(endPrice))
    }

    const visibleList = useMemo(() => {
        return filterInvoicesList(current, currentFilterUsers, currentFilterStartDate, currentFilterEndDate, currentFilterRangePrice)
    }, [current, currentFilterUsers, currentFilterStartDate, currentFilterEndDate, currentFilterRangePrice])
    // console.log(visibleList); console.log(current);

    return (
        <>
            {/* <PagePanel padding={true} fullHeight={true} > */}
            <ListsItems
                items={visibleList}
                sortItems={sortItems}
                sortSelected="-number"
                withAddItem={true}
                AddContentCard={() => <InvoiceFormStepper clientId={client?.id} clientEditable={clientEditable} step={formStep} />}
                ContentCard={(props) => <InvoicesCard client={client} {...props} />}
                withFilters={true}
                filters={filters}
                withResetFilter={resettable}
                handleResetFilter={() => resetFilters()}
            />
            {/* </PagePanel> */}

        </>
    )
}

export default InvoicesList