import React, { useEffect } from 'react'

// material-ui
import {
    Box,
    Button,
    Checkbox,
    FormGroup,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    MenuItem,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';

const BasicSelect = ({
    id,
    name,
    // type = "text",
    label = "",
    placeholder = "",
    errors = false,
    touched = false,
    inputValue,
    values = false,
    handleBlur = () => {return},
    handleChange = () => {return},
    endAdornment = false,
    readOnly = false,
    disabled = false,
    formHelper = false,
    options = [],
    ...props
}) => {
    const [value, setValue] = React.useState(inputValue)
    const [isDisabled, setIsDisabled] = React.useState(disabled)
    const [isReadOnly, setIsReadOnly] = React.useState(readOnly)

    useEffect(() => {
        if (inputValue !== value) {
            setValue(inputValue)
        }
    }, [inputValue])

    useEffect(() => {
        if (disabled !== isDisabled) {
            setIsDisabled(disabled)
        }
    }, [disabled])

    useEffect(() => {
        if (readOnly !== isReadOnly) {
            setIsReadOnly(readOnly)
        }
    }, [readOnly])

    return (
        <>
            {/* <BasicStackInput> */}
            {/* <Stack spacing={1} sx={{
                ['&>:not(style)+:not(style)']: {
                    marginTop: 0,
                }
            }}> */}
            <FormControl sx={{ width: '100%' }} >
                {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
                <Select
                    id={id}
                    name={name}
                    value={value}
                    label=""
                    onBlur={handleBlur}
                    onChange={(e) => {handleChange(e, value)}}
                    size={props?.size ? props.size : "small"}
                    readOnly={isReadOnly}
                    disabled={isDisabled}
                >
                    {Array.isArray(options) ?
                        options?.map((opt, index) => {
                            return <MenuItem key={index} value={opt.value} >{opt.label}</MenuItem>
                        }) : Object.keys(options)?.map(opt => (
                            <MenuItem key={opt} value={opt}>{options[opt]}</MenuItem>
                        ))}
                    {/* <MenuItem value='active' >Active</MenuItem>
                    <MenuItem value='inactive' >Inactive</MenuItem>
                    <MenuItem value='trash'>Cestino</MenuItem> */}
                </Select>

                {/*  <OutlinedInput
                    id={id}
                    type={type}
                    value={value}
                    name={name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={placeholder}
                    fullWidth
                    multiline={props?.multiline ? true : false}
                    rows={props?.multiline ? (props?.row ? props?.row : 2) : 0}
                    disabled={isDisabled}
                    error={Boolean(touched[name] && errors[name])}
                    endAdornment={endAdornment !== false ?
                        <InputAdornment position="end">{endAdornment}</InputAdornment>
                        : ""}
                /> */}
                {touched[name] && errors[name] && (
                    <FormHelperText error id={"helper-text-" + [name]}>
                        {errors[name]}
                    </FormHelperText>
                )}
                {formHelper !== false &&
                    <FormHelperText id={"helper-text-" + [name]}>
                        {formHelper}
                    </FormHelperText>}
            </FormControl>

            {/* </Stack> */}
            {/* </BasicStackInput> */}
        </>
    )
}

export default BasicSelect