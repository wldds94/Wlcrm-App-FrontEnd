import React, { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'
import { getOptionsConfigPreferences } from 'store/reducers/options'

// project import 
import { CustomAvatar } from 'components/avatar/CustomAvatar'


const CompanyLogo = () => {
    const {logo} = useSelector(getOptionsConfigPreferences)

    const Logo = useMemo(() => {
        return (
            <CustomAvatar
                srcAvatar={logo}
            />
        )
    }, [logo])

    return (
        <>
            {Logo}
        </>
    )
}

export default CompanyLogo