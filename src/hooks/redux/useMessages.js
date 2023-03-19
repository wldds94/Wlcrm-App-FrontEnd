import useCryptoJS from 'hooks/useCryptoJS'

// redux
import { useSelector } from 'react-redux'
import { getMessages } from 'store/reducers/chat'

const useMessages = () => {
    const cryptoJS = useCryptoJS()
    
    const items = useSelector(getMessages)

    const messages = items?.map((item) => {
        return {
            ...item,
            text: cryptoJS.decrypt(item?.text),
        }
    })

    return messages
}

export default useMessages