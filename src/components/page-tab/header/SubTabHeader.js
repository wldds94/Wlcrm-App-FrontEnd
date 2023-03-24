import React from 'react'

// material-ui
import {
    Box,
    IconButton,
    Stack
} from '@mui/material';

const SubTabHeader = ({
    item = null,
    TitleComponent = () => <></>,
    // client = null,
    actions = [],
    OffActions = () => (<></>),
    absolutePosition = true,
    ...other
}) => {
    return (
        <div style={{
            position: absolutePosition ? "absolute" : 'relative',
            left: 0,
            top: 0,
            width: '100%',
            height: '50px',
            background: 'white',
            zIndex: 3,
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 20%)',
            display: 'flex',
            alignItems: "center",
        }}>
            <Stack direction="row" justifyContent="space-between" sx={{ /* pt: 1.5, pb: 1, */ pl: 3, pr: 2, width: "100%", }} >
                {/* <InvoiceTitle item={item} /> */}
                {/* <TitleComponent /> */}
                {item?.titleComponent ? item.titleComponent : <TitleComponent />}
                <Stack direction="row" >
                    <OffActions />
                    {actions?.map((action, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', }}>
                                <IconButton onClick={() => action?.onClick()}
                                    sx={{ fontSize: item?.fontSize ? item.fontSize : '1.3rem !important', }} >
                                    {action?.icon}
                                </IconButton>
                            </Box>
                        )
                    })}
                </Stack>
            </Stack>
        </div>
    )
}

export default SubTabHeader