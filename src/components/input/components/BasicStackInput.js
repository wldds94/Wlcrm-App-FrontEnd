import React from 'react'

// material-ui
import {
    Stack,
} from '@mui/material';
import Divider from '@mui/material/Divider';

const BasicStackInput = ({ style = {}, children, ...others }) => {
    return (
        <Stack
            spacing={1}
            sx={{
                ['&>:not(style)+:not(style)']: {
                    marginTop: 0,
                }
            }}
            style={{
                ...style
            }}
        >
            {children}
        </Stack>
    )
}

export default BasicStackInput