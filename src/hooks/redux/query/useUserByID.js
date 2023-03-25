// hooks
import { useMemo } from "react"
import useUsers from "../useUsers"

const useUserByID = (userID) => {
    const users = useUsers()

    const user = useMemo(() => {
        return users?.find(item => Number(item?.ID) === Number(userID))
    }, [users])

    return user
}

export default useUserByID