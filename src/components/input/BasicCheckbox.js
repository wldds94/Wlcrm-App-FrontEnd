import React, { useEffect } from 'react'

// material-ui
import {
    Checkbox,
    FormControl,
    FormHelperText,
} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';

// assets
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


const BasicCheckbox = ({
    id,
    name,
    label,
    inputValue,
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    icon = false,
    checkedIcon = false,
    ...props
}) => {
    const [value, setValue] = React.useState(inputValue)

    useEffect(() => {
        if (inputValue !== value) {
            setValue(inputValue)
        }
    }, [inputValue])

    return (
        <>
            {/* <BasicStackInput
                style={{ alignItems: 'center',}}
            > */}
            <FormControl>
                {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
                {/* <Box> */}
                    <Checkbox
                        id={id}
                        name={name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={Boolean(value)}
                        icon={icon !== false ? icon : <CheckBoxOutlineBlankIcon />}
                        checkedIcon={checkedIcon !== false ? checkedIcon : <CheckBoxIcon />}
                        size={props?.size ? props.size : "small"}
                        style={{ padding: 0}}
                    />
                {/* </Box> */}
                {touched[name] && errors[name] && (
                    <FormHelperText error id={"helper-text-" + [name]}>
                        {errors[name]}
                    </FormHelperText>
                )}
            {/* </BasicStackInput>} */}
            </FormControl>
            {/* <FormControl>
                {label && <FormLabel id={id + "-label"}>{label}</FormLabel>}
                <Checkbox
                    id={id}
                    name={name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    checked={Boolean(value)}
                    icon={icon !== false ? icon : <CheckBoxOutlineBlankIcon />}
                    checkedIcon={checkedIcon !== false ? checkedIcon : <CheckBoxIcon />}
                    size={props?.size ? props.size : "small"}
                    style={{ padding: 0 }}
                />
            </FormControl> */}
        </>
    )
}

export default BasicCheckbox