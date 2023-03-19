import React, { useState } from 'react'

// mui material
import { IconButton } from '@mui/material'
import { Grid } from '../../../node_modules/@mui/material/index';

// project import
import BootstrapDialog from 'components/dialog/bootstrap-dialog/BootstrapDialog';
import FilterContentComponent from './filters/FilterContentComponent';

// assets
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { BiEraser } from 'react-icons/bi'

const FilterComponent = ({
    FilterContent = false, // () => <></>,
    filters = [],
    withReset = false,
    handleReset = () => { return },
    ...other
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const ResetIcon = () => (
        <>
            {withReset && <IconButton onClick={() => { handleReset() }}>
                <BiEraser style={{ color: "#1890ff", cursor: 'pointer' }} />
            </IconButton>}
        </>
    )

    return (
        <>
            <IconButton onClick={() => setIsOpen(true)}>
                <SearchOffIcon sx={{ color: "#1890ff", cursor: 'pointer' }} />
            </IconButton>
            <ResetIcon />
            <BootstrapDialog
                onClose={() => setIsOpen(false)}
                open={isOpen}
                title="Imposta i Filtri"
                variantTitle='h4'
                maxWidth="md"
                HeaderActions={() => <ResetIcon />}
            >
                <Grid container spacing={2} sx={{ mb: 3, }} >
                    {FilterContent !== false && <Grid item xs={12} >
                        <FilterContent />
                    </Grid>}
                    {filters?.map((item, index) => (
                        <Grid item xs={item?.isSmall ? 6 : 12} key={index}>
                            <FilterContentComponent
                                {...item}
                            />
                        </Grid>
                    ))}

                </Grid>

            </BootstrapDialog>
        </>
    )
}

export default FilterComponent