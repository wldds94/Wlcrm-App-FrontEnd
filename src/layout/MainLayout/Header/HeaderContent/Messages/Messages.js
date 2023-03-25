import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/card/MainCard';
import Transitions from 'components/@extended/Transitions';
import SyncNotification from '../Sync/slicesSync/components/SyncNotification';
import ChatNotification from './components/ChatNotification';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getChatSyncData, syncChatData } from 'store/reducers/chat';

// // assets
import { CloseOutlined } from '@ant-design/icons';
import {BiMessageDetail} from 'react-icons/bi';
import useMessagesSync from 'hooks/redux/useMessagesSync';


// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

const Messages = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch()

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    // new messages
    const notifies = useMessagesSync() //  useSelector(getChatSyncData)

    const cleanMessage = () => {
        setOpen(false)
        dispatch(syncChatData())
    }

    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <IconButton
                    // disableRipple
                    color="secondary"
                    sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                    aria-label="open messages"
                    ref={anchorRef}
                    aria-controls={open ? 'messages-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    {/* <Badge color="primary" variant="dot" invisible={notifies.length === 0} >
                        <AiOutlineMail />
                    </Badge> */}
                    <Badge color="primary" /* variant="dot" */ badgeContent={notifies.length} >
                        <BiMessageDetail />
                    </Badge>
                </IconButton>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.customShadows.z1,
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285
                                }
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Live Chat"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton size="small" onClick={handleToggle}>
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                            }
                                        }}
                                    >
                                        {/* <ChatSync /> */}
                                        {notifies?.map((item, index) => {
                                            return (
                                                <ChatNotification
                                                    key={index}
                                                    userId={item?.user_id}
                                                    message={item?.text}
                                                    time={item?.createdAt}
                                                    onAction={() => {return}}
                                                />
                                            )
                                        })}

                                        {notifies.length < 1 &&
                                            <>
                                                <Box sx={{ pt: 1, pb: 1, }}>
                                                    <SyncNotification
                                                        message='Nessun nuovo messaggio'
                                                        withTime={false}
                                                        withDivider={false}
                                                    />
                                                </Box>
                                                <Divider />
                                            </>
                                        }


                                        {Boolean(notifies.length > 0) && <ListItemButton onClick={cleanMessage} sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" color="primary">
                                                        Segna come letti
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>}
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    )
}

export default Messages