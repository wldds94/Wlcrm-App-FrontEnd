import React, { useMemo } from 'react'

// project import
import Messenger from './components/Messenger'

// hooks
import useCurrentAccount from 'hooks/redux/useCurrentAccount'
import useMessages from 'hooks/redux/useMessages'

// utils
import dynamicSortMultiple from 'utils/array'


const ChatChannelPage = ({
    channelID,
    users = [],
}) => {
    console.log('ChatChannelPage');

    const items = useMessages() // useSelector(getMessages)
    console.log(items);

    const {currentAccount} = useCurrentAccount()

    const filteredItems = useMemo(
        () => {
            return items?.filter((item) => {
                // console.log("filtering users");

                /**
                 * PRENDERE TUTTI I MESSAGGI E FILTRARE
                 * CONTROLLARE BENE, PARTENDO DAL CHANNEL NON VA BENE
                 */
                return Number(channelID) > 0
                    ? (Number(item?.group_id) === Number(currentAccount?.ID) && Number(item?.user_id) === Number(channelID)) ||/* &&  */
                    (Number(item?.group_id) === Number(channelID) && Number(item?.user_id) === Number(currentAccount?.ID))
                    // || Number(item?.user_id) === Number(currentAccount?.ID)
                    // || Number(item?.user_id) === Number(channelID))
                    : Number(item?.group_id) === 0
            })?.sort(dynamicSortMultiple('createdAt'))
        },
        [items, currentAccount]
    );

    return (
        <>
            <Messenger
                items={filteredItems}
                // items={items?.sort(dynamicSortMultiple('createdAt'))}
                // items={items?.filter(item => Number(item?.user_id) === Number(currentAccount?.ID))?.sort(dynamicSortMultiple('createdAt'))}
                account={currentAccount}
                channelID={channelID}
                users={users}
            />
        </>
    )
}

export default ChatChannelPage