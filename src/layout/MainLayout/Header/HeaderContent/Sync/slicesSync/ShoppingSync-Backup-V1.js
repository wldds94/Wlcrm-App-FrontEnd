import React from 'react'

// dayjs // ES 2015
// import dayjs from 'dayjs'
import 'dayjs/locale/it';

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

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getSyncMessage, getSyncStatus, getSyncTime, getSyncUpdate, syncShoppingData } from 'store/reducers/shopping';

// icons
import { ImGift } from 'react-icons/im'
import { MdSync } from 'react-icons/md'
import SyncNotification from './components/SyncNotification';


const ShoppingSync = () => {
    console.log('ShoppingSync');

    const dispatch = useDispatch()

    const dayjs = require('dayjs')
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    dayjs.locale('it')

    // const syncStatus = useSelector(getSyncStatus)
    const syncMessage = useSelector(getSyncMessage)
    const syncUpdate = useSelector(getSyncUpdate)
    const syncTime = useSelector(getSyncTime)
    const timeAgo = syncTime !== null ? dayjs(syncTime).locale('it').fromNow() : 'Not Provided'
    // console.log(timeAgo);
    // console.log(syncTime);
    // const timeJs = dayjs(syncTime ? syncTime : '') // .fromNow()
    // console.log(timeJs);

    const handleSync = (e) => {
        console.log('Sync Shopping');
        dispatch(syncShoppingData({ value: 'Test' }))//.unwrap()
    }

    return (
        <>
            <SyncNotification
                NoticeIcon={ImGift}
                message={syncMessage}
                time={timeAgo}
                onSync={handleSync}
            />
            {syncUpdate &&
                <>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar
                                sx={{
                                    color: 'primary.main',
                                    bgcolor: 'primary.lighter'
                                }}
                            >
                                <ImGift />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography component="span" variant="subtitle1" /* variant="h6" */ >
                                    {/* It&apos;s{' '}
                                    <Typography component="span" variant="subtitle1">
                                        Cristina danny&apos;s
                                    </Typography>{' '}
                                    birthday today. */}
                                    {syncMessage}
                                </Typography>
                            }
                            secondary={timeAgo}
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="caption" noWrap>
                                {/* <span>3:00 AM</span> */}
                                <IconButton onClick={handleSync} sx={{ borderRadius: '50%', }} >
                                    <Avatar
                                        sx={{
                                            color: 'primary.main',
                                            bgcolor: 'primary.lighter'
                                        }}
                                    >
                                        <MdSync />
                                    </Avatar>
                                </IconButton>
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                </>}
        </>

    )
}

export default ShoppingSync