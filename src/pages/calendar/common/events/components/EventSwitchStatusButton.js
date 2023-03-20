import React, { useEffect, useState } from 'react';

// material ui
import { IconButton } from '@mui/material';

// project import

// Redux
import { useDispatch } from 'react-redux';
// slice
import { updateEvent } from 'store/reducers/calendar';
import { addNotice } from 'store/reducers/notices';

// icons
import { FaThumbsUp } from 'react-icons/fa'
import { TiCancel } from 'react-icons/ti'
// import CommentFormDialog from './appointment/commentForm/CommentFormDialog';

// utils
import { buildNotice } from 'utils/app/notice';

const EventSwitchStatusButton = ({
    eventID = 0,
    status = 'active',
    // next = 'confirmed',
    confirmedIcon = <FaThumbsUp />,
    deletedIcon = <TiCancel style={{ fontSize: "2rem" }} />,
    sizeIcon = "large",
    onClickCallback = false,
    ...other
}) => {
    const dispatch = useDispatch()

    const [isUpdating, setIsUpdating] = useState(false)

    const [currentID, setCurrentID] = useState(eventID)
    useEffect(() => {
        if (Number(eventID) !== Number(currentID)) {
            setCurrentID(eventID)
        }
    }, [eventID])

    const [currentStatus, setCurrentStatus] = useState(status)
    useEffect(() => {
        if (String(status) !== String(currentStatus)) {
            setCurrentStatus(status)
        }
    }, [status])

    // const [nextStatus, setNextStatus] = useState(next)
    // useEffect(() => {
    //     if (String(next) !== String(nextStatus)) {
    //         setNextStatus(next)
    //     }
    // }, [next])

    const updateEventStatus = async (nextStatus) => {
        const values = {
            eventID: currentID, // appointmentData?.id,
            parameter: 'status',
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

    const handleClick = async (next) => {
        await updateEventStatus(next)
        if ('function' === typeof onClickCallback) {
            onClickCallback(eventID)
        }
    }

    return (
        <>
            {status !== 'confirmed' && <>
                <IconButton
                    onClick={() => handleClick('confirmed')}
                    size={sizeIcon}
                >
                    {confirmedIcon}
                </IconButton>
            </>}
            {status !== 'deleted' && <>
                <IconButton
                    onClick={() => handleClick('deleted')}
                    size={sizeIcon}
                >
                    {deletedIcon}
                </IconButton>
            </>}
        </>
    )
}

export default EventSwitchStatusButton