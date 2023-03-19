import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import config, { miniDrawerWidth, drawerWidth } from 'config';
// import { miniDrawerWidth } from 'config';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open, handleDrawerToggle, window }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('sm'));

    // responsive drawer container
    const container = window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);
    const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

    return (
        <Box component="nav" 
            sx={{ flexShrink: { md: 0 }, zIndex: 1300, boxShadow: theme.customShadows.z1, height: '100vh', }} 
            aria-label="mailbox folders"
        >
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={open}>
                    {drawerHeader}
                    {drawerContent}
                </MiniDrawerStyled>
            ) : (
                <Drawer
                    container={container}
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        // boxShadow: theme.customShadows.z1,
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundImage: 'none',
                            // boxShadow: theme.customShadows.z1,
                            
                        }
                    }}
                >
                    {open && drawerHeader}
                    {open && drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

MainDrawer.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default MainDrawer;
