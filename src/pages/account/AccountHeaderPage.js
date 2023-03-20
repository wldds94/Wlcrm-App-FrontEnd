import React from 'react'

// project import
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout'

// hooks
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount'

const AccountHeaderPage = ({
    headerNavItems = [],
}) => {
    const {currentAccount: account} = useCurrentAccount()

    return (
        <RouterHeaderLayout
            data={{
                text: account?.display_name,
                info: [{
                    value: account?.display_name,
                }, {
                    value: account?.user_email,
                }]
            }}
            items={headerNavItems}
        />
    )
}

export default AccountHeaderPage