import React, { useEffect, useState } from 'react'

// material-ui
import {
    Autocomplete,
    Box,
    FormHelperText,
    TextField,
} from '@mui/material';
import AppointmentCardContent from 'pages/calendar/common/events/AppointmentCardContent';

const EventsAutocompleteField = ({
    freeSolo = true,
    id = "EventsAutocompleteField",
    name = "EventsAutocompleteField",
    label = "",
    inputValue = "",
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    size = "small",
    placeholder = "Inizia a digitare",
    // disabled = false,
    formHelper = false,
    options = [],
    getOptionLabel = (option) => option.label,// {function(option) { return option.label } },
    isOptionEqualToValue = (option, value) => option.value === value.value,
    identifierField = "id",
    noOptionsText = 'Nessuna selezione disponibile',
    ...others
}) => {
    // console.log("EventsAutocompleteField");
    const [value, setValue] = useState(
        values[name] > 0 ? findOption(values[name]) : null // values[name] > 0 ? (options.find(option => Number(option[identifierField]) === Number(values[name]))) : null
    )

    useEffect(() => {
        if (values[name] !== value?.[identifierField] /* && Number(values[name]) > 0 */) {
            if (Number(values[name]) > 0) {
                setValue(findOption(values[name]))
            } else {
                setValue(null)
            }
        } // console.log(values[name]);
    }, [values[name]])

    function findOption(value) {
        return options.find(option => Number(option[identifierField]) === Number(value))
    }

    const handleInputChange = (e, value) => {
        setValue(value?.[identifierField] ? value : null)
        // callback
        handleChange(value, e)
    }

    return (
        <>
            <Autocomplete
                disablePortal
                id={id}
                name={name}
                options={options}
                noOptionsText={noOptionsText}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue} // isOptionEqualToValue={(option, value) => value.description === option.description /* option.id === value.id */}
                onChange={(e, value) => {
                    handleInputChange(e, value)
                }}
                value={value} // {values?.clientId ? clientSelected : null}
                renderOption={(props, option) => (
                    <Box component="div" /* sx={{ '& > img': { mr: 2, flexShrink: 0 } }} */ {...props}>
                        <AppointmentCardContent
                            item={option}
                            withClientInfo={true}
                            withActions={false}
                            withContactInfo={false}
                            toggleNotes={false}
                        />
                    </Box>

                )}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        id={`${id}_field`}
                        name={`${name}_field`}
                        size="small"
                        placeholder={placeholder !== false ? placeholder : ""}
                        fullWidth
                        variant="outlined" // "standard"
                        label={label}
                        onBlur={handleBlur}
                        error={Boolean(touched.clientId && errors.clientId)}
                    />
                }
            />
            {touched[name] && errors[name] && (
                <FormHelperText error id={"helper-text-" + [name]}>
                    {errors[name]}
                </FormHelperText>
            )}
            {formHelper !== false &&
                <FormHelperText id={"helper-text-" + [name]}>
                    {formHelper}
                </FormHelperText>}
        </>
    )
}

export default EventsAutocompleteField