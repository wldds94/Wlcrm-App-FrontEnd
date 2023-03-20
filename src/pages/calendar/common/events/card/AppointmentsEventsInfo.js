import React, { useState } from 'react'

// material ui
import { Box, Link, Stack, Typography, useMediaQuery } from '@mui/material'
// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import { BackgroundLetterAvatars } from 'components/avatar/CustomAvatar'
import { getHourAndDate } from 'utils/date'

// icons
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { EditIcon } from 'assets/font-icons/icons';
import { TiCancel } from 'react-icons/ti'

const AppointmentsEventsInfo = ({
    item = {},
    visibleInfoContent = {},
    hideNotes = false,
    visibleNotes = false,
    toggleNotes = true,
    ...other
}) => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const visibleInfo = {
        hour: true,
        date: true,
        title: true,
        notes: visibleNotes, // false,
        status: true,
        ...visibleInfoContent
    }

    const [openNotes, setOpenNotes] = useState(visibleInfo?.notes)

    const { hour, date } = getHourAndDate(item?.startDate)

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ width: '100%', }}>
                <Stack gap={.7}>
                    {visibleInfo?.title && <Typography variant="h6b" color="#afafb7" /*#747474*/ sx={{ lineHeight: 1, fontSize: '1rem', textDecoration: item?.status !== 'deleted' ? 'none' : 'line-through' }} >{item?.title}</Typography>}
                    {/* TIMING */}
                    {(visibleInfo?.hour || visibleInfo?.date) && <Stack direction="row" gap={1.5} alignItems="baseline" >
                        {visibleInfo?.hour && <><Typography variant="h4" sx={{ lineHeight: 1, textDecoration: item?.status !== 'deleted' ? 'none' : 'line-through' }} /* color="text.secondary" */>
                            {/* h  */}{hour}
                        </Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1, /* textDecoration: item?.status !== 'deleted' ? 'none' : 'line-through' */ }} color="text.secondary">-</Typography></>}
                        {visibleInfo?.date && <Typography variant={visibleInfo?.hour ? "body1" : "h4"} color={visibleInfo?.hour ? "#8f8f8f" : 'inherit'} sx={{ lineHeight: 1, fontSize: '1rem', textDecoration: item?.status !== 'deleted' ? 'none' : 'line-through' }} /* color="text.secondary"  sx={{ lineHeight: 1, }}*/>
                            {date}
                        </Typography>}
                    </Stack>}
                    {/* NOTES */}
                    {(hideNotes === false /* && item?.notes?.length > 0 */) && 
                    <Stack /* gap={.6} */ sx={{ mt: .5 }}>
                        {toggleNotes && <Typography variant="caption" sx={{ fontWeight: 600, cursor: 'pointer' }} ><Link onClick={() => setOpenNotes(!openNotes)} /* style={{ lineHeight: 1, }} */>
                            {openNotes ? "Chiudi" : "Vedi"} Nota
                        </Link></Typography>}
                        {(hideNotes === false && openNotes) && <Typography
                            variant="caption"
                            sx={{ /* lineHeight: 1, textDecoration: item?.status !== 'deleted' ? 'none' : 'line-through' */ }}
                            color="text.secondary"
                        >
                            {item?.notes?.length > 0 ? item?.notes : "Nessuna Nota inserita"}
                        </Typography>}
                    </Stack>
}
                </Stack>


                {/* STATUS */}
                {visibleInfo?.status && <Stack /* direction="row" gap={1.5} */ alignSelf="end" >
                    {item?.status !== 'active' && (
                        <>
                            {item?.status === 'confirmed' && <Box sx={{ p: .2, }}><FaThumbsUp size={20} style={{ color: '#4caf50' }} /></Box>}
                            {item?.status === 'deleted' && <TiCancel size={35} style={{ /* fontSize: '5rem',  */color: '#ff4d4f' }} />}
                        </>
                    )}
                </Stack>}

            </Stack>
        </>
    )
}

export default AppointmentsEventsInfo