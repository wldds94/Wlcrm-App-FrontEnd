import React from 'react'

// material-ui
import {
    Box,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';

const SimpleHeaderDivider = ({ title, description = false, actions = false, ...others}) => {
    return (
        <Grid item xs={12}/*  sx={{ mb: 2 }} */ >
            <Stack direction="row" justifyContent="space-between" alignItems="end" >
                <Typography variant="h6b" component="div" >{title}</Typography>
                {actions !== false && (
                    <Box>{actions}</Box>
                )}
                {/* <Box>TEST</Box> */}
            </Stack>
            {description !== false && (
                <Typography variant="body2" color="text.secondary" >{description}</Typography>
            )}
            <Divider variant="middle" />
        </Grid>
    )
}

export default SimpleHeaderDivider