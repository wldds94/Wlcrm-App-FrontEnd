// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme, props }) => ({
    position: props?.relative? 'relative' : 'fixed',
    top: 0,
    left: 0,
    zIndex: 2001,
    width: '100%',
    boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 25%)',
    // height: '5px',
    // borderRadius: 0,
    '& > span': {
        borderRadius: 0,
        height: '3px',
    }, 
    '& > * > span': {
        borderRadius: 0,
    },
    '& > * + *': {
        marginTop: theme.spacing(2)
    }
}));

// ==============================|| Loader ||============================== //

// const Loader = () => (
//     <LoaderWrapper>
//         <LinearProgress color="primary" />
//     </LoaderWrapper>
// );

const Loader = () => (
    <LoaderWrapper>
        <LinearProgress color="primary" />
    </LoaderWrapper>
);

export default Loader;
