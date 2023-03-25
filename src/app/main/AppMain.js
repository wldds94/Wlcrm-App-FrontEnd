import React from 'react'

// project import
import MainLayout from 'layout/MainLayout/MainLayout';
import RequireAuth from './RequireAuth/RequireAuth';
import PrivateKeyStorage from './PrivateKeyStorage/PrivateKeyStorage';
import Dispatcher from './Dispatcher/Dispatcher';
import AppSynchronizer from './Synchronizer/AppSynchronizer';

const AppMain = () => {
    return (
        <>
            <RequireAuth >
                <PrivateKeyStorage>
                    <AppSynchronizer />
                    {/* <MailLoader /> */}
                    <Dispatcher>
                        <MainLayout />
                    </Dispatcher>
                </PrivateKeyStorage>
            </RequireAuth>
        </>
    )
}

export default AppMain