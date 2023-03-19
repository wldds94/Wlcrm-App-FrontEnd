import React from 'react'

// material-ui
import {
    Box,
    Stack,
    Typography,
} from '@mui/material';

const SimpleHeaderBoxed = ({ 
    title = false,
    TitleComponent = false,
    description = false,
    hasAction = false,
    actions = [],
    ActionComponent = () => (<></>),
    lightShadow = false,
    hasGreyBackground = true,
    ...others 
}) => {
    return (
        <>
            {/* CHAT TOP */}
            <Box sx={{
                height: "50px",
                // minHeight: "50px",
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                justifyContent: 'center',
                p: 1.5,
                // borderBottom: "1px solid #d9d9d9",
                boxShadow: lightShadow ? '0px 0px 2px 0px #d9d9d9' : '0px 2px 9px 0px #d9d9d9',
                zIndex: 1,
                background: hasGreyBackground ? '#f5f5f5' : 'white',
                position: 'relative',
            }} >
                <Stack direction="row" justifyContent="space-between" alignItems='center' sx={{ width: '100%', }} >
                    {title && <Typography variant="h6b" component="div" >{title}</Typography>}
                    {TitleComponent && <TitleComponent />}
                    {hasAction !== false && (
                        <>
                            {/* <Stack direction="row">
                                {action}                            
                                <ActionComponent />
                            </Stack> */}
                            <ActionComponent />
                        </>
                    )}
                </Stack>
                {description !== false && (
                    <Typography variant="body2" component="div" color="text.secondary" /* sx={{ pb: 1, }} */ >{description}</Typography>
                )}
            </Box>
        </>
    )
}

export default SimpleHeaderBoxed