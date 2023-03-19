import React, { useEffect, useMemo, useState } from 'react'

// prop types
import PropTypes from 'prop-types';

// third-party
import SimpleBar from 'components/third-party/SimpleBar';

// material ui
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Box, Grid, Stack, Typography, Tab } from '@mui/material';
// styled
import { useMediaQuery } from '@mui/material';
// styled
import { useTheme, styled } from '@mui/material/styles';


export function TabPanel(props) {

    const { children, value, index, padding = true, fullHeight = false, ...other } = props;

    const [currentValue, setCurrentValue] = useState(value)
    useEffect(() => {
        if (value !== currentValue) {
            setCurrentValue(value)
        }
    }, [value])
    const [currentIndex, setCurrentIndex] = useState(index)
    useEffect(() => {
        if (index !== currentIndex) {
            setCurrentIndex(value)
        }
    }, [index])

    const PanelContent = () => {
        return (
            <div
                role="tabpanel"
                // hidden={value !== index}
                hidden={currentValue !== currentIndex}
                id={`vertical-tabpanel-${currentIndex}`}
                aria-labelledby={`vertical-tab-${currentIndex}`}
                {...other}
                style={{ 
                    width: "100%",/* , overflow: "auto" */
                    padding: padding !== false ? '24px' : 0,
                    height: fullHeight ? 'calc(100vh - 60px)' : 'auto',
                    position: 'relative',
                }}
            >
                {currentValue === currentIndex ? (
                    children
                ) : ""}
                {/* {currentValue === currentIndex ? (
                    <Box sx={{
                        p: padding !== false ? 3 : 0,
                        // height: fullHeight ? 'calc(100vh - 60px)' : 'auto',
                        position: 'relative',
                    }} >// style={{ overflow: "auto" }}
                        {children}
                    </Box>
                ) : ""} */}
            </div >
        )
    }

    return (
        <>
            {value === index &&
                (!fullHeight ? <SimpleBar >
                    <PanelContent />
                </SimpleBar> : <PanelContent />)}
        </>
    )
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
    return {
        id: `account-tab-${index}`,
        'aria-controls': `account-tabpanel-${index}`,
    };
}

export const TabStyled = styled(Tab)(({ theme }) => ({
    justifyContent: 'flex-start', width: "100%", // width: 300,
    gap: '.3rem',
    textAlign: 'left',
    color: '#98989f', // '#686868', // '#41444b', // theme.palette.success.main,
    '&.MuiButtonBase-root': {
        'svg': { fontSize: '1.2rem' },
        '&:hover, &.Mui-selected': {
            backgroundColor: theme.palette.secondary.lighter,
            boxShadow: '0px 3px 6px -2px rgba(0, 0, 0, 20%)',
        },
    },
    // '.MuiTabs-scrollButtons.Mui-disabled': {
    //     opacity: 0.3,
    // }
}));

// export const LinkTabStyled = styled(LinkTab)(({ theme }) => ({
//     justifyContent: 'flex-start', width: "100%", // width: 300,
//     gap: '.3rem',
//     textAlign: 'left',
//     color: '#98989f', // '#686868', // '#41444b', // theme.palette.success.main,
//     '&.MuiButtonBase-root': {
//         '&:hover, &.Mui-selected': {
//             backgroundColor: theme.palette.secondary.lighter,
//             boxShadow: '0px 3px 6px -2px rgba(0, 0, 0, 20%)',
//         },
//     },
//     // '.MuiTabs-scrollButtons.Mui-disabled': {
//     //     opacity: 0.3,
//     // }
// }));

export const TabsStyled = ({
    matchDownSM,
    value,
    onChange,
    ariaLabel,
    children,
    ...other
}) => {
    return (
        <Tabs
            orientation={!matchDownSM ? "vertical" : "horizontal"}
            value={value}
            onChange={onChange}
            aria-label={ariaLabel}
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons
        >
            {children}
        </Tabs>
    )
}

export const TabsBoxContainer = ({
    matchDownSM,
    fullScreenMainHeight,
    Nav,
    Content,
    children,
    ...other
}) => {

    // // const Navigation = () => <Nav />
    // const Navigation = useMemo(() => {
    //     return (
    //         <Stack
    //             sx={{
    //                 borderRight: matchDownSM ? '0' : '1px solid #f0f0f0',
    //                 boxShadow: '0px 1px 4px rgba(0, 0, 0, 15%)',
    //                 width: matchDownSM ? 'unset' : '260px',
    //                 zIndex: 6,
    //             }} >
    //             {/* {nav} */}
    //             {/* {Nav()} */}
    //             <Nav />
    //             {/* <Navigation /> */}
    //         </Stack>
    //     )
    // }, [Nav])
    return (
        <Box
            sx={{
                flexGrow: 1,
                // bgcolor: 'background.paper', 
                display: matchDownSM ? "block" : 'flex',
                height: matchDownSM ? "unset" : fullScreenMainHeight // fullScreenMainHeight
            }}
        >
            <Stack
                sx={{
                    borderRight: matchDownSM ? '0' : '1px solid #f0f0f0',
                    boxShadow: '0px 1px 4px rgba(0, 0, 0, 15%)',
                    minWidth: matchDownSM ? 'unset' : '260px',
                    // maxWidth: matchDownSM ? 'unset' : '260px',
                    zIndex: 6,
                    height: matchDownSM ? '50px' : 'auto',
                }} >
                <Nav />
                {/* {Nav} */}

            </Stack>
            {/* <Navigation /> */}
            {/* {Navigation} */}

            {Content ? <Content /> : ""}
        </Box>
    )
}

export const TabHeaderContainer = ({ children, ...other }) => {
    // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <Grid item xs={12}
            style={{ /* borderRight: '1px solid', */
                display: matchDownSM ? 'flex' : 'block', 
                borderBottom: matchDownSM ? 'unset' : '1px solid #f0f0f0', 
                // borderColor: '#f0f0f0', 
                padding: matchDownSM ? '0.5rem' : '1.5rem 1rem',/* '12px 16px' */ 
                marginLeft: matchDownSM ? '1rem' : '0',/* '12px 16px' */ 
            }} >
            <Stack direction="row" spacing={1} sx={{ width: "100%", }} >
                {/* <Box sx={{ width: "100%", alignSelf: 'center', }} >
                {children}
            </Box> */}
                {children}
            </Stack>
        </Grid>
    )
}

// export const TabPanelContainer = ({
//     matchDownSM,
//     fullScreenMainHeight,
//     value,
//     index,
//     component = 'div',
//     children,
//     ...other
// }) => {
//     return (
//         <TabPanel
//             value={value}
//             index={index}
//             component={component}
//         >
//             {children}
//         </TabPanel>
//     )
// }