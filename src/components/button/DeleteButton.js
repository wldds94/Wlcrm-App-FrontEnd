import React, { useEffect } from 'react'

// material-ui
import {
    Button,
    IconButton,
    Stack,
} from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// icons
import { DeleteIcon } from 'assets/font-icons/icons';
import ConfirmationDialog from 'components/dialog/confirmation/ConfirmationDialog';


const DeleteButton = ({
    isSubmitting = false,
    setSubmitting = () => { return },
    label = false,
    icon = false,
    size = "small",
    variant = "contained",
    color = false,
    onClick = () => { return },
    onConfirm = false,
    confirmDialogTitle = "Sei sicuro di voler confermare questa operazione?",
    withAnimation = true,
    ...others
}) => {
    const anchorRef = React.useRef()
    const [anchorEl, setAnchorEl] = React.useState()

    const [disabled, setDisabled] = React.useState(isSubmitting)
    const [confirmOpen, setConfirmOpen] = React.useState(false)

    useEffect(() => {
        // console.log('Check Submitting');
        if (disabled != isSubmitting) {
            setDisabled(isSubmitting)
        }
    }, [isSubmitting])

    const ButtonContainer = () => {
        return (
            <>
                {label === "" ?
                    <IconButton
                        disabled={disabled}
                        size={size}
                        variant={variant}
                        color={color !== false ? (color === "" ? "error" : color) : "secondary"}
                        onClick={onConfirm !== false ? () => setConfirmOpen(true) : () => onClick()}
                    >
                        {/* <input hidden accept="image/*" type="file" /> */}
                        {icon === false ? <DeleteIcon /> : icon}
                    </IconButton>
                    : <Button
                        disableElevation
                        disabled={disabled}
                        fullWidth
                        size={size}
                        variant={variant}
                        color={color !== false ? (color === "" ? "error" : color) : "secondary"}
                        // color={"secondary"}
                        style={{ gap: ".5rem" }}
                        startIcon={icon === false ? <DeleteIcon /> : icon}
                        onClick={() => {
                            if (onConfirm !== false) {
                                setConfirmOpen(true)
                            } else {
                                onClick()
                            }
                            //  ? () =>  : () => onClick()
                        }}
                    >
                        {/* <SaveOutlined /><span> Salva Servizio</span> */}
                        {label === false ? "Elimina" : label}
                    </Button>}
            </>
        )
    }

    return (
        <>
            {withAnimation ? 
                <AnimateButton>
                    <ButtonContainer />
                </AnimateButton> : 
                <Stack justifyContent="center">
                    <ButtonContainer />
                </Stack>}

            {onConfirm !== false && (
                <ConfirmationDialog
                    title={confirmDialogTitle} // "Sei sicuro?"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={onConfirm}
                />
                /*     Are you sure you want to delete this post?
                </ConfirmDialog> */
            )}
        </>

    )
}

export default DeleteButton