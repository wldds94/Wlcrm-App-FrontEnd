import config from 'config'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllClients } from 'store/reducers/client'
import { getUserFullAddress } from 'utils/app/user'
import { getRandomColor } from 'utils/color'
import { crypt } from 'utils/crypto'
import useCryptoJS from '../useCryptoJS'

const useClients = () => {
    const cryptoJS = useCryptoJS()

    const allClients = useSelector(selectAllClients)

    // const [currentClients, setCurrentClients] = useState(allClients)
    // useEffect(() => {
    //     if (!(isDeepEqual(currentClients, allClients))) {
    //         setCurrentClients(allClients)
    //     }
    // }, [allClients])

    const clients = useMemo(() => {
        return allClients?.map((item) => {
            const first_name = cryptoJS.decrypt(item?.first_name)
            const last_name = cryptoJS.decrypt(item?.last_name)
            const address = cryptoJS.decrypt(item?.address)
            return {
                ...item,
                first_name: first_name, // cryptoJS.decrypt(item?.first_name),
                last_name: last_name,
                piva: cryptoJS.decrypt(item?.piva),
                telephone: cryptoJS.decrypt(item?.telephone),
                email: cryptoJS.decrypt(item?.email),
                pec: cryptoJS.decrypt(item?.pec),
                address: address,
                color: getRandomColor(last_name + " " + first_name), // '#1890ff', // 
                name: last_name + " " + first_name, // meta?.first_name + " " + user?.meta?.last_name,
                text: last_name + " " + first_name, // + " " + item?.telephone,
                chiperId: crypt(config.salt, item?.id), // chiperId: cryptoJS.encrypt(String(item?.id)), // getUserChiperString(item)),
                fullAddress: getUserFullAddress({
                    ...item,
                    address: address,
                }), // chiperId: cryptoJS.encrypt(String(item?.id)), // getUserChiperString(item)),
            }
        })
    }, [allClients])

    return {
        clients: clients,
        workable: clients?.filter(item => item.status !== 'trash'),
        trash: clients?.filter(item => item.status === 'trash'),
    }
}

export default useClients