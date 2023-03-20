import React, { useEffect } from 'react'

// material-ui
import {
    FormHelperText,
    FormControl,
    TextField,
} from '@mui/material';

// Dayjs
import dayjs from 'dayjs' // ES 2015
// @mui/x-date-pickers
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const DateTimePickerInput = ({
    id,
    name,
    label = "",
    inputValue = null,
    values = [],
    errors = [],
    touched = [],
    handleBlur = () => false,
    handleChange = () => false,
    size = "small",
    // disabled = false,
    formHelper = false,
    ...others
}) => {
    const [value, setValue] = React.useState(inputValue)
    // console.log(value); console.log(values.length);

    useEffect(() => {
        if (inputValue !== value) {
            setValue(inputValue)
        }
    }, [inputValue])

    const handleInputChange = (value) => {
        const newDate = value !== null ? dayjs(value).format() : value
        setValue(newDate)
        // Other logic here

        handleChange(newDate)

    }

    return (
        <>
            <FormControl fullWidth sx={{ m: 0}} >
                <DateTimePicker
                    // label="Data Inizio"
                    value={value}
                    onChange={(value) => { handleInputChange(value); console.log(value); }}
                    renderInput={(params) => <TextField
                        error={Boolean(errors.length && touched.length) && touched[name] && errors[name]}
                        helperText={Boolean(errors.length && touched.length) && touched[name] && errors[name]}
                        id={id}
                        name={name}
                        label={label}
                        margin="normal"
                        variant={others?.variant ? others.variant : "outlined"} // standard
                        // onChange={(value) => {setFieldValue("startDate", value, true); console.log(value);}}
                        onBlur={handleBlur}
                        fullWidth
                        size={size}
                        sx={{ m: 0}}
                        {...params}
                    />}
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
            </FormControl>
        </>
    )
}

export default DateTimePickerInput