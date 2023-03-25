import useCryptoJS from 'hooks/useCryptoJS'

// redux
import { useSelector } from 'react-redux'
import { getChatSyncData } from 'store/reducers/chat'

const useMessagesSync = () => {
    const cryptoJS = useCryptoJS()
    
    const items = useSelector(getChatSyncData)

    const messages = items?.map((item) => {
        return {
            ...item,
            text: cryptoJS.decrypt(item?.text),
        }
    })

    return messages
}

export default useMessagesSync