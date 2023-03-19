import React, { useEffect, useState } from 'react'

// react-router-dom
import { Outlet } from 'react-router-dom';

// assets
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PercentIcon from '@mui/icons-material/Percent';

// project import
import CompanyHeaderPage from './CompanyHeaderPage';
import PageWrapper from 'components/page/PageWrapper';
import PageNavWrapper from 'components/page/nav/PageNavWrapper';
import PagePanel from 'components/page/panel/PagePanel';
import PageNav from 'components/page/nav/PageNav';
import PagePanelHeader from 'components/page/panel/header/PagePanelHeader';

const CompanyRouterPage = () => {
    console.log('CompanyRouterPage');
    // router
    // const location = useLocation()
    const routers = [
        {
            value: "",
            base: '/company',
            key: 0,
            icon: <AdminPanelSettingsIcon />,
            label: "Profilo Fiscale",
            useBaseRoute: true,
            hasSubtitle: true,
            titleLabel: "Profilo Fiscale",
            titleDescription: "Informazioni basiche del profilo fiscale a fini della fatturazione",
        },
        {
            value: "banks",
            base: '/company/',
            key: 1,
            icon: <AccountBalanceIcon />,
            label: "Istituti Bancari",
            hasSubtitle: true,
            titleLabel: "Istituti Bancari",
            titleDescription: "Istituti Bancari del profilo fiscale a fini della fatturazione",
        },
        {
            value: "iva",
            base: '/company/',
            key: 2,
            icon: <PercentIcon />,
            label: "Base IVA",
            hasSubtitle: true,
            titleLabel: "Base IVA",
            titleDescription: "Tabella Base IVA usate per la fatturazione",
        },
        {
            value: "services",
            base: '/company/',
            key: 3,
            icon: <MedicalServicesIcon />,
            label: "Servizi",
            hasSubtitle: true,
            titleLabel: "Servizi / Prestazioni",
            titleDescription: "Lista dei servizi o delle prestazioni usati per la fatturazione o per registrare gli appuntamenti",
        },
    ]

    return (
        <>
            <PageWrapper>
                <PageNavWrapper>
                    <CompanyHeaderPage />
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

export default CompanyRouterPage