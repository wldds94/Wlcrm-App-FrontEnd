import React, { useEffect, useState } from 'react'

// react-router-dom
import { Outlet } from 'react-router-dom';

// project import
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout';
import PageWrapper from 'components/page/PageWrapper';
import PageNavWrapper from 'components/page/nav/PageNavWrapper';
import PageNav from 'components/page/nav/PageNav';
import PagePanel from 'components/page/panel/PagePanel';
import PagePanelHeader from 'components/page/panel/header/PagePanelHeader';

// icons
import { UsersMultiIcon, UsersNew, Delete } from 'assets/font-icons/user';

const ClientsRouterPage = () => {
    console.log('ClientsRouterPage');
    
    const routers = [
        {
            value: "",
            base: '/clients',
            key: 0,
            icon: <UsersMultiIcon /* style={{fontSize:"1rem"}} */ />, // Icons.PeopleOutlineIcon,
            label: "Pazienti",
            hasSubtitle: true,
            useBaseRoute: true,
            titleLabel: "Rubrica Pazienti",
            titleDescription: "Lista pazienti Attivi o Inattivi",
        },
        // {
        //     value: "list",
        //     base: '/clients/',
        //     key: 0,
        //     icon: <UsersMultiIcon /* style={{fontSize:"1rem"}} */ />, // Icons.PeopleOutlineIcon,
        //     label: "Rubrica",
        //     titleLabel: "Rubrica Pazienti",
        //     titleDescription: "Lista pazienti Attivi o Inattivi",
        // },
        {
            value: "trash",
            base: '/clients/',
            key: 1,
            icon: <Delete />,
            label: "Cestino",
            hasSubtitle: true,
            titleLabel: "Cestino della Rubrica",
            titleDescription: "Elimina definitivamente o ripristina per tornare ad eseguire le operazioni",
        },
        {
            value: "create",
            base: '/clients/',
            key: 2,
            icon: <UsersNew />,
            label: "Crea Nuovo",
            hasSubtitle: true,
            titleLabel: "Crea un paziente in Rubrica",
            titleDescription: "Aggiungi un nuovo paziente alla tua rubrica per poter eseguire tutte le operazioni",
        },
    ]

    // // // router
    // const location = useLocation()

    // console.log(findIndexPageByLocationPop(location.pathname, routers));
    // const [router, setRouter] = useState(routers[findIndexPageByLocationPop(location.pathname, routers)])
    // const [lastLocation, setLastLocation] = useState(location.pathname.split('/').pop())
    // // console.log(router);
    // useEffect(() => {
    //     // console.log(clientID);
    //     const last = location.pathname.split('/').pop() // console.log(last);
    //     if (last !== lastLocation) {
    //         setLastLocation(last)
    //     }
    //     const page = routers[findIndexPageByLocationPop(location.pathname, routers)] // console.log(key, value);
    //     const { key, value } = page

    //     if (key !== router?.key) {
    //         setRouter(page)
    //     }
    // }, [location.pathname])

    const headerData = {
        text: "Rubrica",
        AvatarIcon: <UsersMultiIcon />,
        info: [{}, {
            value: "Rubrica",
        }]
    }

    return (
        <>
            <PageWrapper>
                <PageNavWrapper>
                    <RouterHeaderLayout data={headerData} />
                    <PageNav routers={routers} />
                </PageNavWrapper>

                <PagePanel padding={true} >
                    <PagePanelHeader routers={routers} />
                    <Outlet />
                </PagePanel>
            </PageWrapper>
        </>
    )
}

export default ClientsRouterPage