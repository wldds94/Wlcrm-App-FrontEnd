import { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'
// slices
import { getClinicalList } from 'store/reducers/clinical';

// hooks
import useCryptoJS from 'hooks/useCryptoJS';

const useJournals = (withMapping = true) => {
    const cryptoJS = useCryptoJS()
    
    const journals = useSelector(getClinicalList)

    const data = useMemo(() => {
        return journals?.map((item, index) => {
            return {
                ...item,
                content: cryptoJS.decrypt(item?.content),
            }
        })
    }, [journals])

    return {
        journals: data, 
    }
}

export default useJournals