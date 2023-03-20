import React from 'react'

// project import
import AccountProfilePanel from './common/AccountProfilePanel';

// hooks
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';

const AccountProfilePage = () => {
    console.log('AccountProfilePage');

    const {currentAccount: account} = useCurrentAccount()

    return (
        <>
            <AccountProfilePanel account={account} />
        </>
    )
}

export default AccountProfilePage