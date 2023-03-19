import React, { useEffect, useState } from 'react'

// material-ui
import {
    IconButton,
    Stack,
} from '@mui/material';

// icons
import { CloseIcon, EditIcon } from 'assets/font-icons/icons';

// assets

const EditableButton = ({
    editable = false,
    onClick = (newVal) => {return},
    ...other
}) => {
    const [isEditable, setIsEditable] = useState(editable)
    useEffect(() => {
        if (editable !== isEditable) {
            setIsEditable(editable)
        }
    }, [editable])

    return (
        <Stack>
            <IconButton color="primary" onClick={() => { onClick(!isEditable); setIsEditable(!isEditable); }} >
                {!isEditable ? <EditIcon /> : <CloseIcon />}
            </IconButton>
        </Stack>
    )
}

export default EditableButton