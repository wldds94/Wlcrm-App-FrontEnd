import React, { useEffect, useState } from 'react'

// material ui
import Tabs from '@mui/material/Tabs';
import {Tab } from '@mui/material';
// styled
import { useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

// react router dom
import { useLocation, useNavigate } from 'react-router-dom';

// utils
import { findIndexPageByLocationPop, findPageByDefault } from 'utils/app/router';

export const TabStyled = styled(Tab)(({ theme }) => ({
    justifyContent: 'flex-start', width: "100%", // width: 300,
    gap: '.3rem',
    textAlign: 'left',
    color: '#98989f', // '#686868', // '#41444b', // theme.palette.success.main,
    '&.MuiButtonBase-root': {
        'svg': { fontSize: '1.2rem' },
        '&:hover, &.Mui-selected': {
            backgroundColor: theme.palette.secondary.lighter,
            boxShadow: '0px 3px 6px -2px rgba(0, 0, 0, 20%)',
        },
    },
}));

const PageNav = ({
    routers,
    ...other
}) => {
    // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    // navigation
    const navigate = useNavigate()

    // router
    const location = useLocation()
    // const [router, setRouter] = useState(findIndexPage(location.pathname.split('/').pop(), routers))
    const [router, setRouter] = useState(findIndexPageByLocationPop(location.pathname, routers))
    useEffect(() => {
        const last = location.pathname.split('/').pop() // console.log(last);
        const page = routers[findIndexPageByLocationPop(location.pathname, routers)] // console.log(key, value);
        const { key, value } = page

        if (key !== router?.key) {
            setRouter(page)
        }
    }, [location.pathname])

    const handleChangePage = (event, newValue) => {
        const page =  findPageByDefault(newValue, routers, routers[0]) // routers[newValue] ? routers[newValue] : routers[0]// 
        const { base, value, key } = page
        if (page?.key !== router?.key) {
            setRouter(page)
        }
        navigate(base + value);

    };

    return (
        <>
            <Tabs
                orientation={!matchDownSM ? "vertical" : "horizontal"}
                value={router?.key ? router?.key : 0}
                onChange={handleChangePage}
                variant="scrollable"
                allowScrollButtonsMobile
                scrollButtons
            >
                {routers?.filter(item => item?.visible !== undefined ? item.visible : true).map((router, index) => {
                    return (
                        <TabStyled
                            key={index}
                            icon={router?.icon}
                            iconPosition="start"
                            label={router?.label}
                        />
                    )
                })}
            </Tabs>
        </>
    )
}

export default PageNav
