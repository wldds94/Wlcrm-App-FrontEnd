import { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'
import { getAllUsers } from 'store/reducers/users'
import { getHumanSex, getUserFullAddress } from 'utils/app/user'

// utils
import { getRandomColor } from 'utils/color'
import convertDate from 'utils/date'

const useUsers = () => {
    const users = useSelector(getAllUsers)

    const res = useMemo(() => {
        return users?.map((user) => {
            return {
                ...user,
                id: Number(user?.ID),
                color: user?.meta?.preferences?.color ? user?.meta?.preferences?.color : getRandomColor(user?.display_name, false, 0.7),
                name: user?.display_name,
                text: user?.display_name,
                fullAddress: getUserFullAddress(user?.meta),
                genre: getHumanSex(user?.meta?.sex),
                DOB: convertDate(user?.meta?.birth_date)
            }
        })
    }, [users])

    return res
}

export default useUsers