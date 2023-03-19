import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    IconButton,
    Stack,
    Typography
} from '@mui/material';

// project import
import InfoListItem from 'components/typography/InfoListItem';

// icons
import { ListNotes } from 'assets/font-icons/icons';
import { TbFilePlus } from 'react-icons/tb'
import { BiSearchAlt } from 'react-icons/bi'
import { Divider } from '../../../node_modules/@mui/material/index';
import SearchField from 'components/input/search-field/SearchField';
import FilterComponent from './FilterComponent';

const ListHeader = ({
    totalValue,
    totalIcon = false,
    totalText = false,
    withAddItem = false,
    AddIcon = false,
    onAddClick = () => { return },
    withFilters = false,
    FilterContent = false, // FilterContent = () => { <></> },
    filters = [],
    withResetFilter = false,
    handleResetFilter = () => { return },
    withSearch = false,
    onChangeSearch = (value) => { return },
    // onSearchChange = () => { return },
    withRightBar = true,
    RightBar = false,
    ...other
}) => {
    // console.log(totalText);
    const defaultInfo = {
        icon: <ListNotes />,
        itemText: false, // "Totale:",
        value: false,
    }

    // const [currentTotal, setCurrentTotal] = useState(totalValue)
    // useEffect(() => {
    //     setCurrentTotal(totalValue)
    // }, [totalValue])

    return (
        <Box sx={{ /* p: '1rem', */p: '.3rem'/* , pl: '1rem', */, background: "#f9f9f9", mb: '1rem' }}>
            <Stack direction="row" justifyContent="space-between" >
                <Stack direction="row" gap={1} >
                    {withAddItem && <>
                        <Box>
                            <IconButton onClick={() => onAddClick()}>
                                {AddIcon ? AddIcon : <TbFilePlus size={20} style={{ color: '#1890ff' }} />}
                            </IconButton>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>}
                    <InfoListItem
                        info={{
                            icon: totalIcon ? totalIcon : defaultInfo.icon,
                            itemText: Boolean(totalText) && totalText?.length ? totalText : defaultInfo.itemText,
                            value: totalValue, // currentTotal,
                        }}
                        responsive={true}
                    />
                </Stack>

                <Stack direction="row" gap={1} >
                    {(withRightBar && RightBar) && <RightBar />}
                    {withSearch && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <SearchField
                                disabled={totalValue > 0 ? false : true}
                                onChange={onChangeSearch}
                            />
                        </>
                    )}
                    {(withFilters /* && totalValue > 0 */) && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <FilterComponent
                                FilterContent={FilterContent}
                                filters={filters}
                                withReset={withResetFilter}
                                handleReset={handleResetFilter}
                            />
                        </>
                    )}
                </Stack>

            </Stack>
        </Box>
    )
}

export default ListHeader