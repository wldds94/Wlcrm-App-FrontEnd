import React from 'react'
// material ui
import { Stack } from '@mui/material'

// project import
import ActionsItem from './ActionsItem'

const ActionsCard = ({
    items = [],
    children,
    withRightPadding = false,
    // OffContent = false, //  = () => <></>,
    ...other
}) => {
    return (
        <Stack direction="row" gap={.4} alignItems='center' justifyContent="end" sx={{ pr: withRightPadding ? 4 : 0, }} >
            {items?.map((action, index) => {
                return (
                    action?.isComponent ?
                        <action.Component key={index} />
                        : <ActionsItem
                            key={index}
                            icon={action.icon}
                            onClick={() => action?.onClick()}
                            withLink={action?.withLink ? action?.withLink : false}
                            color={action?.color}
                        />
                )
            })}
            {children !== null && children}
            {/* {OffContent !== false && <OffContent />} */}
        </Stack>
    )
}

export default ActionsCard