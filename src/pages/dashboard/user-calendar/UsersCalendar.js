import React, { useMemo } from 'react'
// material-ui
import {
    Box,
    Typography
} from '@mui/material';

// react-redux
import { useSelector } from 'react-redux'
// slices
import { getOptionsSchedulerSettings } from 'store/reducers/options';

// project import
import UsersScheduler from './components/UsersScheduler'

// hooks
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';
import useClients from 'hooks/redux/useClients';
import useSchedulerData from 'hooks/redux/aggregate/useSchedulerData';

const UsersCalendar = () => {
    // scheduler settings
    const schedulerSettings = useSelector(getOptionsSchedulerSettings)
    
    const {clients} = useClients() // useSelector(selectAllClients)

    const { currentAccount: account} = useCurrentAccount() // console.log(account);
    const {data: events} = useSchedulerData() // useSelector(state => getCalendarEventsByUserID(state, account?.ID))
    const visibleEvents = useMemo(() => {
        return events?.filter(item => Number(item?.userId) === Number(account?.ID))
    }, [events]) // console.log(visibleEvents);

    return (
        <>
            {account /* !== undefined && */
                ? <Box sx={{
                    position: 'relative',
                    height: '100%',
                    overflow: 'auto',
                    // pb: 2,
                }} >
                    <UsersScheduler
                        users={[account]}
                        clients={clients}
                        events={visibleEvents}
                        schedulerSettings={schedulerSettings}
                    // resources={resourcesState}
                    />
                </Box> :
                <>
                    <Box sx={{ p: 2, }} >
                        <Typography variant="h6b" >Spiacenti, nessuna informazione da Visualizzare</Typography>
                    </Box>
                </>}
        </>

    )
}

export default UsersCalendar
