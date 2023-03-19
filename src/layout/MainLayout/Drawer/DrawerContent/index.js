import React from 'react'

// material-ui
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// project import
// import Support from './Support/Support';


// constants
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT ||============================== //


const DrawerContent = () => {
    const theme = useTheme()

    // const visibleItems = menuItem.items.filter(item => item.hasOwnProperty('visible') ? item.visible : true )
    // console.log(visibleItems);
    // const mainNavs = visibleItems.filter(item => {
    //     console.log(item);
    //     return item.hasOwnProperty('footer') ? item.footer == false : true
    // })
    // const footerNavs = visibleItems.filter(item => item.hasOwnProperty('footer') ? item.footer == true : false)
    // console.log(mainNavs);
    const mainNavs = menuItem.items.filter(item => {
        // console.log(item);
        return item.hasOwnProperty('footer') ? item.footer == false : true
    })
    const footerNavs = menuItem.items.filter(item => item.hasOwnProperty('footer') ? item.footer == true : false)
    // console.log(mainNavs);

    return (
        <>
            <SimpleBar
                sx={{
                    '& .simplebar-content': {
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }}
            >
                <Navigation items={mainNavs} />
            </SimpleBar>
            {/* <NavCard /> */}
            <Box
                sx={{ 
                    boxShadow: '0px -6px 8px rgba(0, 0, 0, 0.15)',
                    // height: '100%',
                    // display: 'flex',
                    // alignItems: 'end',
                }}    
            >
                <Navigation items={footerNavs} />
                {/* <Support /> */}
            </Box>
        </>
    )
}

export default DrawerContent
