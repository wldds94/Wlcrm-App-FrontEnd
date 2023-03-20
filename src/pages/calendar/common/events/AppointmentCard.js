import React from 'react'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import AppointmentCardContent from './AppointmentCardContent'

const AppointmentCard = ({
    item = {},
    withClientInfo = true,
    withProfileLink = false,
    lightBoxShadow = true,
    ...other
}) => {
    return (
        <>
            <AccordionCard
                bottomBorder={false}
                fullWidth={true}
                lightBoxShadow={lightBoxShadow}
                // ContentSummary={() => <SimpleHeaderBoxed title={'Prossimi Appuntamenti'} lightShadow={true} />}
                ContentDetails={() => <>
                    <AppointmentCardContent item={item} withClientInfo={withClientInfo} withProfileLink={withProfileLink} />
                </>}
            />
        </>
    )
}

export default AppointmentCard