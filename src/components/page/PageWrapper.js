import React from 'react'

// material ui
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
// styled
import { useTheme } from '@mui/material/styles';

// config
import { fullScreenMainHeight } from 'config';

const PageWrapper = ({ children }) => {
    // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                flexGrow: 1,
                // bgcolor: 'background.paper', 
                display: matchDownSM ? "block" : 'flex',
                height: matchDownSM ? "unset" : fullScreenMainHeight, // fullScreenMainHeight
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {children}
        </Box>
    )
}

export default PageWrapper