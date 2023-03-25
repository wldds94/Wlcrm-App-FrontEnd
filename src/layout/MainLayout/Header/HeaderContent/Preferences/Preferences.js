import React from 'react'

// material-ui
import { Box, IconButton, Typography, SwipeableDrawer } from '@mui/material';

// assets
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SessionStoragePreferences from './form/SessionStoragePreferences';
import { Stack } from '@mui/material';
import { CloseIcon } from 'assets/font-icons/icons';
import FullScreenStorageForm from './form/FullScreenStorageForm';


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
                onClose={() => openDrawer && setOpenDrawer(false)}
                onOpen={() => !openDrawer && setOpenDrawer(true)}
                sx={{
                    zIndex: 1202,
                }}
            >
                <Stack alignItems="end">
                    <IconButton onClick={() => setOpenDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
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
                    <Stack gap={6}>
                        <SessionStoragePreferences />
                        <FullScreenStorageForm />
                    </Stack>
                </Box>
            </SwipeableDrawer>
        </>
    )
}

export default Preferences