import React from 'react'

// config
import { schedulerConfig } from 'config';

const useCalendarSession = () => {
    const usersView = localStorage.getItem(schedulerConfig?.sessionKeyView)
    const usersMode = localStorage.getItem(schedulerConfig?.sessionKeyMode)
    const onlyUser = localStorage.getItem(schedulerConfig?.sessionKeyOnlyUser)

    const session = {
        mode: usersMode ? usersMode : schedulerConfig?.mode,
        view: usersView ? usersView : schedulerConfig?.view,
        onlyUser: onlyUser ? true : schedulerConfig?.onlyUser,
        config: {
            ...schedulerConfig
        }
    }
    
    return session
}

export default useCalendarSession