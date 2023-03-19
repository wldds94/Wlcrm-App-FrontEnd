import React from 'react'

// material ui
import { Stack } from '@mui/material';
import { useMediaQuery } from '@mui/material';
// styled
import { useTheme } from '@mui/material/styles';

const PageNavWrapper = ({ children }) => {
    // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <Stack
            sx={{
                flexDirection: matchDownSM ? 'row' : 'column',
                borderRight: matchDownSM ? '0' : '1px solid #f0f0f0',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 15%)',
                minWidth: matchDownSM ? 'unset' : '220px',
                maxWidth: matchDownSM ? 'unset' : '220px', // '260px'
                position: 'relative',
                zIndex: 6,
                height: matchDownSM ? '50px' : 'auto'
            }} >
            {children}

        </Stack>
    )
}

export default PageNavWrapper