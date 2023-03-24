import React from 'react'

// material ui
import { Box } from '@mui/material';

// styled
import { alpha, styled } from '@mui/material/styles';
// devexpress scheduler
import {
    ViewState,
    GroupingState,
    IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
    Resources,
    GroupingPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

// react redux
import { getCalendarStatus } from 'store/reducers/calendar';
import { useSelector } from 'react-redux';

// project import
import ToolbarWithLoading from 'pages/calendar/components/scheduler/ToolbarWithLoading';
import Appointment, { AppointmentContainer, AppointmentContent } from 'pages/calendar/components/appointment/Appointment';
import TimeTableCellStyled from 'pages/calendar/common/styled-components/TimeTableCellStyled';
import DayScaleCellStyled from 'pages/calendar/common/styled-components/DayScaleCellStyled';
import DayTimeScaleLayoutStyled from 'pages/calendar/common/styled-components/DayTimeScaleLayoutStyled';
import DayTimeScaleTickCellStyled from 'pages/calendar/common/styled-components/DayTimeScaleTickCellStyled';
import DayTimeScaleLabelStyled from 'pages/calendar/common/styled-components/DayTimeScaleLabelStyled';
import { schedulerConfig } from 'config';


const UsersScheduler = ({
    users, // usersResource, 
    clients, // clientsResource, 
    events,
    schedulerSettings = {},
    // resources,
    // setOpenClinicalForm
}) => {
    console.log(events);
    console.log(users);
    console.log(clients);
    const schedulerOption = {
        ...schedulerConfig,
        ...schedulerSettings,
    }
    // console.log(events);
    const [resourcesState, setResourcesState] = React.useState([{
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
    React.useEffect(() => {
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
    }/* , {
        resourceName: 'clientId',
    }, */];

    const [currentDate, setCurrentDate] = React.useState(new Date())
    const [currentViewName, setCurrentViewName] = React.useState('Day')

    // scheduler states
    const loading = useSelector(getCalendarStatus)

    // // Style & other Comp
    const PREFIX = 'Wlcrm';

    const classes = {
        cell: `${PREFIX}-cell`,
        headerCell: `${PREFIX}-headerCell`,
        icon: `${PREFIX}-icon`,
        timeScale: `${PREFIX}-timeScale`,
        cellMonth: `${PREFIX}-cellMonth`,
    };

    const useGroupingStyles = (Component, group) => {
        // console.log(group);
        const color = findColorByGroupId(group.id);
        return styled(Component)(({ theme }) => ({
            [`&.${classes.cell}`]: {
                backgroundColor: alpha(color, 0.05/*0.1*/),
                height: '60px',
                minWidth: '100px',
                '&:hover': {
                    backgroundColor: alpha(color, 0.15/**/),
                },
                '&:focus': {
                    backgroundColor: alpha(color, 0.25/*0.2*/),
                },
            },
            [`&.${classes.headerCell}`]: {
                backgroundColor: alpha(color, 0.05/*0.1*/),
                '&:hover': {
                    backgroundColor: alpha(color, 0.1),
                },
                '&:focus': {
                    backgroundColor: alpha(color, 0.1),
                },
            },
            [`&.${classes.icon}`]: {
                paddingLeft: theme.spacing(1),
                verticalAlign: 'middle',
            },
            [`&.${classes.timeScale}`]: {
                height: '60px',
                lineHeight: '60px',
                '&.Label-emptyLabel': {
                    height: '30px',
                }
            },
            [`&.${classes.cellMonth}`]: {
                backgroundColor: alpha(color, 0.05/*0.1*/),
                height: '360px',
                lineHeight: '360px',
                minWidth: '100px',
                '&:hover': {
                    backgroundColor: alpha(color, 0.15/**/),
                },
                '&:focus': {
                    backgroundColor: alpha(color, 0.25/*0.2*/),
                },
            },
        }));

    };

    const findColorByGroupId = id => {
        const userFinded = users.find(item => item.id === id)
        return userFinded ? userFinded?.color : "#fff"
    };

    // const TimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
    //     const StyledComponent = useGroupingStyles(DayView.TimeTableCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
    //     return (
    //         <StyledComponent
    //             className={classes.cell}
    //             groupingInfo={groupingInfo}
    //             {...restProps}
    //         />
    //     );
    // });
    const TimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
        // console.log(groupingInfo?.length > 0 ? groupingInfo[0] : {});
        return (
            <TimeTableCellStyled
                groupingInfo={groupingInfo}
                resources={users}
                {...restProps}
            />
        );
    });

    const DayScaleCell = React.memo(({ groupingInfo, ...restProps }) => { // console.log(groupingInfo);
        // const StyledComponent = useGroupingStyles(DayView.DayScaleCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        return (
            <DayScaleCellStyled
                groupingInfo={groupingInfo}
                resources={users}
                {...restProps}
            />
        );
    });

    const DayTimeScaleLayout = React.memo(({ groupingInfo, ...restProps }) => {
        return (
            <DayTimeScaleLayoutStyled
                {...restProps}
                style={{
                    ...restProps?.style,
                }}
            />
        );
    });

    const DayTimeScaleTickCell = React.memo(({ groupingInfo, ...restProps }) => {
        // const StyledComponent = useGroupingStyles(DayView.TimeScaleTickCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        // restProps.height = 60
        return (
            <DayTimeScaleTickCellStyled
                groupingInfo={groupingInfo}
                resources={users}
                {...restProps}
            />
        );
    });

    const DayTimeScaleLabel = React.memo(({ groupingInfo, ...restProps }) => {
        // console.log(restProps);
        // const StyledComponent = useGroupingStyles(DayView.TimeScaleLabel, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        // restProps.height = '60px'
        // return (
        //     <StyledComponent
        //         className={classes.timeScale}
        //         // groupingInfo={groupingInfo}
        //         {...restProps}
        //         style={{
        //             ...restProps?.style,
        //             // height: '60px',
        //             // lineHeight: '60px',
        //             // backgroundColor: 'yellow'
        //         }}
        //     />
        // );
        return (
            <DayTimeScaleLabelStyled
                groupingInfo={groupingInfo}
                resources={users}
                {...restProps}
            />
        );
    });

    return (
        <>
            {/* <Box sx={{ pb: 2 }}> */}
            <Scheduler
                // ref={schedulerRef}
                timeZone="Italy/Rome"
                locale='it-IT'
                // data={eventsData}
                data={events} // {filterEvents(eventsData, currentGroupingClient, currentFilterStartDate, currentFilterEndDate)}
                // data={filterEventsByClient(eventsData, currentGroupingClient)}
                height={'100%'}
                firstDayOfWeek={1}
                startDayHour={schedulerOption?.first_hour} // {7.5}
                endDayHour={schedulerOption?.last_hour} // {20.5}
            >
                <ViewState
                    currentDate={currentDate}
                    currentViewName={currentViewName}
                    // onCurrentViewNameChange={setCurrentViewName}
                    onCurrentDateChange={setCurrentDate}
                />

                <GroupingState
                    grouping={grouping}
                />

                <DayView
                    startDayHour={schedulerOption?.first_hour} // {7.5}
                    endDayHour={schedulerOption?.last_hour} // {20.5}
                    // intervalCount={2}
                    cellDuration={schedulerOption?.cell_time_step} // {30}
                    displayName="Giornaliera"
                    timeTableCellComponent={TimeTableCell} // {TimeTableCellStyled} // 
                    dayScaleCellComponent={DayScaleCell}
                    timeScaleLayoutComponent={DayTimeScaleLayout}
                    timeScaleTickCellComponent={DayTimeScaleTickCell}
                    timeScaleLabelComponent={DayTimeScaleLabel}
                />

                <Appointments
                    appointmentComponent={Appointment} /* onHide={() => { setOpenAppointmentForm(false) }} */
                    appointmentContentComponent={AppointmentContent}
                    containerComponent={AppointmentContainer}
                />
                <Resources
                    data={resourcesState} // {resourcesState}
                    mainResourceName="userId"
                />

                <IntegratedGrouping />
                <GroupingPanel groups={[users, clients]} />

                <Toolbar
                    {...loading === 'loading' ? { rootComponent: ToolbarWithLoading } : null}
                />
                <DateNavigator />
                <TodayButton
                    messages={{
                        today: "Oggi"
                    }}
                />
            </Scheduler>
            {/* </Box> */}
            {/* <Box sx={{ height: '20px' }}></Box> */}
        </>
    )
}

export default UsersScheduler