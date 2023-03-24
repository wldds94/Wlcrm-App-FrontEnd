import React, { useState } from 'react'

// material-ui
import {
    Box,
    Stack,
} from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
import RelativeDrawer from 'components/drawer/RelativeDrawer';

import ShoppingList from './grocery/ShoppingList';
import UsersCalendar from './user-calendar/UsersCalendar';
import RecallPanel from './recall/RecallPanel';
import UsefullLinks from './usefull-links/UsefullLinks';
import InvoicesPanel from './invoice/InvoicesPanel';

// assets
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { IconButton } from '../../../node_modules/@mui/material/index';


const DashboardRouterPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    return (
        <>
            <Stack direction="row" /* gap={1.5} */
                sx={{
                    height: '100%',
                    // p: 1.5,
                    // background: 'yellow',
                    width: '100%',
                    position: 'relative',
                    p: matchDownSM ? 0 : '.6rem',
                }} >
                <Stack gap={1.5} /* spacing={2}  */ sx={{
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                    p: matchDownSM ? '.3rem' : 0,
                }}>
                    {/* USEFULL */}
                    <Box sx={{
                        margin: matchDownSM ? '6px' : '12px 12px 0',
                    }}>
                        <UsefullLinks />
                    </Box>

                    {/* RECALL */}
                    <Box sx={{
                        margin: matchDownSM ? '6px' : '12px 12px 0',
                        boxShadow: '0px 2px 9px 0px #d9d9d9',
                    }}>
                        <RecallPanel withClientProfileLink={true} />
                    </Box>

                    {/* Invoice */}
                    <Box sx={{
                        margin: matchDownSM ? '6px' : '12px 12px 0',
                        boxShadow: '0px 2px 9px 0px #d9d9d9',
                    }}>
                        <InvoicesPanel />
                    </Box>

                    {/** SHOPPING */}
                    <Box sx={{
                        margin: matchDownSM ? '6px' : '12px 12px 0', // '12px 6px 0 12px',
                        boxShadow: '0px 2px 9px 0px #d9d9d9',
                    }}>
                        <ShoppingList />
                    </Box>

                </Stack>

                <>
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        right: '0',
                        background: '#1890ff',
                        borderRadius: '4px 0 0 4px',
                        boxShadow: '0px 0px 6px 0px',
                        zIndex: 2,
                        // padding: '.2rem',
                    }}>
                        <Box sx={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            padding: '.2rem',
                            '&:after': {
                                content: `""`,
                                display: 'block',
                                position: 'absolute',
                                width: 0,
                                height: 0,
                                right: '0px',
                                // right: '-3px',
                                bottom: '-10px',
                                borderLeft: '10px solid transparent',
                                borderRight: '0px solid transparent',
                                borderTop: '10px solid #1890ff',
                                // boxShadow: '0px 0px 6px 0px',
                            },
                        }}>
                            <IconButton sx={{ color: '#fff', }} onClick={() => { setIsOpenCalendar(true) }} >
                                <CalendarTodayIcon />
                            </IconButton>
                        </Box>
                    </div>

                </>

            </Stack>
            <RelativeDrawer
                open={isOpenCalendar}
                handleDrawerClose={() => { setIsOpenCalendar(false) }}
                position="right"
            >
                <Box sx={{
                    height: 'calc(100vh - 110px)', // matchDownSM ? 'calc(100vh - 110px)' : '85vh',
                    overflow: 'hidden'
                }}>
                    <UsersCalendar />
                </Box>
            </RelativeDrawer>
        </>
    )
}

export default DashboardRouterPage