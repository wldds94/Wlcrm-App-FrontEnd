import React from 'react'

// material-ui
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormGroup,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    MenuItem,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    Slide,
    Stack,
    Switch,
    Toolbar,
    TextField,
    Typography
} from '@mui/material';

// project import
import MultipleSelectChip from 'components/input/MultipleSelectChip';
import DateTimePickerInput from 'components/input/formik/DateTimePickerInput';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';

const FiltersForm = ({ formData = null, users, handleUserChange, clients, handleClientChange, handleDateChange, ...others }) => {

    return (
        <Box sx={{ p: 2, }}>

            <Grid container spacing={2} /* sx={{ paddingRight: '16px', maxWidth: '100%', mt: 0, ml: 0 }} */ >
                <Grid item xs={12}/*  sx={{ mb: 2 }} */ >
                    <Grid container spacing={1}>
                        <SimpleHeaderDivider title="Filtra per Utente" />
                        <Grid item xs={12}/*  sx={{ mb: 2 }} */ >
                            <MultipleSelectChip
                                id={"users-worker"}
                                label={"Seleziona Utente"}
                                options={users}
                                onChangeCallback={handleUserChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}/*  sx={{ mb: 2 }} */ >
                    <Grid container spacing={1}>
                        <SimpleHeaderDivider title="Cerca nelle Date" /* actions={<HeaderDatesActions />} */ />
                        <Grid item xs={12}/*  sx={{ mb: 2 }} */ >
                            <Grid container spacing={2} >
                                <Grid item xs={12} >
                                    <Typography>Da:</Typography>
                                    {<DateTimePickerInput
                                        id="filter-startDate"
                                        name="startDate"
                                        handleChange={(e) => handleDateChange(e, "startDate")}
                                    />}
                                    {/* <DateTimePickerInput
                                        id="startDate"
                                        name="startDate"
                                    /> */}
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography>A:</Typography>
                                    <DateTimePickerInput
                                        id="filter-endDate"
                                        name="endDate"
                                        handleChange={(e) => handleDateChange(e, "endDate")}
                                    />
                                </Grid>
                            </Grid>
                            {/* <MultipleSelectChip
                                id={"users-client"}
                                label={"Seleziona Paziente"}
                                options={clients}
                                onChangeCallback={handleClientChange}
                            /> */}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }} >
                    <Grid container spacing={1}>
                        <SimpleHeaderDivider title="Filtra per Paziente" />
                        <Grid item xs={12}/*  sx={{ mb: 2 }} */ >
                            <MultipleSelectChip
                                id={"users-client"}
                                label={"Seleziona Paziente"}
                                options={clients}
                                onChangeCallback={handleClientChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* <Grid item xs={12} >
                                <Stack direction="row" justifyContent="space-between">
                                    <Button>
                                        Reset Filtri
                                    </Button>
                                    <Button>
                                        Salva
                                    </Button>
                                </Stack>
                            </Grid> */}

            </Grid>
        </Box>

    )
}

export default FiltersForm