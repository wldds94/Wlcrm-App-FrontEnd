import React, { useEffect } from 'react'

// material ui
// import Snackbar from '@mui/material/Snackbar';
import { Box, /* Alert,  */AlertTitle, IconButton, Snackbar, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import MuiAlert from '@mui/material/Alert';

// Reduc
import { useDispatch } from "react-redux";
import { deleteNotice, hideNotice } from 'store/reducers/notices';

// assets
import CloseIcon from '@mui/icons-material/Close';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        {...props} />;
});


const SnackNotice = ({
    created,
    open = true,
    severity = "success",
    title = null, content,
    dismissed = false,
    ...props
}) => {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = React.useState(open);

    const autoHideDuration = 5000
    const deelay = 1
    const [progress, setProgress] = React.useState(0);
    // const [timeProgress, setTimeProgress] = React.useState(0);

    const handleClose = () => {
        // dispatch(hideNotice({ id: props.id }))
        setProgress(100)
    }

    useEffect(() => {
        if (open != isOpen) {
            setIsOpen(open)
        }
    }, [open])

    useEffect(() => {
        const timer = setInterval(() => {

            setProgress(oldProgress => {
                return Math.min((oldProgress + Number((100 / autoHideDuration) * 100)), 100)
            })
        }, 100);
        return () => {
            // console.log('Cleaning Interval');
            clearInterval(timer);
        };
    }, [])

    useEffect(() => {
        // const dispatchedTimeout = setTimeout(() => {
        //     dispatch(deleteNotice({ id: props.id }))
        // }, autoHideDuration)
        if (progress === 100) {
            // if (progress === 100) {
            dispatch(deleteNotice({ id: props.id }))
        }
    }, [progress])

    // const dispatchedTimeout = setTimeout(() => {
    //     setIsOpen(false) // dispatch(deleteNotice({ id: props.id }))
    // }, autoHideDuration)

    return (
        <Snackbar open={isOpen} sx={{ width: 'fit-content', alignSelf: 'end', position: 'relative', paddingRight: '.5rem' }} >
            <Alert sx={{ width: 'fit-content', alignSelf: 'end', position: 'relative', paddingRight: '4rem' }} severity={severity} >
                {title != null && <AlertTitle><strong>{title[0].toUpperCase() + title.slice(1)}</strong></AlertTitle>}
                {content}{/* This is an error alert — <strong>check it out!</strong> */}
                <IconButton
                    onClick={() => { handleClose(); }}
                    sx={{
                        margin: '0',
                        padding: '0',
                        position: 'absolute',
                        top: '.5rem',
                        right: '.5rem',
                    }}
                >
                    <CloseIcon color="inherit" size="small" />
                </IconButton>
                <Box sx={{
                    width: '100%',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: '4px', }} color={severity} />
                    </Box>
                </Box>
            </Alert>
        </Snackbar>
    )
}

export default SnackNotice