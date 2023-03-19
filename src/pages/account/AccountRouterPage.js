import React from 'react'

// react-router-dom
import { Outlet } from 'react-router-dom'

// project import
import AccountHeaderPage from './AccountHeaderPage';
import PageWrapper from 'components/page/PageWrapper';
import PageNavWrapper from 'components/page/nav/PageNavWrapper';
import PageNav from 'components/page/nav/PageNav';
import PagePanel from 'components/page/panel/PagePanel';
import PagePanelHeader from 'components/page/panel/header/PagePanelHeader';

// assets
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {AiOutlineAppstore} from 'react-icons/ai'

const AccountRouterPage = () => {
    // routers MENU
    const routers = [
        {
            value: "",
            base: '/account',
            key: 0,
            icon: <AiOutlineAppstore />,
            label: "Dashboard",
            hasSubtitle: true,
            useBaseRoute: true,
            titleLabel: "Panoramica",
            titleDescription: "Monitora il tuo account",
        },
        {
            value: "profile",
            base: '/account/',
            key: 1,
            icon: <PersonPinIcon />,
            label: "Il mio Profilo",
            hasSubtitle: true,
            titleLabel: "Informazioni Personali",
            titleDescription: "Informazioni basiche per l'applicazione, come nome/cognome, contatti ed indirizzo",
        },
        {
            value: "activities",
            base: '/account/',
            key: 2,
            icon: <AccountTreeIcon />,
            label: "Account Activity",
            hasSubtitle: true,
            titleLabel: "Attività Account",
            titleDescription: "Controlla le tue attività attraverso le sessioni e/o disconnetti",
        },
        {
            value: "privacy",
            base: '/account/',
            key: 3,
            icon: <VerifiedUserIcon />,
            label: "Privacy", // "Sicurezza",
            hasSubtitle: true,
            titleLabel: "Privacy & Sicurezza",
            titleDescription: "Gestisci le tue informazioni relative alla sicurezza ed alla tua Privacy",
        },
    ]

    return (
        <>
            <PageWrapper>
                <PageNavWrapper>
                    <AccountHeaderPage />
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

export default AccountRouterPage