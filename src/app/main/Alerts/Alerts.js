import React from 'react'
import { useSelector } from 'react-redux';

// material-ui
import { Stack } from '@mui/material';

// project import
import SnackNotice from './components/SnackNotice';

const Alerts = () => {

    const { notices } = useSelector((state) => state.notices);

    return (
        <Stack /* sx={{ width: 'auto', position: 'fixed', top: '5rem', right: '2rem', zIndex: '99999999' }} */ spacing={2}>
            {notices.map((alert) => 
                <SnackNotice
                    key={alert.id}
                    id={alert.id} 
                    title={alert?.title} 
                    content={alert?.content} 
                    severity={alert?.severity} 
                    open={alert?.open}
                    dismissed={alert?.dismissed}
                    created={alert?.created}
                />)}
        </Stack>
    )
}

export default Alerts