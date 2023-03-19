import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
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
import MainCard from 'components/card/MainCard';
import Transitions from 'components/@extended/Transitions';
// project import
import ShoppingSync from './slicesSync/ShoppingSync';
import ClientsSync from './slicesSync/ClientsSync';
import SyncNotification from './slicesSync/components/SyncNotification';
// import ChatSync from './slicesSync/ChatSync';

// react-redux
import { useSelector } from 'react-redux';
// slices
import { getShoppingSyncUpdate } from 'store/reducers/shopping';
import { getClientsSyncUpdate, getSyncUpdate } from 'store/reducers/client';
import { getChatSyncUpdate } from 'store/reducers/chat';

// assets
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import {AiOutlineMail} from 'react-icons/ai';
import InvoiceSync from './slicesSync/InvoiceSync';
import { getInvoicesSyncUpdate } from 'store/reducers/invoice';
import CompanySync from './slicesSync/CompanySync';
import { getOptionsSyncUpdate } from 'store/reducers/options';
import UsersSync from './slicesSync/UsersSync';
import { getUsersSyncUpdate } from 'store/reducers/users';
import { getClinicalSyncStatus, getClinicalSyncUpdate } from 'store/reducers/clinical';
import ClinicalSync from './slicesSync/ClinicalSync';
import CalendarSync from './slicesSync/CalendarSync';
import { getCalendarSyncUpdate } from 'store/reducers/calendar';


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

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

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

    // DRAWER
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpenDrawer(open);
    };

    /** NOTIFIES */
    const syncShoppingUpdate = useSelector(getShoppingSyncUpdate)
    const syncClientsUpdate = useSelector(getClientsSyncUpdate)
    const syncInvoicesUpdate = useSelector(getInvoicesSyncUpdate)
    const syncOptionsUpdate = useSelector(getOptionsSyncUpdate)
    const syncUsersUpdate = useSelector(getUsersSyncUpdate)
    const syncClinicalUpdate = useSelector(getClinicalSyncUpdate)
    const syncCalendarUpdate = useSelector(getCalendarSyncUpdate)
    // const syncChatUpdate = useSelector(getChatSyncUpdate)
    const updates = [
        syncShoppingUpdate,
        syncClientsUpdate,
        syncInvoicesUpdate,
        syncOptionsUpdate,
        syncUsersUpdate,
        syncClinicalUpdate,
        syncCalendarUpdate,
    ]

    const notifies = updates?.reduce((prev, next) => {
        return Number(prev) + Number(next ? 1 : 0)
    }, [0]) /* 4 */

    return (
        <>
            
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <IconButton
                    disableRipple
                    color="secondary"
                    sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                    aria-label="open profile"
                    ref={anchorRef}
                    aria-controls={open ? 'profile-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Badge badgeContent={notifies} color="primary">
                        <BellOutlined />
                    </Badge>
                </IconButton>
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
                                        title="Notification"
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
                                            <ShoppingSync />
                                            <ClientsSync />
                                            <InvoiceSync />
                                            <CompanySync />
                                            <UsersSync />
                                            <ClinicalSync />
                                            <CalendarSync />
                                            {/* <ChatSync /> */}

                                            {notifies < 1 &&
                                                <>
                                                    <Box sx={{ pt: 1, pb: 1, }}>
                                                        <SyncNotification
                                                            message='Nessuna notifica da mostrare'
                                                            withTime={false}
                                                            withDivider={false}
                                                        />
                                                    </Box>
                                                    <Divider />
                                                    {/* <ListItemButton>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="subtitle1">
                                                                    Nessuna notifica da mostrare
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                    <Divider /> */}

                                                </>

                                            }


                                            <ListItemButton onClick={toggleDrawer(true)/*() => {;  setOpen(false);  }*/} sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="h6" color="primary">
                                                            View All
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        </List>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        </Transitions>
                    )}
                </Popper>
            </Box>
            <SwipeableDrawer
                anchor={"right"}
                open={openDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                    zIndex: 1202,
                }}
            >
                <Box
                    sx={{ width: 300, p: 2 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >

                </Box>

            </SwipeableDrawer>
        </>

    );
};

export default Notification;
