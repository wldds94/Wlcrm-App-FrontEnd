import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles'

// react-redux
import { useSelector } from 'react-redux';
import { getJournalByEventId } from 'store/reducers/clinical';

// utils
import dynamicSortMultiple from 'utils/array';

// project import
import ClinicalJournalForm from 'pages/journal/common/ClinicalJournalForm';
import JournalsInfoContent from 'pages/journal/common/JournalsInfoContent';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import AppointmentsClientsInfo from 'pages/calendar/common/events/card/AppointmentsClientsInfo';
import AppointmentsUsersInfo from 'pages/calendar/common/events/card/AppointmentsUsersInfo';
import AppointmentsEventsInfo from 'pages/calendar/common/events/card/AppointmentsEventsInfo';


const ClinicalComment = ({
    editingAppointment,
    ...other
}) => {
    console.log(editingAppointment);
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    // const users = useSelector(getAllUsersEvents)
    // const { id = null, title = null, startDate = null, clientId = null, userId = null } = editingAppointment

    const journals = useSelector(state => getJournalByEventId(state, Number(editingAppointment.id)))

    // const [currentAppointment, setCurrentAppointment] = useState({
    //     id: "",
    //     clientId: editingAppointment?.clientId,
    //     eventId: editingAppointment?.id,
    // })
    // useEffect(() => {
    //     if (editingAppointment?.clientId !== currentAppointment?.clientId
    //         || editingAppointment?.eventId !== currentAppointment?.eventId) {
    //         setCurrentAppointment({
    //             id: "",
    //             clientId: editingAppointment?.clientId,
    //             eventId: editingAppointment?.id,
    //         })
    //     }
    // }, [editingAppointment])
    // const [currentJournals, setCurrentJournals] = useState(editingAppointment?.journals)
    // useEffect(() => {
    //     const {journals = false} = editingAppointment
    //     if (JSON.stringify(journals) !== JSON.stringify(currentJournals) && journals) {
    //         setCurrentJournals(journals)
    //     }
    //     // if (editingAppointment?.clientId !== currentAppointment?.clientId
    //     //     || editingAppointment?.eventId !== currentAppointment?.eventId) {
    //     //     setCurrentAppointment({
    //     //         id: "",
    //     //         clientId: editingAppointment?.clientId,
    //     //         eventId: editingAppointment?.id,
    //     //     })
    //     // }
    // }, [editingAppointment])

    // const journalInput = {
    //     id: "",
    //     clientId: editingAppointment?.clientId,
    //     eventId: editingAppointment?.id,
    // }

    return (
        <>
            <Box sx={{
                p: 1.5,
                borderBottom: "1px solid #d9d9d9",
                borderTop: "1px solid #d9d9d9",
                boxShadow: '0px 2px 9px 0px #d9d9d9',
                zIndex: 5,
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
            }} >
                <Stack direction="row" justifyContent="space-between" >
                    <Typography variant="h6b" >Diario Clinico</Typography>
                </Stack>
            </Box>

            {/** BODY */}
            <Box
                sx={{
                    p: 1.5,
                    borderTop: "1px solid #d9d9d9",
                    background: "white",
                    zIndex: 1,
                    position: "relative",
                    position: "sticky",
                    top: "48px",
                    boxShadow: '0px 1px 6px 0px #b5b5b5',
                }} >
                {/** EVENTS INFO */}
                <Stack direction={matchDownSM ? "column" : "row"} sx={{ p: 1, }} gap={2} >
                    <AppointmentsClientsInfo
                        client={editingAppointment?.client}
                        withClientInfo={true}
                        withMetaInfo={false}
                        withContactInfo={false}
                    />
                    <Stack gap={1.5} /* sx={{ width: '100%'}} */>
                        <AppointmentsUsersInfo
                            user={editingAppointment?.user}
                        />
                        <AppointmentsEventsInfo
                            item={editingAppointment}
                            hideNotes={true}
                        // toggleNotes={toggleNotes}
                        />
                    </Stack>

                    {/* <EventsInfo eventsData={editingAppointment} /> */}
                </Stack>

                {/** COMMENT FORM */}
                <Box sx={{ p: 1, }} >
                    <ClinicalJournalForm
                        formData={{
                            id: "",
                            clientId: editingAppointment?.clientId,
                            eventId: editingAppointment?.id,
                        }}
                        withEventResearch={false}
                    />
                </Box>
            </Box>

            {/** HISTORY JOURNALS */}
            <Box sx={{ pt: 1.5, pl: 2, pr: 2, pb: 8, }}/* sx={{ pt: 1.5, pl: 1.5, pr: 1.5, }} */ >
                <SimpleHeaderDivider
                    title="Storico Diario Clinico"
                    description="Note Diario Clinico relative a questo appuntamento"
                />
                {/* <Typography variant="h6b" sx={{ color: "grey", display: "block", }} >Diario Clinico:</Typography> */}
                {journals?.sort(dynamicSortMultiple('-createdAt'))?.map((event, index) => {
                    console.log(event);
                    // const user = users?.find(item => item.id === event.userId)

                    return (
                        <JournalsInfoContent key={index} index={index} event={event} user={editingAppointment?.user} />
                    )
                })}
                {/* {journals?.sort(dynamicSortMultiple('-startDate'))?.map((event, index) => {
                    console.log(event);
                    const user = users?.find(item => item.id === event.userId)

                    return (
                        <JournalsInfoContent key={index} index={index} event={event} user={user} />
                    )
                })} */}
            </Box>
        </>
    )
}

export default ClinicalComment