import React from 'react'

// react router dom
import { Link as ReactRouterLink } from "react-router-dom";

// project import
import { BackgroundLetterAvatars } from 'components/avatar/CustomAvatar'

const ClientsAvatarCard = ({
    client = {},
    withProfileLink = true,
}) => {
    const ClientAvatar = () => (
        <BackgroundLetterAvatars
            name={client?.name}
            withChildren={false}
            avSx={{ width: 28, height: 28, fontSize: '.8rem' }}
        />
    )

    return (
        <>
            {withProfileLink
                ? <ReactRouterLink to={"/clients/profile/" + client?.chiperId}>
                    <ClientAvatar />
                </ReactRouterLink>
                : <ClientAvatar />
            }
        </>
    )
}

export default ClientsAvatarCard