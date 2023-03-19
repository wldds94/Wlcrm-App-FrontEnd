import React from 'react'

// mui material
import Box from '@mui/material/Box';
import { CircularProgress, Dialog } from '@mui/material'

const AjaxLoading = () => {
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: 'auto', overflow: 'hidden', padding: '1rem' } }}
            // fullWidth={true}
            // maxWidth='md'
            open={true}
        >
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Dialog>
    )
}

export default AjaxLoading