import React, { useEffect, useState } from 'react'

// material-ui
import {
    Stack,
    Typography
} from '@mui/material';
import { isDeepEqual } from 'utils/equal';

const InvoiceTitle = ({
    item = null,
    ...other
}) => {
    console.log(item);
    const [currentItem, setCurrentItem] = useState(item)

    useEffect(() => {
        if (!isDeepEqual(item, currentItem)) {
            setCurrentItem(item)
        }
    }, [item])

    return (
        <Stack direction="row" gap={1} alignItems='center'/* alignItems='baseline' */ >
            <Typography variant="h6" color="secondary" >Fattura</Typography>
            <Typography variant="h4" /* color="secondary" sx={{fontWeight: '700'}} */ >
                #{currentItem?.number}
            </Typography>
        </Stack>
    )
}

export default InvoiceTitle