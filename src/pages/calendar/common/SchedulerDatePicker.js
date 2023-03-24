import React, { useEffect, useMemo, useState } from 'react';

// material ui
import { Box } from '@mui/material';

// devexpress scheduler
import {
    ViewState,
    EditingState,
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    DayView,
    MonthView,
    Appointments,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton,
    Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData';

// redux
import { getOptionsSchedulerSettings } from 'store/reducers/options';
import { useSelector } from 'react-redux';

// config
import { schedulerConfig } from 'config';
// utils
import { getDayJS } from 'utils/libs/dayjsUtils';

const SchedulerDatePicker = ({
    onAddAppointment = (data) => { return }
}) => {
    const dayJS = getDayJS()

    const schedulerSettings = useSelector(getOptionsSchedulerSettings)
    const schedulerOption = {
        ...schedulerConfig,
        ...schedulerSettings,
    }

    const { data = []/* : events */, users = [], clients = [] } = useSchedulerData()

    const [resourcesState, setResourcesState] = useState([{
        fieldName: 'userId',
        title: 'Utente',
        instances: users,
        // allowMultiple: true,
    }, {
        fieldName: 'clientId',
        title: 'Paziente',
        instances: clients,
        // allowMultiple: true,
    },])
    useEffect(() => {
        setResourcesState([{
            fieldName: 'userId',
            title: 'Utente',
            instances: users,
            // allowMultiple: true,
        }, {
            fieldName: 'clientId',
            title: 'Paziente',
            instances: clients,
            // allowMultiple: true,
        },])
    }, [users, clients])

    const grouping = [{
        resourceName: 'userId',
    }];

    const [currentDate, setCurrentDate] = React.useState(new Date())
    const [currentViewName, setCurrentViewName] = React.useState('Day')

    /** EDITING STATE SCHEDULER */
    const changeAddedAppointment = (addedAppointment) => {
        console.log('Added Appointment');
        console.log(addedAppointment);

        const data = {
            startDate: dayJS(addedAppointment?.startDate).format(),
            endDate: dayJS(addedAppointment?.endDate).format(),
        }
        onAddAppointment(data)
    }

    const events = useMemo(() => {
        return data?.filter(item => item?.status !== 'deleted')
    }, [data])

    return (
        <Box sx={{ position: 'relative', minWidth: "100%" }}>
            <Scheduler
                // ref={schedulerRef}
                timeZone="Italy/Rome"
                locale='it-IT'
                // data={eventsData}
                data={events/* events */} // {filterEvents(eventsData, currentGroupingClient, currentFilterStartDate, currentFilterEndDate)}
                // data={filterEventsByClient(eventsData, currentGroupingClient)}
                height={'100%'}
                firstDayOfWeek={1}
                startDayHour={schedulerOption?.first_hour} // {7.5}
                endDayHour={schedulerOption?.last_hour} // {20.5}
            >
                <ViewState
                    currentDate={currentDate}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={setCurrentViewName}
                    onCurrentDateChange={setCurrentDate}
                />

                <EditingState
                    onAddedAppointmentChange={changeAddedAppointment}
                />

                <DayView
                    startDayHour={schedulerOption?.first_hour} // {7.5}
                    endDayHour={schedulerOption?.last_hour} // {20.5}
                    // intervalCount={2}
                    cellDuration={schedulerOption?.cell_time_step} // {30}
                    displayName="Giornaliera"
                />
                <WeekView
                    startDayHour={schedulerOption?.first_hour} // {7.5}
                    endDayHour={schedulerOption?.last_hour} // {20.5}
                />
                <MonthView
                    startDayHour={schedulerOption?.first_hour} // {7.5}
                    endDayHour={schedulerOption?.last_hour} // {20.5}
                />

                <Appointments />

                <Resources
                    data={resourcesState} // {resourcesState}
                    mainResourceName="userId"
                />

                {/* <IntegratedEditing /> */}

                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />

                <AppointmentTooltip />
                <AppointmentForm visible={false} />
            </Scheduler>
        </Box>
    )
}

export default SchedulerDatePicker