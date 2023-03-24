import React from 'react'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import RecallCardContent from './RecallCardContent'

const RecallCard = ({
    item = {},
    withClientInfo = true,
    withClientProfileLink = false,
    // clientRightAlignment = false,
    ...other
}) => {
    return (
        <>
            <AccordionCard
                bottomBorder={false}
                fullWidth={true}
                lightBoxShadow={true}
                // ContentSummary={() => <SimpleHeaderBoxed title={'Prossimi Appuntamenti'} lightShadow={true} />}
                ContentDetails={() => <>
                    <RecallCardContent
                        item={item}
                        withClientInfo={withClientInfo}
                        withClientProfileLink={withClientProfileLink}
                        clientRightAlignment={true}
                    />
                </>}
            />
        </>
    )
}

export default RecallCard