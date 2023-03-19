import React from 'react'

// material-ui
import { Box, IconButton, Link, SwipeableDrawer, useMediaQuery } from '@mui/material';
import { Stack, Typography } from '../../../../../../node_modules/@mui/material/index';

// assets
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SessionStoragePreferences from './form/SessionStoragePreferences';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';


const Preferences = () => {
    const [openDrawer, setOpenDrawer] = React.useState(false);

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

    return (
        <>
            <IconButton onClick={toggleDrawer(true)}>
                <FavoriteBorderIcon />
            </IconButton>
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
                >
                    <Typography variant="h6b">
                        Imposta le tue preferenze
                    </Typography>
                    {/* <SimpleHeaderDivider
                        title={"Imposta le tue preferenze"}
                    /> */}
                    <Box
                        sx={{ p: 1 }}
                    ></Box>
                    <SessionStoragePreferences />
                </Box>
            </SwipeableDrawer>
        </>
    )
}

export default Preferences