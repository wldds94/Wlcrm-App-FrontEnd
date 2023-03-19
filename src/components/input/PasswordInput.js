import React, { useEffect } from 'react'

// material-ui
import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// utils
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import BasicStackInput from './components/BasicStackInput';

const PasswordInput = ({ 
    id,
    name,
    label,
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    visibilityToggle = true,
    hasLevel = false,
    size = "small",
}) => {
    const [value, setValue] = React.useState(values[name])

    const [level, setLevel] = React.useState();
    const [showPassword, setShowPassword] = React.useState(false);

    useEffect(() => {
        if (values[name] !== value) {
            setValue(values[name])
        }
    }, [values[name]])

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    React.useEffect(() => {
        changePassword('');
    }, [])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleInputChange = (e) => {
        // Prevent re mounting if equals & jumping cursor
        setValue(e.currentTarget.value)
        changePassword(e.target.value);
        handleChange(e)
    }

    return (
        <>
            <BasicStackInput>
            {/* <Stack spacing={1}> */}
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInput
                    fullWidth
                    error={Boolean(touched[name] && errors[name])}
                    id={id} // "confirm_password-reset"
                    type='password' // {showPassword ? 'text' : 'password'}
                    value={value/* values.confirm_password */}
                    name={name} // "confirm_password"
                    onBlur={handleBlur}
                    size={size}
                    placeholder="******"
                    onChange={handleInputChange/* (e) => {
                        handleChange(e);
                    } */}
                    endAdornment={
                        visibilityToggle && <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                // size={"large"} // size={size}
                                sx={{ fontSize: '1.2rem' }}
                            >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {touched[name] && errors[name] && (
                    <FormHelperText error id={"helper-text-"+ id}>
                        {errors[name]} Test error
                    </FormHelperText>
                )}
            {/* </Stack> */}
            </BasicStackInput>
            {hasLevel !== false
                &&
                <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                                {level?.label}
                            </Typography>
                        </Grid>
                    </Grid>
                </FormControl>}
        </>

    )
}

export default PasswordInput