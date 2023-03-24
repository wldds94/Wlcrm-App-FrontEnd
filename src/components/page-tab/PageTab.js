import React, { useMemo } from 'react'

// styled
import { Box, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';


const PageTab = ({
    // item = null,
    // client = null,
    // itemsList = [],
    HeaderComponent = () => <></>,
    // headerDependecies = [],
    // ContentComponent = () => <></>,
    FooterComponent = false, // () => <></>,
    children = () => <></>,
    ...other
}) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    
    const HeaderMemo = useMemo(() => (
        <HeaderComponent />
    ), [])

    const FooterMemo = useMemo(() => (
        FooterComponent ? <FooterComponent /> : <></>
    ), [])

    return (
        <div style={{
            position: "relative",
        }}>
            {HeaderMemo}
            {/* <HeaderComponent /> */}
            <Box style={{
                position: "relative",
                paddingTop: '50px',
                paddingBottom: FooterComponent ? '40px' : 0,
                height: matchDownSM ? 'calc(100vh - 110px)' : 'calc(100vh - 60px)',
            }}>
                <div style={{
                    position: "relative",
                    height: '100%',
                    overflow: "auto",
                }}>
                    {children}
                </div>
            </Box>
            {FooterMemo}
        </div>
    )
}

export default PageTab