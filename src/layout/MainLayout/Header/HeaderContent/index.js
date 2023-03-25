// material-ui
import { useMediaQuery } from '@mui/material';
import { Stack } from '@mui/material/index';

// project import
import Profile from './Profile';
// import Notification from './Sync/Notification';
// import Preferences from './Preferences/Preferences';
// import Messages from './Messages/Messages';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: '100%'}} >
                <Profile />
            </Stack>
            
        </>
    );
};

export default HeaderContent;
