import { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'store/reducers/auth'

// hooks
import useUsers from '../useUsers'

const useCurrentAccount = () => {
    const users = useUsers() 
    // console.log(users);
    const currentUser = useSelector(selectCurrentUser) // 
    // console.log(currentUser);
    const account = useMemo(() => {
        let finded = users?.find(item => Number(item?.ID) === Number(currentUser?.ID))
        let auxActivity = []
        finded?.activities?.map((item) => {
            // console.log(item); // return JSON.parse(item)
            auxActivity.push(JSON.parse(item))
        })
        finded.activities = auxActivity
        return finded
    }, [users])
    
    return {
        currentAccount: account, 
    }
}

export default useCurrentAccount