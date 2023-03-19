// material-ui
import { useMediaQuery } from '@mui/material';
import { Stack } from '@mui/material/index';


// assets

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: '100%'}} >

            </Stack>
            
        </>
    );
};

export default HeaderContent;
