import React from 'react'

// material-ui
import {
    Stack,
} from '@mui/material';

// react-redux
import { useSelector } from 'react-redux'
// slices
import { getOptionsSettings } from 'store/reducers/options'

// project import
import SettingsForm from './components/SettingsForm'
import LogoPanel from './panel/LogoPanel'

const SettingsGeneralPage = () => {
    const settings = useSelector(getOptionsSettings)
    console.log(settings);

    return (
        <>
            {settings && <Stack gap={2}>
                <LogoPanel logoURL={settings?.logo} />
                <SettingsForm
                    formData={{
                        ...settings?.invoice,
                        ...settings?.scheduler,
                        // logo: [currentLogo]
                    }}
                />
            </Stack>}
        </>
    )
}

export default SettingsGeneralPage