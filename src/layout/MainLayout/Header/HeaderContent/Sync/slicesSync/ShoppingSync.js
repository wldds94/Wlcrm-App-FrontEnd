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
import { getShoppingSyncMessage, getShoppingSyncTime, getShoppingSyncUpdate, syncShoppingData } from 'store/reducers/shopping';

// project import
import SyncNotification from './components/SyncNotification';

// icons
import { ImGift } from 'react-icons/im'
import { MdSync } from 'react-icons/md'


const ShoppingSync = () => {
    // console.log('ShoppingSync');

    const dispatch = useDispatch()

    // const dayjs = require('dayjs')
    // var relativeTime = require('dayjs/plugin/relativeTime')
    // dayjs.extend(relativeTime)
    // dayjs.locale('it')

    // const syncStatus = useSelector(getSyncStatus)
    const syncMessage = useSelector(getShoppingSyncMessage)
    const syncUpdate = useSelector(getShoppingSyncUpdate)
    const syncTime = useSelector(getShoppingSyncTime)
    // const timeAgo = syncTime !== null ? dayjs(syncTime).locale('it').fromNow() : 'Not Provided'
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
            {syncUpdate &&
                <>
                    <SyncNotification
                        NoticeIcon={ImGift}
                        message={syncMessage}
                        time={syncTime}
                        onSync={handleSync}
                    />
                </>}
        </>

    )
}

export default ShoppingSync