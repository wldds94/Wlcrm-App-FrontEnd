import React from 'react'

// react-router-dom
import { Outlet } from 'react-router-dom';

// assets
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {IoIosPeople} from 'react-icons/io'
import {AiTwotoneCalendar} from 'react-icons/ai'
import {AiOutlineAppstore} from 'react-icons/ai'

// project import
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout';
import PageWrapper from 'components/page/PageWrapper';
import PageNavWrapper from 'components/page/nav/PageNavWrapper';
import PagePanel from 'components/page/panel/PagePanel';
import PageNav from 'components/page/nav/PageNav';
import PagePanelHeader from 'components/page/panel/header/PagePanelHeader';

// assets
import { ImStatsDots } from 'react-icons/im';

const StatsRouterPage = () => {
    const routers = [
        // {
        //     // value: "",
        //     value: "",
        //     key: 0,
        //     icon: <AiOutlineAppstore />,
        //     label: "Scrivania", // "Anagrafica Paziente",
        //     base: "/management",
        //     hasSubtitle: true,
        //     useBaseRoute: true,
        //     titleLabel: "Gestione",
        //     titleDescription: "Admin Dashboard",

        // },
        {
            value: "",
            base: '/management',
            key: 0,
            icon: <FaFileInvoiceDollar />,
            label: "Fatturazione",
            useBaseRoute: true,
            hasSubtitle: true,
            titleLabel: "Analisi Incasso",
            titleDescription: "Grafici e Trend relativi alla Fatturazione",
        },
        {
            value: "clients",
            base: '/management/',
            key: 1,
            icon: <IoIosPeople />,
            label: "Pazienti",
            hasSubtitle: true,
            titleLabel: "Analisi Pazienti",
            titleDescription: "Grafici e Trend relativi al parco Pazienti",
        },
        {
            value: "events",
            base: '/management/',
            key: 2,
            icon: <AiTwotoneCalendar />,
            label: "Appuntamenti",
            hasSubtitle: true,
            titleLabel: "Analisi Appuntamenti",
            titleDescription: "Grafici e Trend relativi agli Appuntamenti",
        },
        // {
        //     value: "services",
        //     base: '/management/',
        //     key: 4,
        //     icon: <MedicalServicesIcon />,
        //     label: "Servizi",
        //     hasSubtitle: true,
        //     titleLabel: "Analisi Servizi",
        //     titleDescription: "Grafici e Trend relativi ai Servizi",
        // },
    ]

    const headerData = {
        text: "Stats",
        AvatarIcon: <ImStatsDots />,
        info: [{}, {
            value: "Management",
        }]
    }

    return (
        <>
            <PageWrapper>
                <PageNavWrapper>
                    <RouterHeaderLayout data={headerData} />
                    <PageNav routers={routers} />
                </PageNavWrapper>

                <PagePanel>
                    <PagePanelHeader routers={routers} />
                    <Outlet />
                </PagePanel>
            </PageWrapper>
        </>
    )
}

export default StatsRouterPage