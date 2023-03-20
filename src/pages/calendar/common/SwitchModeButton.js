import React from 'react'
import { Fab } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setPreferencesMode } from 'store/reducers/calendar'

// icons
import { MdEventNote } from 'react-icons/md'
import { FaThList } from 'react-icons/fa'

const SwitchModeButton = ({
    mode,
    ...other
}) => {
    const dispatch = useDispatch()

    const modes = [
        {
            key: 'list',
            icon: <FaThList />,
            // switchValue: 'calendar',
        },
        {
            key: 'calendar',
            icon: <MdEventNote size={20} />,
            // switchValue: 'panel',
        },
    ]

    return (
        <>
            {modes?.filter(item => item?.key === mode)?.map((item, index) => {
                return (
                    <Fab
                        key={index}
                        color="secondary"
                        size="small"
                        onClick={() => {
                            dispatch(setPreferencesMode({ mode: item?.key }))
                            // setOpenFilterDrawer(true)
                        }}
                    >
                        {item?.icon}
                        {/* <FaThList /> */}
                    </Fab>
                )
            })}
        </>

    )
}

export default SwitchModeButton