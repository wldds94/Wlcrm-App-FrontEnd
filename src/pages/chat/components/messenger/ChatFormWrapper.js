import React from 'react'

import { useParams } from 'react-router-dom';

// material-ui
import {
    Box,
} from '@mui/material';

// project import
import ChatForm from '../form/ChatForm';
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';

const ChatFormWrapper = ({
    ...other
}) => {
    const { channelID } = useParams()
    
    // const currentUser = useSelector(selectCurrentUser) // console.log(currentUser);
    // const account = useSelector(state => getUserById(state, currentUser?.ID)) // console.log(account);
    const {currentAccount: user} = useCurrentAccount() // users?.find(item => Number(item?.ID) === Number(channelID))

    return (
        <>
            {/* CHAT BOTTOM */}
            <Box
                sx={{
                    p: 1.5,
                    pt: 2,
                    background: '#fff',
                    height: "120px",
                    borderTop: "1px solid #d9d9d9",
                    boxShadow: '0px -2px 9px 0px #d9d9d9',
                    zIndex: 1,
                }} >
                <ChatForm user_id={user?.ID} group_id={channelID} /* afterSubmitCallback={() => scrollToBottom()} */ />
            </Box>
        </>
    )
}

export default ChatFormWrapper