import { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'

// hooks
import useCurrentAccount from './useCurrentAccount'
import useSchedulerData from './useSchedulerData'

const useAccountData = () => {
    const { currentAccount: account } = useCurrentAccount()

    const { data: events } = useSchedulerData()

    const eventsAccount = useMemo(() => {
        return events?.filter(item => Number(item?.userId) === Number(account?.ID))
    }, [account, events]) 
    
    return {
        account: account, 
        events: eventsAccount
    }
}

export default useAccountData