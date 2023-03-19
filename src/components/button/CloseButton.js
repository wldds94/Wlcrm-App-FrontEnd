import { CloseIcon } from 'assets/font-icons/icons'
import React from 'react'
import { IconButton, Stack } from '../../../node_modules/@mui/material/index'

const CloseButton = ({
    Icon = false,
    onClick = () => { return },
    color = "primary",
    ...other
}) => {
    return (
        <Stack alignItems="flex-end" >
            <IconButton color="primary" onClick={() => onClick()}>
                {Icon ? Icon : <CloseIcon />}
            </IconButton>
        </Stack>
    )
}

export default CloseButton