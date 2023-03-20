import React, { useEffect, useState } from 'react'

// project import
import ScheduleList from '../common/ScheduleList';

// utils
import { isDeepEqual } from 'utils/equal';

// hooks
import useSchedulerData from 'hooks/redux/useSchedulerData';

const ScheduleTrashPage = () => {
    console.log('ScheduleTrashPage');

    const { trash: events, clients, users } = useSchedulerData()
    const [currentEvents, setCurrentEvents] = useState(events)
    useEffect(() => {
        if (!isDeepEqual(events, currentEvents)) {
            console.log('I have to Update ScheduleTrashPage - events');
            setCurrentEvents(events)
        }
    }, [events])

    return (
        <ScheduleList
            data={currentEvents}
            clients={clients}
            users={users}
        />
    )
}

export default ScheduleTrashPage