import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    IconButton,
    Stack,
    Typography
} from '@mui/material';

// project import
import InfoListItem from 'components/typography/InfoListItem';

// icons
import { BiSearchAlt } from 'react-icons/bi'
import BasicOutlinedInput from '../BasicOutlinedInput'

const SearchField = ({
    open = false,
    onChange = (value) => { return },
    disabled = false,
}) => {
    console.log(disabled);
    const [isOpen, setIsOpen] = useState(open)

    // const [isDisabled, setIsDisabled] = useState(disabled)
    // useEffect

    const [value, setValue] = useState("")

    const handleOpen = (newVal) => {
        if (newVal !== isOpen) {
            if (newVal) {
                setIsOpen(newVal)
            } else {
                if (!(value?.length > 0)) {
                    setIsOpen(false)
                }
            }
        }
    }

    const handleChange = (e, value) => {
        // console.log(value);
        setValue(value)
        onChange(value)
    }

    return (
        <>
            {(isOpen || value?.length > 0) && <BasicOutlinedInput
                placeholder="Almeno 3 caratteri"
                handleChange={handleChange}
                inputValue={value}
                withReset={true}
            />}
            <IconButton
                color={(isOpen || value?.length > 0) ? 'primary' : 'secondary'}
                onClick={() => handleOpen(!isOpen)}
                disabled={disabled}
            >
                <BiSearchAlt />
            </IconButton>

        </>
    )
}

export default SearchField