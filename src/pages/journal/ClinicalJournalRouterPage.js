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
import { BsJournalBookmarkFill } from 'react-icons/bs'

const ClinicalJournalRouterPage = () => {
    // routers MENU
    const routers = [
        {
            value: "",
            base: '/clinical',
            key: 0,
            icon: <></>,
            label: "Diario Clinico",
            hasSubtitle: true,
            useBaseRoute: true,
            titleLabel: "Diario Clinico",
            titleDescription: "Storico Diario Clinico completo",
        },
        {
            value: "",
            base: '/clinical',
            // key: 0,
            icon: <></>,
            label: "Diario Clinico",
            hasSubtitle: true,
            titleLabel: "Diario Clinico",
            titleDescription: "Storico Diario Clinico",
            visible: false,
        },
    ]

    const headerData = {
        text: "Diario",
        // AvatarIcon: <div style={{ padding: '.2rem'}} ><MiscellaneousServicesIcon style={{ fontSize: '1rem'}} /></div>,
        AvatarIcon: <BsJournalBookmarkFill />,
        info: [{}, {
            value: "Diario",
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
            </PagePanel>
        </PageWrapper>
    )
}

export default ClinicalJournalRouterPage