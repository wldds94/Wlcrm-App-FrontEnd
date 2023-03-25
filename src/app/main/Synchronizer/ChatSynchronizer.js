import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getChatStatus, getChatSyncStatus, syncChat } from 'store/reducers/chat';

const ChatSynchronizer = () => {
    const POLL_TIME_CHAT = 1000 * 60
    // const POLL_TIME = 1000 * 60 //  30 // 90// 60
    const POLL_TIME_TEST = 1000 * 10 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    /**
     * Necessary Data
     *  */ 
    const chatStatus = useSelector(getChatStatus)
    const chatSyncStatus = useSelector(getChatSyncStatus)

    // messages
    useEffect(() => {
        console.log('Active Interval Chat Timer');
        const chatTimer = setInterval(() => {
            if (chatStatus !== 'loading' && chatSyncStatus !== 'loading') {
                dispatch(syncChat())
            }
        }, POLL_TIME_CHAT)

        return () => clearInterval(chatTimer)
    }, [])

    return (
        <></>
    )
}

export default ChatSynchronizer