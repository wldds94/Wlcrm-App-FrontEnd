import React, { useEffect, useState } from 'react'

// material ui
import { Grid, Stack, Typography } from '@mui/material';

// react router dom
import { useLocation } from 'react-router-dom';

// utils
import { findIndexPageByLocationPop } from 'utils/app/router';

const PagePanelHeader = ({
    routers,
    withPadding = false,
    ...other
}) => {

    // router
    const location = useLocation()
    const [router, setRouter] = useState(findIndexPageByLocationPop(location.pathname, routers))
    const [lastLocation, setLastLocation] = useState(location.pathname.split('/').pop())
    useEffect(() => {
        const last = location.pathname.split('/').pop() // console.log(last);
        if (last !== lastLocation) {
            setLastLocation(last)
        }
        const page = routers[findIndexPageByLocationPop(location.pathname, routers)] // console.log(key, value);
        const { key, value } = page

        if (key !== router?.key) {
            setRouter(page)
        }
        // console.log(lastLocation, page);
    }, [location.pathname])

    const useBaseRoute = router?.useBaseRoute ? router?.useBaseRoute : false

    return (
        <>
            {(router?.hasSubtitle && (useBaseRoute ? lastLocation === router?.base?.substring(1) : lastLocation === router?.value)) && <Grid container spacing={0} /* sx={{ pt: withPadding ? 3 : 0, pl: withPadding ? 3 : 0, pr: withPadding ? 3 : 0}} */>
                <Grid item xs={12} sx={{ mb: 3, }} >
                    <Stack >
                        <Typography variant="h4b" >{router?.titleLabel}{/* Profilo Fiscale */}</Typography>
                        <Typography variant="body1" >{router?.titleDescription}</Typography>
                    </Stack>
                </Grid>
            </Grid>}
        </>
    )
}

export default PagePanelHeader