import React, { useEffect } from 'react'

// material-ui
import { Box, Button, Fab, Stack } from '@mui/material';

// Dayjs
import dayjs from 'dayjs' // ES 2015

// Redux
import { useDispatch, useSelector } from 'react-redux';
//slices
import { getOptionsSchedulerSettings } from 'store/reducers/options';

// project import
import { TabPanel } from 'components/tab-panel/TabPanel';
import RelativeDrawer from 'components/drawer/RelativeDrawer';
import InvoiceFormStepper from 'pages/invoices/common/InvoiceFormStepper';
import InvoiceTitle from 'pages/invoices/common/InvoiceTitle';
import SubTabHeader from 'components/page-tab/header/SubTabHeader';
import Calendar from '../components/Calendar';
import EventForm from '../components/appointment/EventForm';
import FiltersForm from '../components/filters/FiltersForm';
import ClinicalComment from '../components/journal/ClinicalComment';
import SwitchModeButton from '../common/SwitchModeButton';

// icons
import { FilterDialogIcon, PlusIcon, ArrowBackIcon } from 'assets/font-icons/icons';

// hooks
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData';


const ScheduleCalendarPage = () => {
    const schedulerSettings = useSelector(getOptionsSchedulerSettings)

    const { data: eventsData, users, clients } = useSchedulerData()
    console.log(eventsData);

    const [currentGroupingUsers, setCurrentGroupingUsers] = React.useState([])

    const [currentGroupingClient, setCurrentGroupingClient] = React.useState([]) // const [currentUser, setCurrentUser] = React.useState([]) // React.useState(0)
    const [currentFilterStartDate, setCurrentFilterStartDate] = React.useState(null)
    const [currentFilterEndDate, setCurrentFilterEndDate] = React.useState(null)

    const [openAppointmentForm, setOpenAppointmentForm] = React.useState(false)
    const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false)

    const [addedAppointment, setAddedAppointment] = React.useState({})
    const [appointmentChanges, setAppointmentChanges] = React.useState({})
    const [editingAppointment, setEditingAppointment] = React.useState(undefined)

    const panels = {
        schedule: 0,
        newComment: 1,
        newInvoice: 2,
    }
    const [currentPanel, setCurrentPanel] = React.useState(0)

    const filterUsers = (users, usersIDs) => users.filter(user => {
        // console.log(users); console.log(usersIDs); console.log(user);
        if (!usersIDs.length || !usersIDs) {
            return true
        }
        const res = usersIDs.findIndex(el => { // console.log(el); console.log(user); console.log(user.id);
            return Number(user.id) === Number(el)
        }) // console.log(res);
        return res > -1 ? true : false // !userId || user.id == usersIDs
    });

    const handleUserChange = (e, value) => { // console.log(e); console.log(e.target.value); // const { value } = e.target
        console.log('handleUserChange');
        console.log(value);
        setCurrentGroupingUsers(value)
    }

    const handleClientChange = (e, value) => { // console.log(e); console.log(e.target.value); // const { value } = e.target
        // const newInstance = filterClients(clients, value) console.log(newInstance); 
        console.log('handleClientChange');
        console.log(value);
        setCurrentGroupingClient(value);
    }

    const handleDateChange = (value, name) => {
        if (name === "startDate") {
            console.log(value);
            setCurrentFilterStartDate(value)
        }
        if (name === "endDate") {
            console.log(value);
            setCurrentFilterEndDate(value)
        }
    }

    /** EDITING STATE SCHEDULER */
    const changeAddedAppointment = (addedAppointment) => {
        console.log('Added Appointment');

        const newAppointment = Object.assign(addedAppointment, {})
        newAppointment.userId = addedAppointment?.userId ? addedAppointment?.userId : ""
        newAppointment.clientId = addedAppointment?.clientId ? addedAppointment?.clientId : ""
        newAppointment.notes = ""
        newAppointment.comment = ""
        // this.setState({ addedAppointment });
        setEditingAppointment(newAppointment)
        console.log(newAppointment);
        setOpenAppointmentForm(true);
    }

    const changeAppointmentChanges = ({ field, changes }/* appointmentChanges */) => {
        console.log('Change Appointment');
        console.log(appointmentChanges);
        console.log(field, changes);

        // this.setState({ appointmentChanges });
    }

    const changeEditingAppointment = (editingAppointment) => {
        console.log('Edit Appointment');
        console.log(editingAppointment);
        // setOpenAppointmentForm(!openAppointmentForm)
        setEditingAppointment(editingAppointment)
    }

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            console.log('added');
            console.log(added);
            // const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            // data = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
            console.log('changed');
            console.log(changed);
            // data = data.map(appointment => (
            //     changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }
        if (deleted !== undefined) {
            console.log('deleted');
            console.log(deleted);
            // data = data.filter(appointment => appointment.id !== deleted);
        }
    }

    const filterEvents = (events, clientsIDs, startDate, endDate) => {
        const filteredByClient = filterEventsByClient(events, clientsIDs) // console.log(filteredByClient);

        const resFiltered = filterDate(filteredByClient, startDate, endDate) // console.log(resFiltered);
        return resFiltered
    }

    const filterDate = (events, startDate = null, endDate = null) => {
        const innerStartDate = startDate === null ? '0000-01-01' : startDate
        const innerEndDate = endDate === null ? "3000-01-01" : endDate
        const startSearchDate = dayjs(innerStartDate)
        const endSearchDate = dayjs(innerEndDate)

        return events.filter(event => {
            const eventDate = dayjs(event.endDate)
            return eventDate.isBetween(startSearchDate, endSearchDate) // .isAfter(searchDate)
        })
    }

    const filterEventsByClient = (events, clientsIDs) => events.filter(event => {
        // console.log(users); console.log(usersIDs); console.log(user);
        if (!clientsIDs.length || !clientsIDs) {
            return true
        }
        return clientsIDs.includes(Number(event.clientId))

    });

    return (
        <Box sx={{
            position: 'relative',
            height: '100%',
            overflow: 'auto',
        }} >
            {/** CALENDAR */}
            <div style={{ display: currentPanel === 0 ? 'block' : 'none' }}>
                <Calendar
                    users={filterUsers(users, currentGroupingUsers)} // {users} // usersResource={users}
                    clients={clients} // clientsResource={clients}
                    events={filterEvents(eventsData, currentGroupingClient, currentFilterStartDate, currentFilterEndDate)} // {eventsData}
                    // resources={resourcesState}
                    editingAppointment={editingAppointment}
                    setEditingAppointment={setEditingAppointment}
                    addedAppointment={addedAppointment}
                    changeAddedAppointment={changeAddedAppointment}
                    appointmentChanges={appointmentChanges}
                    changeAppointmentChanges={changeAppointmentChanges}
                    changeEditingAppointment={changeEditingAppointment}
                    commitChanges={commitChanges}
                    setOpenAppointmentForm={setOpenAppointmentForm}
                    setCurrentPanel={setCurrentPanel}
                    // setOpenClinicalForm={setOpenClinicalForm}
                    schedulerSettings={schedulerSettings}
                />
            </div>

            <TabPanel value={currentPanel} index={1} padding={false} >
                {/* <Box sx={{minWidth: "100%", height: 'calc(100vh - 60px)' }}>
                    <ClinicalComment editingAppointment={editingAppointment} />
                </Box> */}
                <ClinicalComment editingAppointment={editingAppointment} />
            </TabPanel>

            <TabPanel value={currentPanel} index={2} padding={false} >
                <SubTabHeader
                    TitleComponent={() => <InvoiceTitle />}
                />
                <Box sx={{ /* background: "green" */mb: 1, p: 2, pt: 10, minWidth: "100%" }}>
                    {/* New Invoice */}
                    <InvoiceFormStepper
                        clientId={editingAppointment?.clientId ? editingAppointment?.clientId : false}
                        step={3}
                    />
                </Box>
            </TabPanel>


            {/**EVENT FORM */}
            <RelativeDrawer open={openAppointmentForm} handleDrawerClose={() => { setOpenAppointmentForm(false) }} >
                <EventForm
                    formData={editingAppointment}
                // copyingData={copyingAppointment}
                />
                {/* TEST RElative Drawe */}
            </RelativeDrawer>

            {/**FILTERS */}
            <RelativeDrawer
                open={openFilterDrawer}
                handleDrawerClose={() => { setOpenFilterDrawer(false) }}
                maxWidth={340}
                position="right"
                persistent={true}
            >
                <Box sx={{ position: 'relative' }}>
                    <FiltersForm
                        users={users}
                        handleUserChange={handleUserChange}
                        clients={clients}
                        handleClientChange={handleClientChange}
                        handleDateChange={handleDateChange}
                    />
                </Box>
            </RelativeDrawer>

            {/** ACTIONS PANEL */}
            {(!(openAppointmentForm || openFilterDrawer) && currentPanel < 1) &&
                <>
                    <Stack direction="column-reverse" spacing={1} sx={{
                        position: "fixed", // "absolute",
                        bottom: '1rem',
                        right: '1rem',
                        alignItems: 'center',
                        // transition: "all 1320ms ease-in",
                    }}>
                        <Fab
                            color="primary"
                            size="large"
                            onClick={() => {
                                setEditingAppointment(null)
                                setOpenAppointmentForm(true)
                            }}
                        >
                            <PlusIcon />
                        </Fab>
                        <Fab
                            color="secondary"
                            size="medium"
                            onClick={() => {
                                setOpenFilterDrawer(true)
                            }}
                        >
                            <FilterDialogIcon />
                        </Fab>
                        <SwitchModeButton mode="list" />
                    </Stack>
                </>
            }

            {/** BACK TO SCHEDULE BUTTON */}
            {currentPanel !== 0 &&
                <>
                    <Stack direction="column-reverse" spacing={1} sx={{
                        position: "fixed", // "absolute",
                        bottom: '1rem',
                        left: 'calc(60px + 1rem)',
                        alignItems: 'center',
                        // transition: "all 1320ms ease-in",
                    }}>
                        <Button
                            variant="contained" // "text"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => {
                                setCurrentPanel(0)
                                setEditingAppointment(null)
                            }}
                        >Torna al calendario</Button>
                    </Stack>
                </>}
        </Box>
    )
}

export default ScheduleCalendarPage