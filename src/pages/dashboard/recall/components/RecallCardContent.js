import React, { useState } from 'react'

// material-ui
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'

// project import
import DeleteButton from 'components/button/DeleteButton'
import ActionsCard from 'components/card/list/actions/ActionsCard'
import AppointmentsEventsInfo from 'pages/calendar/common/events/card/AppointmentsEventsInfo'
import AppointmentsClientsInfo from 'pages/calendar/common/events/card/AppointmentsClientsInfo'

// assets
import { TbBellRinging } from 'react-icons/tb'
import { BsCheckAll, BsQuestion, BsQuestionLg } from 'react-icons/bs'
import { ImWarning } from 'react-icons/im'
import { FaEyeSlash, FaThumbsUp } from 'react-icons/fa'
import { MdOutlineEditCalendar } from 'react-icons/md'
// icons
import { CloseIcon, DeleteIcon, EditIcon, RestoreItemIcon } from 'assets/font-icons/icons'

// redux
import { useDispatch } from 'react-redux'
import { updateEvent } from 'store/reducers/calendar'
import { addNotice } from 'store/reducers/notices'

// utils
import { buildNotice } from 'utils/app/notice'
import EventForm from 'pages/calendar/components/appointment/EventForm'


const RecallCardContent = ({
    item = {},
    withClientInfo = true,
    withClientProfileLink = false,
    clientRightAlignment = false,
    // with
    // visibleNotes = false,
    // toggleNotes = true,
    ...other
}) => {
    const dispatch = useDispatch()

    const [isUpdating, setIsUpdating] = useState(false)

    const [openForm, setOpenForm] = useState(false)

    const { recall } = item
    // console.log(recall);

    const recallIconStatus = [
        {
            status: -1,
            Component: BsCheckAll,
            color: "green",
            size: 24
        },
        {
            status: 0,
            Component: ImWarning,
            color: "orange",
            size: 16
        },
        {
            status: 1,
            Component: TbBellRinging,
            color: "red",
            size: 20
        }
    ]

    const handleChangeStatus = async (nextStatus) => {
        const values = {
            eventID: item?.id, // appointmentData?.id,
            parameter: 'recallStatus',
            value: nextStatus, // 'confirmed',
        }
        if (!isUpdating) {
            setIsUpdating(true)
            try {
                const resultAction = await dispatch(updateEvent({ ...values, })).unwrap() // console.log(resultAction);
                console.log('Success');

                const notice = buildNotice(resultAction)
                dispatch(addNotice(notice))

                if (resultAction) {
                    setIsUpdating(false)
                }
                // toggleTooltipVisibility()

            } catch (err) {
                console.log('Failed');
            }
            setIsUpdating(false)
        }

    }

    const actionsItems = [
        {
            // status: 'confirmed',
            icon: openForm ? <CloseIcon /> : <MdOutlineEditCalendar />,
            onClick: () => { setOpenForm(!openForm) },
            // isComponent: true,
            // Component: () => (<>
            //     {item?.recallStatus !== 'confirmed' && <IconButton
            //         // label=""
            //         sx={{ color: "#61c961" }}
            //         onClick={() => { handleChangeStatus('confirmed') }}
            //     ><FaThumbsUp /* color="primary"  */ /></IconButton>}
            // </>)
        },
        {
            status: 'confirmed',
            icon: <FaThumbsUp />,
            color: "#61c961",
            isComponent: true,
            Component: () => (<>
                {item?.recallStatus !== 'confirmed' && <IconButton
                    // label=""
                    sx={{ color: "#61c961" }}
                    onClick={() => { handleChangeStatus('confirmed') }}
                ><FaThumbsUp /* color="primary"  */ /></IconButton>}
            </>)
        },
        {
            status: 'active',
            icon: <BsQuestionLg />,
            color: "#1890ff",
            isComponent: true,
            Component: () => (<>
                {item?.recallStatus !== 'active' && <IconButton
                    // label=""
                    color="primary"
                    onClick={() => { handleChangeStatus('active') }}
                ><RestoreItemIcon /* color="primary"  */ /></IconButton>}
            </>)
        },
        {
            status: 'deleted',
            icon: <DeleteIcon />,
            color: "#ff4d4f",
            isComponent: true,
            Component: () => (<>
                {item?.recallStatus !== 'deleted' && <DeleteButton
                    label=""
                    color=""
                    onConfirm={() => { handleChangeStatus('deleted') }}
                />}
            </>)
        },
        // {
        //     icon: <RestoreItemIcon color="primary" />,
        //     onClick: () => {handleChangeStatus('active')},
        // },
    ]

    return (
        <>
            <Box sx={{ p: '1rem', }} style={{
                // opacity: item?.recallStatus === 'deleted' ? .5 : 1,
                background: item?.recallStatus === 'confirmed' ? '#f9f9f9' : '#fff',
            }}>
                <Stack direction="row" gap={1} justifyContent="space-between" >
                    {/* CONTENT */}
                    <Stack /* direction="row" */ gap={2} style={{
                        opacity: item?.recallStatus === 'deleted' ? 0.4 : 1,
                    }} >
                        {/** ICON */}
                        <Stack direction="row" alignItems="center" gap={1} /* sx={{ width: '40px' }}  */>
                            <Stack direction="row" gap={1} alignItems="center" /* sx={{ width: '40px' }}  */>
                                {/* <TbBellRinging color="red" size={20} />
                            <ImWarning color="orange" size={16} />
                            <BsCheckAll color="green" size={24} /> */}
                                {recallIconStatus
                                    ?.filter(row => Number(row?.status) === Number(recall?.status))
                                    ?.map((icon, index) => (
                                        <icon.Component
                                            key={index}
                                            color={icon.color}
                                            size={icon.size}
                                        />
                                    ))
                                }
                            </Stack>
                            <Stack direction="row" gap={1} alignItems="center" /* sx={{ width: '40px' }}  */>
                                {/* <Box> */}
                                <Typography
                                    component="div"
                                    color="secondary"
                                    style={{ textDecoration: item?.recallStatus === 'deleted' ? 'line-through' : 'none' }}>
                                    {recall?.label}
                                </Typography>
                                {actionsItems?.filter(row => row?.status === item?.recallStatus)?.map((action, index) => {
                                    return (
                                        <Stack
                                            key={index}
                                            direction="row"
                                            alignItems="center"
                                            // component="div"
                                            // variant="h6b"
                                            style={{ color: action?.color ? action?.color : 'grey'/* , fontSize: '1.2rem' */ }}
                                        >
                                            {action?.icon}
                                        </Stack>
                                    )
                                })}
                                {/* </Box> */}
                            </Stack>

                        </Stack>

                        {/* <Box sx={{ width: '40px' }} >Icon</Box> */}
                        {/* INFO */}
                        <Stack /* gap={3} */>
                            <Box>
                                <AppointmentsEventsInfo
                                    item={item}
                                    visibleInfoContent={{
                                        hour: false,
                                        date: true,
                                        title: true,
                                        notes: false,
                                        status: false,
                                    }}
                                    hideNotes={true}
                                />
                            </Box>
                        </Stack>
                    </Stack>

                    {/* ACTIONS */}
                    <Stack justifyContent="space-between" alignItems="end" gap={3} >
                        <Box>
                            <AppointmentsClientsInfo
                                client={item?.client}
                                withClientInfo={withClientInfo}
                                withProfileLink={withClientProfileLink}
                                rightAlignment={clientRightAlignment}
                            />
                        </Box>
                        {/* <Box>Actions</Box> */}
                        <Box /* sx={{ mt: 1, }} */>
                            <ActionsCard
                                items={actionsItems}
                                withRightPadding={false}
                            />
                        </Box>

                    </Stack>
                </Stack>

            </Box>
            {openForm && <Stack sx={{ background: 'white', pb: 2, }}>
                <EventForm
                    formData={{
                        title: item?.title,
                        serviceId: item?.serviceId,
                        recallAfter: item?.service?.recurrency ? item?.service?.recurrency : "",
                        userId: item?.userId,
                        clientId: item?.clientId,
                    }}
                    visibleParameters={{
                        client: false,
                    }}
                />
            </Stack>}
        </>

    )
}

export default RecallCardContent