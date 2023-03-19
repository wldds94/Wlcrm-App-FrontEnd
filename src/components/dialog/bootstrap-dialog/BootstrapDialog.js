import React, { useEffect, useState } from 'react'

// prop-types
import PropTypes from 'prop-types';

// material ui
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { DialogContent, Fade, Stack } from '@mui/material';

// styled
import { styled } from '@mui/material/styles';

// assets
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialogStyled = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const BootstrapDialogTitle = (props) => {
    const { children, onClose, variantTitle, HeaderActions = () => <></>, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} component="div" {...other}>
            <Typography variant={variantTitle} style={{ maxWidth: "95%", display: "block" }} >
                {props?.title && props?.title}
            </Typography>
            {children}
            <Stack direction="row" sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                // color: (theme) => theme.palette.grey[500],
            }}>
                <HeaderActions />
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            // position: 'absolute',
                            // right: 8,
                            // top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </Stack>

        </DialogTitle>
    );
}
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const BootstrapDialog = ({
    onClose,
    open,
    children,
    title = "",
    variantTitle = "h3",
    HeaderActions = () => <></>,
    maxWidth = "sm",
    selectedValue = null,
    ...other
}) => {
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (isOpen !== open) {
            setIsOpen(open)
        }
    }, [open])

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Fade in={isOpen}>
            <BootstrapDialogStyled onClose={handleClose} open={true} fullWidth maxWidth={maxWidth} >
                <BootstrapDialogTitle title={title} onClose={handleClose} variantTitle={variantTitle} HeaderActions={HeaderActions} />

                <DialogContent >
                    {children}
                </DialogContent>
            </BootstrapDialogStyled>
        </Fade>
    )
}

export default BootstrapDialog