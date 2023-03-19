import React from 'react'
// material ui
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
// styled
import { useTheme } from '@mui/material/styles';

import SimpleBar from 'simplebar-react';

const PagePanel = (props) => {
    // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        routers,
        children,
        padding = true,
        fullHeight = false,
        // ...props
    } = props;

    const PanelContent = (/* {children} */) => {
        return (
            <Box
                sx={{
                    p: padding ? 3 : 0, 
                    width: "100%",
                    height: matchDownSM ? 'calc(100vh - 110px)' : '100%',
                    overflow: "auto",
                    position: 'relative',
                }}
            >

                {children}
            </Box>
        )
    }

    const PanelWrapper = () => {
        return (
            <>
                {fullHeight ? <SimpleBar >
                    <PanelContent>
                        {children}
                    </PanelContent>
                </SimpleBar> : <PanelContent />}
            </>

        )
    }

    return (
        <>
            <PanelWrapper>
                {children}
            </PanelWrapper>
        </>
    )
}

export default PagePanel