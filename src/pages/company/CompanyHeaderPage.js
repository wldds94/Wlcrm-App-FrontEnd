import React from 'react'

// project import
import RouterHeaderLayout from 'components/router-page/RouterHeaderLayout'

// hooks
import useCompany from 'hooks/redux/useCompany'

const CompanyHeaderPage = ({
    // srcAvatar = "",
    headerNavItems = [],
}) => {
    console.log('Mount Company');
    const company = useCompany() //  useSelector(getOptions)

    return (
        <RouterHeaderLayout
            data={{
                srcAvatar: company?.settings?.logo ? company?.settings?.logo : "",
                info: [{
                    value: /* "Dott. " +  */company?.doctor_option?.first_name + " " + company?.doctor_option?.last_name,
                }]
            }}
            items={headerNavItems}
        />
    )
}

export default CompanyHeaderPage