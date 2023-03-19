import React from 'react'

// material-ui
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    SwipeableDrawer,
    Typography,
    useMediaQuery
} from '@mui/material';

// project import
import {BackgroundLetterAvatars} from 'components/avatar/CustomAvatar';

// assets
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux';
import { getUserById } from 'store/reducers/users';

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

    const user = useSelector(state => getUserById(state, userId))
    // console.log(user);

    return (
        <>
            <ListItemButton>
                <ListItemAvatar>
                    <BackgroundLetterAvatars name={user !== undefined ? user?.meta?.first_name + " " + user?.meta?.last_name : ""} />
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <Typography component="span" variant="subtitle1" >
                            {message}
                        </Typography>
                    }
                    secondary={withTime ? timeAgo : ''}
                />

                {/* {onAction !== false &&
                    <ListItemSecondaryAction sx={{ alignSelf: 'center', }}>
                        <IconButton onClick={() => onAction()} sx={{ borderRadius: '50%', }} >
                            <Avatar
                                sx={{
                                    color: 'primary.main',
                                    bgcolor: 'primary.lighter'
                                }}
                            >
                                <ActionIcon />
                            </Avatar>
                        </IconButton>
                    </ListItemSecondaryAction>} */}
            </ListItemButton>

            <Divider />
        </>
    )
}

export default ChatNotification