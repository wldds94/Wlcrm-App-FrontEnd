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

// assets
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import {AiOutlineTool} from 'react-icons/ai';


const SettingsRouterPage = () => {
    console.log('SettingsRouterPage');

    const routers = [
        {
            value: "",
            base: '/settings',
            key: 0,
            icon: <AiOutlineTool />,
            label: "Generali",
            hasSubtitle: true,
            useBaseRoute: true,
            titleLabel: "Impostazioni Generali",
            titleDescription: "Informazioni basiche del profilo fiscale a fini della fatturazione",
        },
    ]

    const headerData = {
        text: "Impostazioni",
        AvatarIcon: <MiscellaneousServicesIcon />,
        info: [{}, {
            value: "Impostazioni",
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

export default SettingsRouterPage