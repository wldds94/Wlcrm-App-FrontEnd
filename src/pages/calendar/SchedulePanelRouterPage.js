import React from 'react'

// react-router-dom
import { Outlet } from 'react-router-dom';

// material ui
import { Stack } from '@mui/material';

// project import
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout';
import PageWrapper from 'components/page/PageWrapper';
import PageNavWrapper from 'components/page/nav/PageNavWrapper';
import PageNav from 'components/page/nav/PageNav';
import PagePanel from 'components/page/panel/PagePanel';
import PagePanelHeader from 'components/page/panel/header/PagePanelHeader';
import SwitchModeButton from './common/SwitchModeButton';

// icons
import { Delete } from 'assets/font-icons/user';
import EventIcon from '@mui/icons-material/Event';

const SchedulePanelRouterPage = () => {
    const routers = [
        {
            value: "",
            base: '/schedule',
            key: 0,
            icon: <EventIcon /* style={{fontSize:"1rem"}} */ />, // Icons.PeopleOutlineIcon,
            label: "Appuntamenti",
            hasSubtitle: true,
            useBaseRoute: true,
            titleLabel: "Storico Appuntamenti",
            titleDescription: "Lista appuntamenti",
        },
        {
            value: "trash",
            base: '/schedule/',
            key: 1,
            icon: <Delete />,
            label: "Cestino",
            hasSubtitle: true,
            titleLabel: "Cestino Calendario",
            titleDescription: "Elimina definitivamente o ripristina per tornare ad eseguire le operazioni",
        },
    ]

    const headerData = {
        text: "L",
        AvatarIcon: <EventIcon />,
        info: [{}, {
            value: "Calendario",
        }]
    }

    return (
        <PageWrapper>
            <PageNavWrapper>
                <RouterHeaderLayout data={headerData} />
                <PageNav routers={routers} />
            </PageNavWrapper>

            <PagePanel /* routers={routers} */ padding={true} /* fullHeight={router?.hasSubtitle ? router?.hasSubtitle : false} */ >
                <PagePanelHeader routers={routers} />
                <Outlet />
                <Stack direction="column-reverse" spacing={1} sx={{
                    position: "fixed", // "absolute",
                    bottom: '1rem',
                    right: '1rem',
                    alignItems: 'center',
                    // transition: "all 1320ms ease-in",
                }}>
                    <SwitchModeButton mode="calendar" />
                </Stack>
            </PagePanel>
        </PageWrapper>
    )
}

export default SchedulePanelRouterPage