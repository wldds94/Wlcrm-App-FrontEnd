import React, { useEffect, useRef, useState } from 'react';

// material-ui
import {
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { IconButton } from '../../../node_modules/@mui/material/index';
import { CloseIcon } from 'assets/font-icons/icons';


const BasicOutlinedInput = ({
    id,
    name,
    type = "text",
    label = "",
    placeholder = "",
    inputValue = "",
    values = [],
    errors = [],
    touched = [],
    handleBlur = () => false,
    handleChange = () => false,
    endAdornment = false,
    // onClickEndAdornment = 
    readOnly = false,
    disabled = false,
    formHelper = false,
    withReset = false,
    inputProps = {},
    InputComponent = false,
    ...props
}) => {
    const [value, setValue] = React.useState(inputValue)
    const [isDisabled, setIsDisabled] = React.useState(disabled)
    const [isReadOnly, setIsReadOnly] = React.useState(readOnly)

    // const [cursor, setCursor] = React.useState(null);
    // const inputRef = React.useRef(null)

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

    // useEffect(() => {
    //     const input = inputRef.current;
    //     if (input) input.setSelectionRange(cursor, cursor);
    // }, [inputRef, cursor, value]);

    const handleReset = () => {
        setValue("")
        handleChange(null, "")
    }

    const handleInputChange = (e) => {
        // Prevent re mounting if equals & jumping cursor
        setValue(e.currentTarget.value)
        handleChange(e, e.currentTarget.value)
    }

    const dynamicProps = {
        ...(InputComponent !== false ? {
            inputComponent: () => <InputComponent name={name} onChange={handleInputChange} />
        } : {})
    }

    return (
        <>
            {/* <Stack spacing={1} sx={{
                ['&>:not(style)+:not(style)']: {
                    marginTop: 0,
                }
            }}> */}
            <FormControl fullWidth /* sx={{ m: 1, width: '100%'}}  */ variant={"outlined"}>
                {(label /* && !(isDisabled || isReadOnly) */) && <InputLabel htmlFor={id}>{label}</InputLabel>}
                <OutlinedInput
                    id={id}
                    type={type}
                    value={value}
                    name={name}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    fullWidth
                    multiline={props?.multiline ? true : false}
                    rows={props?.multiline ? (props?.rows ? props?.rows : 3) : 0}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    error={Boolean(touched[name] && errors[name])}
                    inputProps={{...inputProps}}
                    endAdornment={withReset ?
                        <IconButton
                            size="small"
                            sx={{ position: 'absolute', right: 0, }}
                            onClick={() => { handleReset() }}
                            disabled={value.length > 0 ? false : true}
                            color={value.length > 0 ? 'primary' : 'secondary'}
                        >
                            <CloseIcon style={{ fontSize: '1.1rem'}} />
                        </IconButton>
                        : (endAdornment !== false ?
                            <InputAdornment position="end">{endAdornment}</InputAdornment>
                            : "")}
                    size={props?.size ? props.size : "small"}
                    {...dynamicProps}
                />
                {(isDisabled || isReadOnly) ? (
                    <>{/* <TextField
                        variant="standard"
                        id={id}
                        type={type}
                        value={value}
                        name={name}
                        onBlur={handleBlur}
                        // onChange={handleInputChange}
                        placeholder={label}
                        fullWidth
                        multiline={props?.multiline ? true : false}
                        rows={props?.multiline ? (props?.rows ? props?.rows : 3) : 0}
                        disabled={isDisabled}
                        readOnly={isReadOnly}
                        error={Boolean(touched[name] && errors[name])}
                        // endAdornment={endAdornment !== false ?
                        //     <InputAdornment position="end">{endAdornment}</InputAdornment>
                        //     : ""}
                        size={props?.size ? props.size : "small"}
                    /> */}
                        {/* <OutlinedInput
                            id={id}
                            type={type}
                            value={value}
                            name={name}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            fullWidth
                            multiline={props?.multiline ? true : false}
                            rows={props?.multiline ? (props?.rows ? props?.rows : 3) : 0}
                            disabled={isDisabled}
                            readOnly={isReadOnly}
                            error={Boolean(touched[name] && errors[name])}
                            endAdornment={endAdornment !== false ?
                                <InputAdornment position="end">{endAdornment}</InputAdornment>
                                : ""}
                            size={props?.size ? props.size : "small"}
                        /> */}</>
                ) : (
                    <>
                        {/* <OutlinedInput
                        id={id}
                        type={type}
                        value={value}
                        name={name}
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        fullWidth
                        multiline={props?.multiline ? true : false}
                        rows={props?.multiline ? (props?.rows ? props?.rows : 3) : 0}
                        disabled={isDisabled}
                        readOnly={isReadOnly}
                        error={Boolean(touched[name] && errors[name])}
                        endAdornment={endAdornment !== false ?
                            <InputAdornment position="end">{endAdornment}</InputAdornment>
                            : ""}
                        size={props?.size ? props.size : "small"}
                    /> */}</>
                )}
                {touched[name] && errors[name] && (
                    <FormHelperText error id={"helper-text-errors" + [name]}>
                        {errors[name]}
                    </FormHelperText>
                )}
                {formHelper !== false &&
                    <FormHelperText id={"helper-text-" + [name]}>
                        {formHelper}
                    </FormHelperText>}

            </FormControl>

            {/* <BasicStackInput>
                {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
                <OutlinedInput
                    id={id}
                    type={type}
                    value={value}
                    name={name}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    fullWidth
                    multiline={props?.multiline ? true : false}
                    rows={props?.multiline ? (props?.rows ? props?.rows : 3) : 0}
                    disabled={isDisabled}
                    error={Boolean(touched[name] && errors[name])}
                    endAdornment={endAdornment !== false ?
                        <InputAdornment position="end">{endAdornment}</InputAdornment>
                        : ""}
                    size={props?.size ? props.size : "small"}
                // inputRef={inputRef}
                />
                {touched[name] && errors[name] && (
                    <FormHelperText error id={"helper-text-errors" + [name]}>
                        {errors[name]}
                    </FormHelperText>
                )}
                {formHelper !== false &&
                    <FormHelperText id={"helper-text-" + [name]}>
                        {formHelper}
                    </FormHelperText>}
                
            </BasicStackInput> */}
            {/* </Stack> */}
        </>
    )
}

export default BasicOutlinedInput