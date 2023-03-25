import React from 'react'

// material-ui
import {
    Divider,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

// project import
import {BackgroundLetterAvatars} from 'components/avatar/CustomAvatar';

// assets
import { IoMdClose } from 'react-icons/io'
// import { useSelector } from 'react-redux';
// import { getUserById } from 'store/reducers/users';
// import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';
import useUserByID from 'hooks/redux/query/useUserByID';

const ChatNotification = ({
    userId = 0,
    message = "",
    time = null,
    withTime = true,
    onAction = false,
    ActionIcon = IoMdClose,
    ...other
}) => {
    const dayjs = require('dayjs')
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    dayjs.locale('it')
    const timeAgo = time !== null ? dayjs(time)/* .locale('it') */.fromNow() : 'Not Provided'

    // const user = useSelector(state => getUserById(state, userId))
    // const {currentAccount: user} = useCurrentAccount()
    const user = useUserByID(userId)
    console.log(user);

    return (
        <>
            <ListItemButton>
                <ListItemAvatar>
                    <BackgroundLetterAvatars name={user !== undefined ? user?.display_name : ""} />
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <Typography component="span" variant="subtitle1" >
                            {message}
                        </Typography>
                    }
                    secondary={withTime ? timeAgo : ''}
                />

            </ListItemButton>

            <Divider />
        </>
    )
}

export default ChatNotification