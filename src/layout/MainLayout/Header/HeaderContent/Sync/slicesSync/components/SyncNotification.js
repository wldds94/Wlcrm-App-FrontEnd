import React, { useEffect } from 'react'

// material-ui
import {
    Avatar,
    Divider,
    IconButton,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
} from '@mui/material';

// icons
import { MdSync } from 'react-icons/md'

// assets
import InfoIcon from '@mui/icons-material/Info';


const SyncNotification = ({
    NoticeIcon = InfoIcon,
    message = "Not Provided",
    time = null, // false for not showing
    withTime = true,
    withDivider = true,
    SyncIcon = MdSync,
    onSync = false,
    // dispatchSync = false,
    ...other
}) => {
    const dayjs = require('dayjs')
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    dayjs.locale('it')
    const timeAgo = time !== null ? dayjs(time)/* .locale('it') */.fromNow() : 'Not Provided'

    // useEffect(() => {
    //     if (dispatchSync) {
    //         onSync()
    //     }
    // }, [dispatchSync])

    return (
        <>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                        }}
                    >
                        <NoticeIcon />
                    </Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <Typography component="span" variant="subtitle1" >
                            {message}
                        </Typography>
                    }
                    secondary={withTime ? timeAgo : ''}
                />

                {onSync !== false &&
                    <ListItemSecondaryAction sx={{ alignSelf: 'center', }}>
                        <IconButton onClick={() => onSync()} sx={{ borderRadius: '50%', }} >
                            <Avatar
                                sx={{
                                    color: 'primary.main',
                                    bgcolor: 'primary.lighter'
                                }}
                            >
                                <SyncIcon />
                            </Avatar>
                        </IconButton>
                    </ListItemSecondaryAction>}
            </ListItemButton>
            {withDivider && <Divider />}
        </>
    )
}

export default SyncNotification