import React from 'react'

// material-ui
import {
    Stack,
} from '@mui/material';

// project import
import AccountEmailPanel from './common/AccountEmailPanel'
import AccountSecurityPanel from './common/AccountSecurityPanel'

const AccountPrivacyPage = () => {
    return (
        <>
            <Stack gap={5} sx={{ mt: '40px', }}>
                <AccountEmailPanel />
                <AccountSecurityPanel />
            </Stack>
        </>
    )
}

export default AccountPrivacyPage