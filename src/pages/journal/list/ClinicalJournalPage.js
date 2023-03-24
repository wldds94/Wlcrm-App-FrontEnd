import React, { useEffect, useState } from 'react'

// project import
import JournalsList from '../common/JournalsList';

// hooks
import useJournalData from 'hooks/redux/aggregate/useJournalData';
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData';

// utils
import { isDeepEqual } from 'utils/equal';


const ClinicalJournalPage = () => {
    // const sortItems = [
    //     {
    //         key: "-startDate",
    //         icon: <TodayIcon />,
    //         label: "Dalla più recente",
    //     },
    //     {
    //         key: "startDate",
    //         icon: <InsertInvitationIcon />,
    //         label: "Dalla meno recente",
    //     },
    // ]

    const { data, users, clients } = useJournalData() // console.log(client, journals);
    const { data: events } = useSchedulerData() // console.log(client, journals);
    const [current, setCurrent] = useState(data)
    useEffect(() => {
        if (!isDeepEqual(current, data)) {
            setCurrent(data)
        }
    }, [data])

    return (
        <>
            <JournalsList
                data={current}
                clients={clients}
                users={users}
                events={events}
                withClientProfileLink={true}
            />
        </>
    )
}

export default ClinicalJournalPage