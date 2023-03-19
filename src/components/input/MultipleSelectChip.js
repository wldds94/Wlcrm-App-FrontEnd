import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
// styled
import { alpha } from '@mui/material/styles';

// assests
import CancelIcon from '@mui/icons-material/Cancel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// const names = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
// ];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultipleSelectChip = ({ id, label, options = [], inputValue = null, ...others }) => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState(inputValue?.length > 0 ? inputValue : []);
    React.useEffect(() => {
        if (inputValue !== null) {
            setPersonName(inputValue)
        }
    }, [inputValue])

    const selectRef = React.useRef();

    const handleChange = (event) => {
        console.log('Handle Change.');
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        others?.onChangeCallback && others?.onChangeCallback(event, value)
    };

    const handleDelete = (event, value) => {
        console.log('Handle delete.');
        // e.preventDefault();
        const newPerson = personName.filter(name => {
            // console.log(name); console.log(value);
            return name !== value
        })
        // console.log(personName); console.log(newPerson);
        setPersonName(newPerson);
        others?.onChangeCallback && others?.onChangeCallback(event, newPerson)

    };

    // const onEscape = () => {
    //     console.log('Is Closing...');
    //     console.log(selectRef);
    //     selectRef.current.blur();
    // };

    // const onOpen = () => {
    //     console.log('Is Opening...');
    //     console.log(selectRef);
    //     selectRef.current.focus();
    // }

    return (
        <>
            {/* <div> */}
            <FormControl fullWidth /* sx={{ m: 1, width: 300  }}*/ >
                <InputLabel id={id + "-label" /* "demo-multiple-chip-label" */}>{label}</InputLabel>
                <Select
                    labelId={id + "-label" /* "demo-multiple-chip-label" */}
                    id={id/* "demo-multiple-chip" */}
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput /* inputRef={selectRef} */ id={id + "-chip"/* "select-multiple-chip" */} label={label/* "Chip" */} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                                const option = options.filter(option => option.id === value)[0]
                                // console.log(option); // console.log(value);
                                return (
                                    <Chip
                                        key={value}
                                        label={option?.name}
                                        onDelete={(e) => { handleDelete(e, value) }}
                                        onMouseDown={(event) => event.stopPropagation()}
                                        sx={{ background: alpha(option?.color, .8)/* `rgba(${option?.color}, .8)` */, color: '#fff' }}
                                        deleteIcon={<CancelIcon sx={{ color: '#fff !important' }} />}
                                    // size={others?.size ? others.size : "small"}
                                    />
                                )
                            })}
                        </Box>
                    )}
                    // size={others?.size ? others.size : "small"}
                    MenuProps={MenuProps}
                >
                    {options?.map((user) => (
                        <MenuItem
                            key={user?.id}
                            value={user?.id}
                            style={getStyles(user?.name, options, theme)}
                        >
                            {user?.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* </div> */}
        </>
    );
}

export default MultipleSelectChip
