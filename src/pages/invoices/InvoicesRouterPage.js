import React from 'react'

// react-router-dom
import { Outlet } from 'react-router-dom';

// project import
import PageWrapper from 'components/page/PageWrapper'
import PageNavWrapper from 'components/page/nav/PageNavWrapper'
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout'
import PageNav from 'components/page/nav/PageNav'
import PagePanel from 'components/page/panel/PagePanel'

// icons
import { InvoicesListIcon, NewInvoiceIcon } from 'assets/font-icons/icons'
import {BsCashCoin} from 'react-icons/bs'

export const routers = [
    {
        value: "",
        base: '/invoices',
        key: 0,
        icon: <InvoicesListIcon /* style={{fontSize:"1rem"}} */ />, // Icons.PeopleOutlineIcon,
        label: "Fatture",
        hasSubtitle: true,
        useBaseRoute: true,
        titleLabel: "Le tue Fatture",
        titleDescription: "Lista Fatture anno corrente",
    },
    {
        value: "create",
        base: '/invoices/',
        key: 1,
        icon: <NewInvoiceIcon />,
        label: "Crea Fattura",
        // hasSubtitle: true,
        // titleLabel: "Crea una paziente in Rubrica",
        // titleDescription: "Aggiungi un nuovo paziente alla tua rubrica per poter eseguire tutte le operazioni",
    },
]

const InvoicesRouterPage = () => {

    const headerData = {
        text: "Fatturazione",
        AvatarIcon: <BsCashCoin />,
        info: [{}, {
            value: "Fatturazione",
        }]
    }

    return (
        <>
            <PageWrapper>
                <PageNavWrapper>
                    <RouterHeaderLayout data={headerData} />
                    <PageNav routers={routers} />
                </PageNavWrapper>

                <PagePanel padding={false} >
                    <Outlet />
                </PagePanel>
            </PageWrapper>
        </>
    )
}

export default InvoicesRouterPage