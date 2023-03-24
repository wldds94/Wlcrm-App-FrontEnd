import React, { useEffect, useState } from 'react'

// react-router-dom
import { Outlet, useLocation, useParams } from 'react-router-dom'

// project import
import PageWrapper from 'components/page/PageWrapper'
import PageNav from 'components/page/nav/PageNav'
import PageNavWrapper from 'components/page/nav/PageNavWrapper'
import ClientsProfileHeaderNav from './common/ClientsProfileHeaderNav'
import PagePanel from 'components/page/panel/PagePanel'
import PagePanelHeader from 'components/page/panel/header/PagePanelHeader'
import BackPanelLink from 'components/page/back/BackPanelLink'

// icons
import { AvatarUserIcon, InvoiceListIcon, NotesListIcon, OpenBookIcon } from 'assets/font-icons/icons'
import {AiOutlineAppstore} from 'react-icons/ai'

// utils
import { findIndexPageByLocationPop } from 'utils/app/router'

const ClientsProfileRouterPage = () => {
    console.log('ClientsProfileRouterPage');
    const { clientsChiperID } = useParams()

    const routers = [
        {
            // value: "",
            value: "",
            key: 0,
            icon: <AiOutlineAppstore />,
            label: "Scrivania", // "Anagrafica Paziente",
            base: "/clients/profile/" + clientsChiperID,
            hasSubtitle: true,
            useBaseRoute: true,
            titleLabel: "Anagrafica Paziente",
            titleDescription: "Informazioni basiche del Paziente",

        },
        {
            // value: "",
            value: "view",
            key: 1,
            icon: <AvatarUserIcon />,
            label: "Anagrafica", // "Anagrafica Paziente",
            base: "/clients/profile/" + clientsChiperID + "/",
            hasSubtitle: true,
            titleLabel: "Anagrafica Paziente",
            titleDescription: "Informazioni basiche del Paziente",

        },
        {
            value: "appointment",
            key: 2,
            icon: <NotesListIcon />,
            label: "Appuntamenti",
            base: "/clients/profile/" + clientsChiperID + "/",
            hasSubtitle: true,
            titleLabel: "Appuntamenti",
            titleDescription: "Riepilogo Appuntamenti del Paziente",
        },
        {
            value: "journal",
            key: 3,
            icon: <OpenBookIcon />,
            label: "Diario Clinico",
            base: "/clients/profile/" + clientsChiperID + "/",
            hasSubtitle: true,
            titleLabel: "Diario Clinico",
            titleDescription: "Riepilogo Paziente",
        },
        {
            value: "fatture",
            key: 4,
            icon: <InvoiceListIcon />,
            label: "Fatturazione", // "Riepilogo Fatture",
            base: "/clients/profile/" + clientsChiperID + "/",
            hasSubtitle: true,
            titleLabel: "Fatturazione",
            titleDescription: "Riepilogo Fatture del Paziente",
        },
    ]

    // // router
    const location = useLocation()

    // // const [router, setRouter] = useState(findIndexPage(location.pathname.split('/').pop(), routers))
    const [router, setRouter] = useState(routers[findIndexPageByLocationPop(location.pathname, routers)])
    const [lastLocation, setLastLocation] = useState(location.pathname.split('/').pop())
    // console.log(router);
    useEffect(() => {
        // console.log(clientID);
        const last = location.pathname.split('/').pop() // console.log(last);
        if (last !== lastLocation) {
            setLastLocation(last)
        }
        const page = routers[findIndexPageByLocationPop(location.pathname, routers)] // console.log(key, value);
        const { key, value } = page

        if (key !== router?.key) {
            setRouter(page)
        }
    }, [location.pathname])

    return (
        <>
            <PageWrapper>
                <PageNavWrapper>
                    <ClientsProfileHeaderNav />
                    <PageNav routers={routers} />

                </PageNavWrapper>
                <PagePanel /* routers={routers} */ padding={router?.hasSubtitle && lastLocation === router?.value} /* fullHeight={router?.hasSubtitle ? router?.hasSubtitle : false} */ >
                    {lastLocation === router?.value && <PagePanelHeader routers={routers} />}
                    <Outlet /* context={[routers]}  *//>
                </PagePanel>
                <BackPanelLink url='/clients' label='Rubrica' />
            </PageWrapper>

        </>
    )
}

export default ClientsProfileRouterPage