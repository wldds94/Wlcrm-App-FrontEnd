import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    Stack,
    Typography
} from '@mui/material';

// project import
import InfoListItem from 'components/typography/InfoListItem';

// assets
import InsertCommentIcon from '@mui/icons-material/InsertComment';

// utils
import { getHumanReadableDate } from 'utils/date';
import { getUserFullName } from 'utils/app/user';

const JournalsInfoContent = ({
    index = 0,
    event = {},
    user = {},
    ...other
}) => {

    const userFullName = getUserFullName(user)

    return (
        <Box key={index} sx={{ p: 1, }} >
            <Stack>
                <InfoListItem
                    info={{
                        icon: <InsertCommentIcon />,
                        itemText: user ? (userFullName ? userFullName : "Not Provided") + " -" : false,
                        value: event?.createdAt ? getHumanReadableDate(event.createdAt) : "",
                    }}
                    index={index}
                />
            </Stack>
            <Typography variant="h6b" color="secondary" >
                {event?.content ? event.content : ""}
            </Typography>
        </Box>
    )
}

export default JournalsInfoContent