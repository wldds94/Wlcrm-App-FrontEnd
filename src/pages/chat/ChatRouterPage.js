import React, { useEffect, useState } from 'react'

// react-router-dom
import { useParams } from 'react-router-dom'

// material ui
import { Avatar } from '@mui/material';

// project import
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout';
import PageWrapper from 'components/page/PageWrapper';
import PageNavWrapper from 'components/page/nav/PageNavWrapper';
import PagePanel from 'components/page/panel/PagePanel';
import PageNav from 'components/page/nav/PageNav';
import {BackgroundLetterAvatars} from 'components/avatar/CustomAvatar';
import ChatChannelPage from './channel/ChatChannelPage';

// hooks
import useUsers from 'hooks/redux/useUsers';
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';

// assets
import { GrChannel } from 'react-icons/gr'
import {BiChat} from 'react-icons/bi';

// utils
import { isDeepEqual } from 'utils/equal';


const ChatRouterPage = () => {
    console.log('ChatRouterPage');
    const { channelID } = useParams()

    const users = useUsers() // useSelector(getAllUsers) // console.log(users);

    const {currentAccount} = useCurrentAccount()
    const [account, setAccount] = useState(currentAccount)
    useEffect(() => {
        if (!isDeepEqual(account, currentAccount)) {
            setAccount(currentAccount)
        }
    }, [currentAccount])

    const routers = [
        {
            value: 0,
            base: '/chat/channel/',
            key: 0,
            // icon: <GrChannel sx={{fontSize:"1.3rem", mr: 0, }} />,
            icon: (<>
                <Avatar sx={{ bgcolor: 'secondary', width: 24, height: 24/* , mr: 0 */ }} style={{ marginRight: 0, }} >
                    <GrChannel sx={{ fontSize: ".9rem", mr: 0, }} />
                </Avatar>
            </>),
            label: "#STUDIO",
            hasSubtitle: false,
        },
        ...users?.map((item, index) => {
            return {
                value: item?.ID, // index + 1, // item?.ID,
                base: '/chat/channel/',
                key: index + 1, // item?.ID,
                icon: <BackgroundLetterAvatars name={item?.display_name} />,
                label: item?.display_name + (Number(account?.ID) === Number(item?.ID) ? " (tu)" : ""),
                hasSubtitle: false,
                // isMe: Number(item?.ID) === Number(channelID) 
            }
        })
    ]

    const headerData = {
        text: "Chat", // "LiveChat",
        AvatarIcon: <BiChat />,
        info: [{
            // value: "LiveChat",
        }, {
            value: "Chat",
        }]
    }

    return (
        <>
            <PageWrapper>
                <PageNavWrapper>
                    <RouterHeaderLayout data={headerData} />
                    <PageNav routers={routers} />
                </PageNavWrapper>

                <PagePanel padding={false} >
                    <ChatChannelPage
                        channelID={channelID}
                        users={users}
                    />
                </PagePanel>
            </PageWrapper>
        </>
    )
}

export default ChatRouterPage