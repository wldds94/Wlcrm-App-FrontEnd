import React from 'react'

// material ui
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from '@mui/material';

// icons
import { CheckIcon, CloseIcon } from 'assets/font-icons/icons';


const ConfirmationDialog = ({
    title,
    children,
    open,
    setOpen,
    onConfirm,
    content = false,
    // onClose = false, //  () => false,
    ...other 
}) => {
    // const { title, children, open, setOpen, onConfirm } = props;
    // const anchorRef = useRef(null);

    const handleClose = (event) => {
        // if (anchorRef.current && anchorRef.current.contains(event.target)) {
        //     return;
        // }
        setOpen(false);
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            // anchorEl={anchorRef.current}
            onClose={handleClose/* () => setOpen(false) */}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            {content !== false && (
                <DialogContent>
                    {content}
                </DialogContent>
            )}
            <DialogActions>
                <IconButton
                    variant="outlined"
                    onClick={handleClose}
                    color="error"
                // sx={{ border: 0 }}
                >
                    {/* No */}
                    <CloseIcon />
                </IconButton>
                <IconButton
                    variant="outlined"
                    onClick={() => {
                        handleClose();
                        onConfirm();
                    }}
                    color="success"
                >
                    {/* Yes */}
                    <CheckIcon />
                    {/* Si */}
                </IconButton>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog