import React, { useEffect, useState } from 'react'

// material ui
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
// styled
import { styled } from '@mui/material/styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

const RangeSlider = ({
    inputValue = [],
    min = 0,
    max = 100,
    handleChange = (value) => { return },
    ...other
}) => {
    const minDistance = 10;

    const [value, setValue] = useState(inputValue);
    useEffect(() => {
        if (JSON.stringify(inputValue) !== JSON.stringify(value)) {
            setValue(inputValue)
        }
    }, [inputValue])

    const handleSliderChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
                // handleChange([clamped, clamped + minDistance])
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
                // handleChange([clamped - minDistance, clamped])
            }
        } else {
            setValue(newValue);
            // handleChange(newValue)
        }
    };

    const handleSliderChangeCommitted = (e, newValue) => {
        // console.log(newValue)
        handleChange(newValue)
    }

    function sortValues(a, b) {
        return a - b
    }

    /**
     * Displsy Min & Max Value
     * 
     * @param {Number} value 
     * @returns React.Node
     */
    const DisplayValue = ({ value }) => {
        return (
            <Typography color="secondary" sx={{ whiteSpace: 'nowrap' }} >
                {value} €
            </Typography>
        )
    }

    return (
        <Stack sx={{ maxWidth: '95%', margin: "auto" }}>
            <Stack direction="row" gap={2}>

                <Stack alignSelf="center">
                    <DisplayValue value={value?.sort(sortValues)[0]} />
                    {/* <Typography color="secondary" sx={{ whiteSpace: 'nowrap' }} >
                        {value?.sort(sortValues)[0]} €
                    </Typography> */}
                </Stack>

                <Stack sx={{ width: '100%' }}>
                    <Slider
                        getAriaLabel={() => '€'}
                        // orientation="vertical"
                        // getAriaValueText={valuetext}
                        value={value} // {Array.isArray(value) ? value?.map(item => String(item)) : [0,0]}
                        // defaultValue={inputValue}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleSliderChangeCommitted}
                        // valueLabelDisplay="auto"
                        max={max}
                        min={min}
                    // marks={marks}
                    />
                </Stack>

                <Stack alignSelf="center">
                    <DisplayValue value={value?.sort(sortValues)[1]} />
                </Stack>

            </Stack>
            {/* <Grid container spacing={2} alignItems="center">
                <Grid item>

                </Grid>
                <Grid item xs>
                    
                </Grid>
                <Grid item>
                    <Typography color="secondary" >
                        {value?.sort(sortValues)[1]}
                    </Typography>
                    <Input
                        value={value?.sort((a, b) => a-b)[1]}
                        size="small"
                        onChange={handleInputMaxChange}
                        onBlur={handleInputBlur}
                        inputProps={{
                            step: minDistance,
                            min: min,
                            max: max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    /> 
        </Grid>
            </Grid > */}

        </Stack >

    )
}

export default RangeSlider