import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    IconButton,
    Typography,
    Stack
} from '@mui/material';

// project import
import InvoicePrintButton from '../common/InvoicePrintButton';

// icons
import { ClearIcon, SendMailIcon } from 'assets/font-icons/icons';

const HeaderPreview = ({ 
    item = {}, 
    handleClose = () => { return }, 
    ...other 
}) => {
    const [previewItem, setPreviewItem] = useState(item)
    useEffect(() => {
        if (JSON.stringify(previewItem) !== JSON.stringify(item)) {
            setPreviewItem(item)
        }
    }, [item])
    const actions = [
        {
            icon: <SendMailIcon />,
            onClick: () => { return }
        },
        {
            icon: <ClearIcon sx={{ fontSize: '1.1rem', }} />,
            onClick: () => { handleClose() },
        }
    ]

    return (
        <div style={{
            position: "absolute",
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ /* pt: 1.5, pb: 1, */ pl: 3, pr: 2, width: "100%", }} >
                {/* <div><Typography variant="h6" color="secondary" >Fattura</Typography></div> */}
                <Typography variant="h6" color="secondary" >Preview Fattura</Typography>
                <Stack direction="row" >
                    <InvoicePrintButton
                        item={previewItem}
                    />
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

export default HeaderPreview