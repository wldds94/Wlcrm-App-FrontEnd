import React from 'react'

import { Link as ReactRouterLink } from "react-router-dom";

// material ui
import { Link, Stack, Typography } from '@mui/material'

// project import
import { BackgroundLetterAvatars } from 'components/avatar/CustomAvatar'
import { getAge } from 'utils/libs/dayjsUtils'
import { getHumanSex } from 'utils/app/user'
import PulsingDot from 'components/@extended/pulsing-dot/PulsingDot'
import { Box } from '../../../../../../node_modules/@mui/material/index'
import ClientsAvatarCard from 'pages/clients/list/components/ClientsAvatarCard';

const AppointmentsClientsInfo = ({
    client = {},
    withClientInfo = true,
    withClientPiva = false,
    withMetaInfo = true,
    withContactInfo = true,
    withStatusInfo = false,
    rightAlignment = false,
    withProfileLink = false,
    ...other
}) => {
    const actionsText = "->"

    const dob = getAge(client?.birth_date)
    const sex = getHumanSex(client?.sex)

    const ContactInfo = () => (
        <Stack /* direction="row" */ /* gap={.5} */ alignItems={rightAlignment ? 'end' : 'start'} sx={{ width: '100%', }}>
            <Typography variant="h6b" color="text.secondary" sx={{ /* lineHeight: 1, */ fontWeight: 600, }}>{client?.telephone}</Typography>
            <Link href={"tel:" + client?.telephone} style={{ lineHeight: 1, }}>
                <Typography variant="caption" sx={{ fontWeight: 600, }} >Chiama Paziente</Typography>
            </Link>
        </Stack>
    )

    // const ClientAvatar = () => (
    //     <BackgroundLetterAvatars
    //         name={client?.name}
    //         withChildren={false}
    //         avSx={{ width: 28, height: 28, fontSize: '.8rem' }}
    //     />
    // )

    // const AvatarContent = () => {
    //     return (
    //         <>
    //             {withProfileLink
    //                 ? <ReactRouterLink to={"/clients/profile/" + client?.chiperId}>
    //                     <ClientAvatar />
    //                 </ReactRouterLink>
    //                 : <ClientAvatar />
    //             }
    //         </>
    //     )
    // }

    return (
        <>
            <Stack gap={1.5} sx={{ width: '100%', }}>
                {/* PROFILE */}
                <Stack direction="row" gap={1} alignItems="center" sx={{ width: '100%', }}>
                    {/* <BackgroundLetterAvatars
                        name={client?.name}
                        withChildren={false}
                        avSx={{ width: 28, height: 28, fontSize: '.8rem' }}
                    /> */}
                    {/* <AvatarContent /> */}
                    <ClientsAvatarCard
                        client={client}
                        withProfileLink={withProfileLink}
                    />
                    {withClientInfo && <Stack gap={.2}>
                        <Stack direction="row" gap={.2}>
                            <Typography variant="h5" sx={{ whiteSpace: 'nowrap', }} >{client?.name}</Typography>
                            {withStatusInfo && <PulsingDot status={client.status} />}
                        </Stack>

                        {withMetaInfo && <Typography variant="caption" color="secondary" sx={{ lineHeight: 1, }} >
                            {dob + " " + (dob === 1 ? 'anno' : 'anni')}, {sex}{/* {client?.sex} */}
                        </Typography>}
                        {withClientPiva && <Typography variant="caption" color="secondary" sx={{ lineHeight: 1, }} >
                            {client?.piva}
                        </Typography>}
                    </Stack>}
                    {(!withClientInfo && withContactInfo) && <ContactInfo />}
                </Stack>
                {/* CONTACT */}
                {(withClientInfo && withContactInfo) && <ContactInfo />}
            </Stack>

        </>
    )
}

export default AppointmentsClientsInfo