import React, { useState } from 'react'

// material-ui
import { Box, Grid, Stack } from '@mui/material'
// styled
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
import AppointmentsUsersInfo from './card/AppointmentsUsersInfo'
import AppointmentsClientsInfo from './card/AppointmentsClientsInfo'
import AppointmentsEventsInfo from './card/AppointmentsEventsInfo'
import EventForm from 'pages/calendar/components/appointment/EventForm'
import ActionsCard from 'components/card/list/actions/ActionsCard'
import DeleteButton from 'components/button/DeleteButton'

// icons
import { CloseIcon, EditIcon, RestoreItemIcon } from 'assets/font-icons/icons'

// redux
import { useDispatch } from 'react-redux'
// slice
import { deleteEvent, updateEvent } from 'store/reducers/calendar'
import { addNotice } from 'store/reducers/notices'

// utils
import { buildNotice } from 'utils/app/notice'
import EventSwitchStatusButton from './components/EventSwitchStatusButton';


const AppointmentCardContent = ({
    item = {},
    withClientInfo = true,
    withContactInfo = true,
    withProfileLink = false,
    withActions = true,
    visibleNotes = false,
    toggleNotes = true,
    ...other
}) => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch()

    const [isEditable, setIsEditable] = useState(false)

    const visibleInputData = {
        client: false,
        notes: false,
    }

    /**
     * ACTIONS HANDLE
     */
    // SUBMIT ACTIVE STATUS
    const switchStatusEvent = async (next) => {
        const values = {
            eventID: item?.id, // appointmentData?.id,
            parameter: 'status',
            value: next, // 'confirmed',
        }

        try {
            const resultAction = await dispatch(updateEvent({ ...values, })).unwrap() // console.log(resultAction);
            console.log('Success');

            const notice = buildNotice(resultAction)
            dispatch(addNotice(notice))

        } catch (err) {
            console.log('Failed');
        }
    }

    const handleDeletePermanent = async (value) => {
        try {
            const resultAction = await dispatch(deleteEvent({ eventID: value })).unwrap() // console.log(resultAction);
            console.log('Success');

            const notice = buildNotice(resultAction)
            dispatch(addNotice(notice))

        } catch (err) {
            console.log('Failed');
        }
    }
    // const handleActive = async () => {
    //     const values = {
    //         eventID: item?.id, // appointmentData?.id,
    //         parameter: 'status',
    //         value: 'active', // 'confirmed',
    //     }
    //     try {
    //         const resultAction = await dispatch(updateEvent({ ...values, })).unwrap() // console.log(resultAction);
    //         console.log('Success');

    //         const notice = buildNotice(resultAction)
    //         dispatch(addNotice(notice))

    //     } catch (err) {
    //         console.log('Failed');
    //     }
    // }

    // const moveToTrashEvent = async (next) => {
    //     const values = {
    //         eventID: item?.id, // appointmentData?.id,
    //         parameter: 'status',
    //         value: next, // 'confirmed',
    //     }

    //     try {
    //         const resultAction = await dispatch(updateEvent({ ...values, })).unwrap() // console.log(resultAction);
    //         console.log('Success');

    //         const notice = buildNotice(resultAction)
    //         dispatch(addNotice(notice))

    //     } catch (err) {
    //         console.log('Failed');
    //     }
    // }

    const actionsItems = [
        {
            isComponent: true,
            Component: () => (<>
                <EventSwitchStatusButton
                    eventID={item?.id}
                    status={item?.status}
                // onClickCallback={() => {
                //     toggleTooltipVisibility()
                // }}
                />
            </>)
        },
        {
            icon: !isEditable ? <EditIcon /> : <CloseIcon />,
            onClick: () => setIsEditable(!isEditable)
        },
        {
            isComponent: true,
            Component: () => (<>
                <DeleteButton
                    label=""
                    color=""
                    onConfirm={() => { switchStatusEvent('trash'); }}
                />
            </>)
        },
    ]

    const actionsItemsTrash = [
        {
            icon: <RestoreItemIcon color="#1890ff" />,
            onClick: () => switchStatusEvent('active')
        },
        {
            isComponent: true,
            Component: () => (<>
                <DeleteButton
                    label=""
                    color=""
                    onConfirm={() => { handleDeletePermanent(item?.id); }}
                />
            </>)
        },
    ]

    return (
        <>
            <Box sx={{ p: '1rem', /* opacity: item?.status === 'trash' ? .5 : 1 */ }} >
                <Stack gap={4}>
                    {/* CLIENT */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', }}>
                        {/* Client INFO */}
                        <Box sx={{ opacity: item?.status === 'trash' ? .65 : 1 }}>
                            <AppointmentsClientsInfo
                                client={item?.client}
                                withClientInfo={withClientInfo}
                                withContactInfo={withContactInfo}
                                withProfileLink={withProfileLink}
                            />
                        </Box>

                        {(withActions && !matchDownSM) &&
                            <Box sx={{ alignSelf: 'start', }}>
                                <ActionsCard
                                    items={item?.status !== 'trash' ? actionsItems : actionsItemsTrash}
                                    withRightPadding={false}
                                />
                            </Box>
                        }
                    </Stack>
                    {/* USER */}
                    <Stack gap={1.2} sx={{ opacity: item?.status === 'trash' ? .65 : 1 }}>
                        <Box>
                            <AppointmentsUsersInfo
                                user={item?.user}
                            />
                        </Box>
                        {/* EVENT INFO */}
                        <Box>
                            {isEditable ?
                                <EventForm formData={item} visibleParameters={visibleInputData} />
                                : <AppointmentsEventsInfo
                                    item={item}
                                    visibleNotes={visibleNotes}
                                    toggleNotes={toggleNotes}
                                />}
                        </Box>
                    </Stack>

                    {(withActions && matchDownSM) && <>{/* <Stack> */}
                        <ActionsCard
                            items={item?.status !== 'trash' ? actionsItems : actionsItemsTrash}
                            withRightPadding={false}
                        />{/* </Stack> */} </>}
                </Stack>

            </Box>
        </>
    )
}

export default AppointmentCardContent