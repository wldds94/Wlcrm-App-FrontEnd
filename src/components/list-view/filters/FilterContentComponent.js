import React from 'react'

// dayjs
import dayjs from 'dayjs';

// project import
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';
import MultipleSelectChip from 'components/input/MultipleSelectChip';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import RangeSlider from 'components/input/slider/RangeSlider';

// utils
import { getDateFormat } from 'utils/libs/dayjsUtils';

const FilterContentComponent = ({
    type = null,
    id = "",
    name = "",
    value = "",
    options = [],
    label = null,
    min = 0,
    max = 100,
    divider = false,
    onChange = () => { return },
    ...other
}) => {
    // console.log(type);
    let Content = () => <></>

    switch (type) {
        case 'divider':
            Content = () => <SimpleHeaderDivider title={value} />
            break;
        case 'date':
            Content = () => <BasicOutlinedInput
                id={"filter-" + id}
                name={id}
                type={type}
                inputValue={value}
                handleChange={(e) => {
                    // console.log(e);
                    // onChange(e)
                    const newDate = e?.currentTarget ? e?.currentTarget?.value : ""
                    console.log(newDate);
                    onChange(newDate ? getDateFormat(newDate, 0, 'YYYY-MM-DD') : ""/* , "endDate" */)
                }}
            />
            break;
        case 'multiple-select':
            Content = () => <MultipleSelectChip
                id={"filter-" + id}
                name={id}
                label={label} // {"Seleziona Utente"}
                options={options}
                inputValue={value}
                onChangeCallback={(e, value) => onChange(value)}
            />
            break;
        case 'range':
            Content = () => <RangeSlider
                inputValue={value}
                handleChange={(value) => onChange(value)}
                min={min}
                max={max}
            />
            break;
        default:
            break;
    }

    return (
        <>
            {<Content />}
        </>
    )
}

export default FilterContentComponent