import React, { useState } from 'react'

// material-ui
import { Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';

import AppointmentsClientsInfo from 'pages/calendar/common/events/card/AppointmentsClientsInfo'
import AppointmentsUsersInfo from 'pages/calendar/common/events/card/AppointmentsUsersInfo'
import { getHourAndDate } from 'utils/date'
import DeleteButton from 'components/button/DeleteButton';
import ActionsCard from 'components/card/list/actions/ActionsCard';
import EditableButton from 'components/button/EditableButton';
import ClinicalJournalForm from '../ClinicalJournalForm';

const JournalCardContent = ({
    item = {},
    withClientInfo = true,
    withClientProfileLink = false,
    // visibleNotes = false,
    // toggleNotes = true,
    ...other
}) => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [isEditable, setIsEditable] = useState(false)

    const { hour, date } = getHourAndDate(item?.createdAt)

    const actionsItems = [
        {
            isComponent: true,
            Component: () => (<>
                <EditableButton
                    editable={isEditable}
                    onClick={(newVal) => setIsEditable(newVal)}
                />
            </>)
        },
        {
            isComponent: true,
            Component: () => (<>
                <DeleteButton
                    label=""
                    color=""
                    onConfirm={() => { console.log('You confirm'); }}
                />
            </>)
        },
    ]

    return (
        <>
            <Box sx={{ p: '1rem', }}>
                {!isEditable ? <Stack direction={matchDownSM ? "column" : "row"} gap={!matchDownSM ? 3 : 1} sx={{ width: '100%', }} >
                    <Box>
                        <AppointmentsClientsInfo
                            client={item?.client}
                            withClientInfo={withClientInfo}
                            withProfileLink={withClientProfileLink}
                        />

                    </Box>
                    <Divider orientation={matchDownSM ? "horizontal" : "vertical"} flexItem />
                    <Stack gap={2} sx={{ width: '100%', }}>
                        <Stack direction="row" gap={1} alignItems={matchDownSM ? 'end' : 'start'}>
                            <Box sx={{ display: 'inline-block', }}>
                                <AppointmentsUsersInfo
                                    user={item?.user}
                                />
                            </Box>
                            <Box sx={{ display: 'inline-block', }}>
                                <Typography variant="caption" component="div" >-</Typography>
                            </Box>
                            <Box sx={{ display: 'inline-block', }}>
                                <Typography variant="caption" color="secondary" sx={{ width: '100%', }} component="div" >{date}</Typography>
                            </Box>
                        </Stack>
                        <Box>
                            <Typography variant="body2">{item?.content}</Typography>
                        </Box>
                        <ActionsCard
                            items={actionsItems}
                            withRightPadding={false}
                        />
                        {/*  <EditableButton
                                editable={isEditable}
                                onClick={(newVal) => setIsEditable(newVal)}
                            />
                        </ActionsCard> */}
                    </Stack>

                </Stack> : <Box>
                    <ClinicalJournalForm
                        formData={item}
                    />
                    <Stack alignItems="flex-end">
                        <EditableButton
                            editable={isEditable}
                            onClick={(newVal) => setIsEditable(newVal)}
                        />
                    </Stack>

                </Box>}
            </Box>
        </>
    )
}

export default JournalCardContent