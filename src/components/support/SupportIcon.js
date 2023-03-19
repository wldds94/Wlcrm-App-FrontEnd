import React from 'react'

// material ui
import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import ClickAwayListener from '@mui/material/ClickAwayListener';

// images
import supportImg from 'assets/images/support/support.png'


const SupportIcon = () => {
    return (
        <>
            <Avatar
                alt="Support"
                src={supportImg}
                sx={{ width: 20, height: 20 }}
            />
        </>
    )
}

export default SupportIcon