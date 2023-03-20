import React from 'react'

// material ui
import { Stack, Typography } from '@mui/material'

// project import
import { BackgroundLetterAvatars } from 'components/avatar/CustomAvatar'

const AppointmentsUsersInfo = ({
    user = {},
    ...other
}) => {
    const actionsText = "->"

    return (
        <>
            <Stack direction="row" gap={1} alignItems="center" sx={{ width: '100%', }}>
                <BackgroundLetterAvatars
                    name={user?.display_name}
                    withChildren={false}
                    withAvatarIcon={false}
                    // size={36} // fontSize={'.8rem'}
                    avSx={{ width: 16, height: 16, fontSize: '.8rem' }}
                />
                <Stack gap={.2}>
                    <Typography variant="h5" sx={{ lineHeight: 1, }} >{user?.display_name}</Typography>
                    {/* <Typography variant="caption" color="secondary" sx={{ lineHeight: 1, }} >{user?.roles[0]}</Typography> */}
                </Stack>
                {/* <Stack>
                    {actionsText}
                </Stack> */}
            </Stack>
        </>
    )
}

export default AppointmentsUsersInfo