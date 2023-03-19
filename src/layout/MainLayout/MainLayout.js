import { useEffect, useState } from 'react';
// react-router-dom
import { useLocation, Navigate, Outlet } from "react-router-dom";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getOpenDrawer, openDrawer } from 'store/reducers/menu';
import { getAuthvalidateStatus } from "store/reducers/auth";

// project import
import Loader from 'components/loadable/Loader';
import Header from './Header/index';
import MainDrawer from './Drawer/index';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
// import SupportWrapper from 'app/main/Support/SupportWrapper';
// third-pary
import SimpleBar from 'components/third-party/SimpleBar';

// CONSTANTS
import navigation from 'menu-items';
// config
import { miniDrawerWidth, drawerWidth } from 'config';
import { fullScreenMainHeight } from 'config';

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const validateTokenStatus = useSelector(getAuthvalidateStatus)

    // const { drawerOpen } = useSelector((state) => state.menu);
    const drawerOpen = useSelector(getOpenDrawer);

    // layout -> normal / fullWidth
    const location = useLocation();

    const [item, setItem] = useState();

    // set active item state
    const getCollapse = (menu) => {
        if (menu.children) {
            menu.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === 'item') {
                    // if (location.pathname === collapse.url) {
                    //     console.log(collapse.regexURI.test(location.pathname));
                    //     setMain(menu);
                    //     setItem(collapse);
                    // }
                    if (collapse.regexURI.test(location.pathname)) {
                        // console.log(location.pathname);
                        // console.log(collapse.regexURI.test(location.pathname));
                        // setMain(menu);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    useEffect(() => {
        navigation?.items?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                getCollapse(menu);
            }
            return false;
        });
    }, [location]);

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);


    return (
        <>
            {validateTokenStatus === "loading" && <Loader />}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                }}>
                <Header open={open} handleDrawerToggle={handleDrawerToggle} />
                <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
                {validateTokenStatus !== 'failed' &&
                    (<Box
                        component="main"
                        sx={{
                            width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${miniDrawerWidth}px)`,
                            flexGrow: 1,
                            p: item?.fullWidth ? 0 : { xs: 2, sm: 3 }
                        }}
                    >
                        <Toolbar />
                        <Breadcrumbs navigation={navigation} title /* titleBottom card={false} */ divider={false} />
                        <Box
                            sx={{
                                backgroundColor: item?.fullWidth ? "#fff" : "transparent",
                                height: item?.fullWidth ? fullScreenMainHeight : 'auto',
                                // overflow: 'auto',
                                overflow: matchDownSM ? 'unset' : item?.fullWidth ? 'hidden' : 'auto',
                                position: 'relative',
                            }} >
                            {item?.fullWidth ? (
                                <Outlet />

                            ) : (
                                <SimpleBar >
                                    <Box sx={{ height: '100%', }} >
                                        <Outlet />
                                    </Box>
                                </SimpleBar>
                            )}
                        </Box>
                        {/* <Alerts /> */}
                    </Box>)}
            </Box>
            {/* <SupportWrapper /> */}
        </>
    );
}

export default MainLayout