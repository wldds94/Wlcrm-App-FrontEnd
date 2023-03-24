import React, { useEffect, useState } from 'react';

// material ui
import { Box, IconButton, Paper, Stack } from '@mui/material';
// styled
import { alpha, styled } from '@mui/material/styles';

// devexpress scheduler
import {
    ViewState,
    GroupingState,
    IntegratedGrouping,
    IntegratedEditing,
    EditingState,
} from '@devexpress/dx-react-scheduler';
import {
    AllDayPanel,
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
    GroupingPanel,
    CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';

// project import
import Appointment, { AppointmentContainer, AppointmentContent } from './appointment/Appointment';
import ToolbarWithLoading, { StyledToolbar } from './scheduler/ToolbarWithLoading';

// Redux
import { useDispatch, useSelector } from 'react-redux';
// slice
import { copyRow, getCalendarConfig, getCalendarStatus, updateEvent } from 'store/reducers/calendar';

// assets
import { addNotice } from 'store/reducers/notices';
import { buildNotice } from 'utils/app/notice';
import DeleteButton from 'components/button/DeleteButton';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

// icons
import { EditIcon } from 'assets/font-icons/icons';
import { MdCopyAll } from 'react-icons/md'
import { schedulerConfig } from 'config';
import EventSwitchStatusButton from '../common/events/components/EventSwitchStatusButton';
// import CommentFormDialog from './appointment/commentForm/CommentFormDialog';

export default ({
    users, // usersResource, 
    clients, // clientsResource, 
    events,
    resources,
    editingAppointment,
    setEditingAppointment,
    addedAppointment,
    changeAddedAppointment,
    appointmentChanges,
    changeAppointmentChanges,
    changeEditingAppointment,
    commitChanges,
    setOpenAppointmentForm,
    setCurrentPanel, // TO COMMENT
    // setOpenClinicalForm
    schedulerSettings = {},
}) => {
    const schedulerOption = {
        ...schedulerConfig,
        ...schedulerSettings,
    }

    const dispatch = useDispatch();

    const [isUpdating, setIsUpdating] = useState(false)

    const [currentEvents, setCurrentEvents] = React.useState(events)
    useEffect(() => {
        if (JSON.stringify(events) !== JSON.stringify(currentEvents)) {
            setCurrentEvents(events)
        }
    }, [events])

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
    // const [groupingState, setGroupingState] = React.useState(grouping)

    const [openAppointmentTooltip, setOpenAppointmentTooltip] = React.useState(false)
    const toggleTooltipVisibility = () => {
        setOpenAppointmentTooltip(!openAppointmentTooltip)
    }

    // scheduler states
    const loading = useSelector(getCalendarStatus)

    const [currentDate, setCurrentDate] = React.useState(new Date())

    // retrieve by the session
    const calendarSessionConfig = useSelector(getCalendarConfig)
    const [currentViewName, setCurrentViewName] = React.useState(calendarSessionConfig?.view)
    useEffect(() => {
        if (calendarSessionConfig?.view !== currentViewName) {
            setCurrentViewName(calendarSessionConfig?.view)
        }
    }, [calendarSessionConfig?.view])

    const openFormInvoice = (appointmentData) => {
        console.log("Open Form Invoice");

        setEditingAppointment(appointmentData)
        // setOpenAppointmentTooltip(false)
        setCurrentPanel(2)
        // setOpenDialogNew(true)
        // setClientId(id)
    }

    const openFormComment = (appointmentData) => {
        console.log("Open Form Comment");

        setEditingAppointment(appointmentData)
        // setOpenAppointmentTooltip(false)
        // setOpenClinicalForm(true)
        setCurrentPanel(1)

    }

    const copyEvent = (appointmentData) => {
        console.log("copyEvent");
        console.log(appointmentData);

        let copyData = {
            ...appointmentData,
            id: "",
        }
        delete copyData?.client;
        delete copyData?.service;
        delete copyData?.user;
        delete copyData?.startDate;
        delete copyData?.endDate;
        delete copyData?.journals;
        console.log(copyData);
        // dispatch(state => copyRow(state, {...appointmentData}))
        dispatch(copyRow({ ...copyData }))

        // setEditingAppointment(appointmentData)
        // // setOpenAppointmentTooltip(false)
        // // setOpenClinicalForm(true)
        // setCurrentPanel(1)

    }

    const ContentTooltip = (({
        children, appointmentData/* , setOpenAppointmentForm */, ...restProps
    }) => {
        const { client = "" } = appointmentData
        console.log(appointmentData);
        // const client = clients.find(el => Number(el.id) === Number(appointmentData.clientId))
        // console.log(client);

        return (
            <AppointmentTooltip.Content
                {...restProps}
                appointmentData={appointmentData}
            >
                {children}
                <Stack gap={1} /* spacing={1} */>
                    {/*  <Stack direction="row" gap={1} alignItems="center" sx={{ mt: '5px' }} >
                        {appointmentData?.status === "confirmed" ?
                            <>
                                <CheckCircleOutlineIcon
                                    // color="#4ab750"
                                    size="large"
                                    sx={{ ml: 2.5, color: "#4ab750" }}
                                />
                                <Typography variant="h6b" sx={{ color: "#4ab750" }} >Confermato</Typography>
                            </> : ""
                        }
                    </Stack> */}

                    {<Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row">
                            <IconButton onClick={() => {
                                openFormInvoice(appointmentData)
                                toggleTooltipVisibility()
                                // setEditingAppointment(appointmentData)
                            }} >
                                <ShoppingCartCheckoutIcon />
                            </IconButton>
                            <IconButton onClick={() => {
                                openFormComment(appointmentData)
                                toggleTooltipVisibility()
                            }} >
                                <InsertCommentIcon />
                            </IconButton>
                        </Stack>

                        <Stack direction="row" justifyContent="end" >
                            <IconButton
                                component="a"
                                href={"tel:" + client?.telephone}
                            >
                                <PhoneIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                target="_blank"
                                href={"https://wa.me/" + client?.telephone}
                            >
                                <WhatsAppIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href={"mailto:" + client?.email}
                            >
                                <MailOutlineIcon />
                            </IconButton>
                        </Stack>
                    </Stack>}
                </Stack>

                {/** MODALS */}
                {/* <InvoiceFormDialog
                    openDialogNew={openDialogNew}
                    setOpenDialogNew={setOpenDialogNew}
                    editableInvoiceData={editableInvoiceData}
                    setEditableInvoiceData={setEditableInvoiceData}
                    clientId={clientId}           
                />

                <CommentFormDialog
                    openDialogNew={openDialogCommentNew}
                    setOpenDialogNew={setOpenDialogCommentNew}
                    appointmentData={appointmentData}
                /> */}
            </AppointmentTooltip.Content>

        )
    })
    // const updateEventStatus = async (values) => {
    //     if (!isUpdating) {
    //         setIsUpdating(true)
    //         try {
    //             const resultAction = await dispatch(updateEvent({ ...values, })).unwrap() // console.log(resultAction);
    //             console.log('Success');

    //             const notice = buildNotice(resultAction)
    //             dispatch(addNotice(notice))

    //             if (resultAction) {
    //                 setIsUpdating(false)
    //             }
    //             toggleTooltipVisibility()

    //         } catch (err) {
    //             console.log('Failed');
    //             setIsUpdating(false)

    //         }

    //     }

    // }
    // TOOLTIP HEADER
    const HeaderTooltip = (({
        children, appointmentData/* , setOpenAppointmentForm */, ...restProps
    }) => {
        const [status, setStatus] = useState(appointmentData?.status)
        useEffect(() => {
            console.log('Tooltip');
            if (status !== appointmentData?.status) {
                setStatus(appointmentData?.status)
            }
        }, [appointmentData.status])

        return (
            <AppointmentTooltip.Header
                {...restProps}
                appointmentData={appointmentData}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>

                    <Stack direction="row" /* justifyContent="space-between" */ alignItems="center">
                        {appointmentData?.status !== 'trash' && <DeleteButton
                            size='large'
                            label=""
                            /* eslint-disable-next-line no-alert */
                            onConfirm={async () => {
                                const values = {
                                    eventID: appointmentData?.id, // appointmentData?.id,
                                    parameter: 'status',
                                    value: 'trash', // 'confirmed',
                                }
                                try {
                                    const resultAction = await dispatch(updateEvent({ ...values, })).unwrap() // console.log(resultAction);
                                    console.log('Success');

                                    const notice = buildNotice(resultAction)
                                    dispatch(addNotice(notice))
                                    toggleTooltipVisibility()
                                } catch (err) {
                                    console.log('Failed');
                                }
                                // try {
                                //     const resultAction = await dispatch(deleteEvent({ eventID: appointmentData.id, })).unwrap() // console.log(resultAction);
                                //     console.log('Success');

                                //     const notice = buildNotice(resultAction)
                                //     dispatch(addNotice(notice))

                                //     toggleTooltipVisibility()

                                // } catch (err) {
                                //     console.log('Failed');
                                // }

                            }}
                        />}
                        <IconButton
                            /* eslint-disable-next-line no-alert */
                            onClick={() => {
                                console.log(appointmentData);

                                toggleTooltipVisibility()
                                setEditingAppointment(appointmentData)
                                setOpenAppointmentForm(true);
                            }}
                            size="large"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={async () => {
                                // let copyData = {
                                //     ...appointmentData,
                                //     id: "",
                                //     // status: "active",
                                //     journals: [],
                                // }
                                // delete copyData?.startDate;
                                // delete copyData?.endDate;
                                // console.log(copyData);
                                copyEvent(appointmentData/* , copyData */)
                                // dispatch(state => copyRow(state, {...copyData}))
                                // toggleTooltipVisibility()
                                // setEditingAppointment(copyData)
                                // setOpenAppointmentForm(true);
                                // toggleTooltipVisibility()
                            }}
                            size="large"
                        >
                            <MdCopyAll />
                        </IconButton>
                        <EventSwitchStatusButton
                            eventID={appointmentData?.id}
                            status={appointmentData?.status}
                            onClickCallback={() => {
                                toggleTooltipVisibility()
                            }}
                        />
                        {/* {status !== 'confirmed' && <IconButton
                            onClick={async () => {
                                const values = {
                                    eventID: appointmentData?.id,
                                    parameter: 'status',
                                    value: 'confirmed',
                                }
                                const result = await updateEventStatus(values)
                                // if (result) {

                                // }
                                // toggleTooltipVisibility()
                            }}
                            size="large"
                        >
                            <FaThumbsUp />
                        </IconButton>}
                        {status !== 'deleted' && <IconButton
                            onClick={async () => {
                                const values = {
                                    eventID: appointmentData?.id,
                                    parameter: 'status',
                                    value: 'deleted',
                                }
                                const result = await updateEventStatus(values)
                                // toggleTooltipVisibility()
                            }}
                            size="large"
                        >
                            <TiCancel style={{ fontSize: "2rem" }} />
                        </IconButton>} */}

                    </Stack>
                </Stack>

            </AppointmentTooltip.Header>
        )
    });


    // // Style & other Comp
    const PREFIX = 'Wlcrm';

    const classes = {
        cell: `${PREFIX}-cell`,
        headerCell: `${PREFIX}-headerCell`,
        icon: `${PREFIX}-icon`,
        timeScale: `${PREFIX}-timeScale`,
        cellMonth: `${PREFIX}-cellMonth`,
        // toolbarWrapper: `${PREFIX}-toolbarWrapper`,
    };

    const useGroupingStyles = (Component, group) => {
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
                borderRight: '1px solid #e7e7e7',
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

    const TimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
        const StyledComponent = useGroupingStyles(DayView.TimeTableCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        return (
            <StyledComponent
                className={classes.cell}
                groupingInfo={groupingInfo}
                {...restProps}
            />
        );
    });

    const WeekTimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
        const StyledComponent = useGroupingStyles(WeekView.TimeTableCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        return (
            <StyledComponent
                className={classes.cell}
                groupingInfo={groupingInfo}
                {...restProps}
            />
        );
    });

    const MonthTimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
        const StyledComponent = useGroupingStyles(MonthView.TimeTableCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        return (
            <StyledComponent
                className={classes.cellMonth} // className={classes.cellMonth}
                groupingInfo={groupingInfo}
                {...restProps}
            />
        );
    });

    const DayScaleCell = React.memo(({ groupingInfo, ...restProps }) => { // console.log(groupingInfo);
        const StyledComponent = useGroupingStyles(DayView.DayScaleCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        return (
            <StyledComponent
                className={classes.headerCell}
                groupingInfo={groupingInfo}
                {...restProps}
            />
        );
    });

    const MonthScaleCell = React.memo(({ groupingInfo, ...restProps }) => { // console.log(groupingInfo);
        const StyledComponent = useGroupingStyles(MonthView.DayScaleCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        return (
            <StyledComponent
                className={classes.headerCell}
                groupingInfo={groupingInfo}
                {...restProps}
            />
        );
    });

    const DayTimeScaleLayout = React.memo(({ groupingInfo, ...restProps }) => {
        const StyledComponent = useGroupingStyles(DayView.TimeScaleLayout, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        // restProps.height = 60
        return (
            <StyledComponent
                className={classes.timeScale}
                // groupingInfo={groupingInfo}
                // height={60}
                {...restProps}
                style={{
                    ...restProps?.style,
                    // height: '60px',
                    // backgroundColor: 'red'
                }}
            />
        );
    });

    const DayTimeScaleTickCell = React.memo(({ groupingInfo, ...restProps }) => {
        const StyledComponent = useGroupingStyles(DayView.TimeScaleTickCell, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        // restProps.height = 60
        return (
            <StyledComponent
                // className={classes.timeScale}
                // groupingInfo={groupingInfo}
                {...restProps}
                style={{
                    ...restProps?.style,
                    height: '60px',
                    // lineHeight: '60px',
                    backgroundColor: '#f5f5f5',
                    borderRight: '3px solid #fff',
                    borderBottom: '3px solid #fff',
                    borderTop: '3px solid #fff',
                }}
            />
        );
    });

    const DayTimeScaleLabel = React.memo(({ groupingInfo, ...restProps }) => {
        // console.log(restProps);
        const StyledComponent = useGroupingStyles(DayView.TimeScaleLabel, groupingInfo?.length > 0 ? groupingInfo[0] : {});
        restProps.height = '60px'
        return (
            <StyledComponent
                className={classes.timeScale}
                // groupingInfo={groupingInfo}
                {...restProps}
                style={{
                    ...restProps?.style,
                    // height: '60px',
                    // lineHeight: '60px',
                    // backgroundColor: 'yellow'
                }}
            />
        );
    });

    // const TodayButtonLocalization = React.memo((props) => {
    //     return (
    //         <TodayButton.LocalizationMessages
    //             {...props}
    //             today="Oggi"
    //         />
    //     );
    // });

    return (
        <Paper sx={{ position: 'relative', minWidth: "100%" }}>
            <Box sx={{
                position: 'relative',
                height: 'calc(100vh - 60px)',
                // bottom: 0,
            }}>
                {/* <Box sx={{
                    position: 'relative',
                    height: '100%',
                    // bottom: 0,
                    '&>*': {
                        pb: 8,
                    }
                }}> */}
                <Scheduler
                    // ref={schedulerRef}
                    timeZone="Italy/Rome"
                    locale='it-IT'
                    // data={eventsData}
                    data={currentEvents/* events */} // {filterEvents(eventsData, currentGroupingClient, currentFilterStartDate, currentFilterEndDate)}
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
                        onCommitChanges={commitChanges}
                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={changeAddedAppointment}
                        appointmentChanges={appointmentChanges}
                        onAppointmentChangesChange={changeAppointmentChanges}
                        editingAppointment={editingAppointment}
                        onEditingAppointmentChange={changeEditingAppointment}
                    />
                    {/* {(integrateGrouping || currentGroupingUser.length > 0) &&
                        <GroupingState
                            grouping={groupingState}
                        // groupByDate={groupByDate}
                        />} */}
                    <GroupingState
                        grouping={grouping} // {groupingState}
                    // groupOrientation={getOrientationGrouping}
                    // groupByDate={groupByDate}
                    />

                    <DayView
                        startDayHour={schedulerOption?.first_hour} // {7.5}
                        endDayHour={schedulerOption?.last_hour} // {20.5}
                        // intervalCount={2}
                        cellDuration={schedulerOption?.cell_time_step} // {30}
                        displayName="Giornaliera"
                        timeTableCellComponent={TimeTableCell}
                        dayScaleCellComponent={DayScaleCell}
                        timeScaleLayoutComponent={DayTimeScaleLayout}
                        timeScaleTickCellComponent={DayTimeScaleTickCell}
                        timeScaleLabelComponent={DayTimeScaleLabel}
                    // // dayScaleEmptyCellComponent={DayDayScaleEmptyCell}
                    />
                    <WeekView
                        startDayHour={schedulerOption?.first_hour} // {7.5}
                        endDayHour={schedulerOption?.last_hour} // {20.5}
                        excludedDays={[0]}
                        timeTableCellComponent={WeekTimeTableCell}
                        dayScaleCellComponent={DayScaleCell}
                        timeScaleLayoutComponent={DayTimeScaleLayout}
                        timeScaleTickCellComponent={DayTimeScaleTickCell}
                        timeScaleLabelComponent={DayTimeScaleLabel}
                    />
                    <MonthView
                        startDayHour={schedulerOption?.first_hour} // {7.5}
                        endDayHour={schedulerOption?.last_hour} // {20.5}
                        timeTableCellComponent={MonthTimeTableCell}
                        dayScaleCellComponent={MonthScaleCell}
                        // timeScaleLayoutComponent={MonthTimeScaleLayout}
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

                    {/*  {(integrateGrouping || currentGroupingUser.length > 0) &&
                        <>
                            <IntegratedGrouping />
                            <GroupingPanel groups={users} />
                        </>} */}
                    <IntegratedGrouping />
                    <GroupingPanel groups={[users, clients]} />

                    <IntegratedEditing />

                    <Toolbar
                        {...loading === 'loading' ? { rootComponent: ToolbarWithLoading } : { rootComponent: StyledToolbar }}
                    />
                    {/* <StyledToolbar
                        {...loading === 'loading' ? { rootComponent: ToolbarWithLoading } : null}
                    /> */}
                    <DateNavigator />
                    <TodayButton
                        messages={{
                            today: "Oggi"
                        }}
                    />
                    <ViewSwitcher />
                    {/* <div>TEST</div> */}
                    <AppointmentTooltip
                        visible={openAppointmentTooltip}
                        onVisibilityChange={toggleTooltipVisibility}
                        showCloseButton
                        headerComponent={HeaderTooltip}
                        contentComponent={ContentTooltip}
                    />
                    <AppointmentForm visible={false} />
                </Scheduler>
                {/*                 <Box sx={{
                    pb: 8
                }}> </Box> */}
                {/* </Box> */}
            </Box>

        </Paper>
    );

}