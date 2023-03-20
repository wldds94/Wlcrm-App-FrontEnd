import React, { useEffect, useState } from 'react'

// Redux
import { useSelector } from 'react-redux';
// slice
import { getCalendarConfig } from 'store/reducers/calendar';

// project import
// import ScheduleCalendarPage from './calendar/ScheduleCalendarPage';
import SchedulePanelRouterPage from './SchedulePanelRouterPage';

const ScheduleRouterPage = () => {
    console.log('Scheduler');
    // scheduler settings
    const calendarSessionConfig = useSelector(getCalendarConfig)
    const [currentMode, setCurrentMode] = useState(calendarSessionConfig?.mode)
    useEffect(() => {
        if (calendarSessionConfig?.mode !== currentMode) {
            setCurrentMode(calendarSessionConfig?.mode)
        }
    }, [calendarSessionConfig?.mode])

    return (
        <>
            {/* {currentMode === "calendar" ? 
                <>
                    <ScheduleCalendarPage />
                </> : 
                <>
                    <SchedulePanelRouterPage />
                </>
            } */}
            <SchedulePanelRouterPage />
        </>
    )
}

export default ScheduleRouterPage