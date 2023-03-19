import React from 'react'

// mui material
import Box from '@mui/material/Box';
import { CircularProgress, Dialog } from '@mui/material'


const SecondaryAjaxLoading = () => {
    return (
        <div style={{
            // position: 'fixed',
            // top: '80px',
            // right: '30px',
            // zIndex: 99999,
            background: 'white',
            padding: '.5rem',
            borderRadius: '6px',
            boxShadow: '0px 3px 15px 1px #747474',
            width: 'fit-content',
            alignSelf: 'end',
        }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress size={35} />
            </Box>
        </div>
    )
}

export default SecondaryAjaxLoading