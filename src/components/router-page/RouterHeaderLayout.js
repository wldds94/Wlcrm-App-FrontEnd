import React, { useEffect, useMemo, useState } from 'react'
// material ui
import { Box, Stack, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material';
// styled
import { useTheme } from '@mui/material/styles';

// project import
import { TabHeaderContainer } from 'components/tab-panel/TabPanel';
import ContextMenu from 'components/context-menu/ContextMenu';
import { BackgroundLetterAvatars, CustomAvatar } from 'components/avatar/CustomAvatar';
import PulsingDot from 'components/@extended/pulsing-dot/PulsingDot';

const RouterHeaderLayout = ({
    data = {},
    items = [],
}) => {
    // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    // console.log(data);
    const defaultData = {
        srcAvatar: null,
        text: null,
        AvatarIcon: null,
        info: [],
        status: false,
    }

    const defaultInfoItem = [{
        variant: "h6b",
        style: { fontSize: "0.775rem", },
        value: null,
    }, {
        variant: "body2",
        style: { color: 'text.secondary', },
        value: null,
    }]

    const [currentData, setCurrentData] = useState({
        ...defaultData,
        ...data,
    })
    // const currentData = {
    //     ...defaultData,
    //     ...data,
    // }
    useEffect(() => {
        // console.log(data);
        // if (data?.srcAvatar && data?.srcAvatar !== currentData.srcAvatar) {
        //     setCurrentData({
        //         ...currentData,
        //         srcAvatar: data.srcAvatar
        //     })
        // }

        if ((data?.text && data?.text !== currentData.text)
            || (data?.srcAvatar && data?.srcAvatar !== currentData.srcAvatar)
            || (data?.info && JSON.stringify(data?.info) !== JSON.stringify(currentData.info))) {
            setCurrentData({
                ...currentData,
                ...data
            })
        }
    }, [data])

    const Avatar = useMemo(() => {
        return (
            <>{currentData.AvatarIcon !== null
                ? <BackgroundLetterAvatars
                    AvatarIcon={currentData.AvatarIcon}
                    withChildren={false}
                    name={currentData.text}
                    avSx={{ width: 40, height: 40/* , fontSize: '.8rem' */ }}
                />
                : <CustomAvatar
                    srcAvatar={currentData.srcAvatar}
                    text={currentData.text}
                // AvatarIcon={defaultData.AvatarIcon}
                // withChildren={!Boolean(defaultData?.AvatarIcon !== null)}
                />}</>
        )
    }, [currentData])

    return (
        <TabHeaderContainer>
            <Box sx={{ width: "100%", alignSelf: 'center', }} >
                <Stack direction="row" spacing={1} sx={{ width: "100%", }} >

                    {Avatar}
                    {!matchDownSM && <Stack direction="row" spacing={1} sx={{ width: "100%", }} >
                        <Stack sx={{ alignSelf: "center", textAlign: "left" }}>
                            {currentData?.info?.map((item, index) => {
                                const current = defaultInfoItem[index] ? defaultInfoItem[index] : defaultInfoItem[1]
                                const defaultItem = {
                                    ...current,
                                    ...item
                                }

                                const Content = () => {
                                    return (
                                        <>
                                            {defaultItem?.value
                                                ? <>
                                                    {index === 0 ? <>
                                                        <Stack direction="row">
                                                            <Typography key={index} variant={defaultItem?.variant} sx={{ ...defaultItem?.style, ...defaultItem?.sx }} >
                                                                {defaultItem?.value}
                                                            </Typography>
                                                            {(currentData?.status !== false) && <PulsingDot status={currentData.status} />}
                                                        </Stack>
                                                    </> : <>
                                                        <Typography key={index} variant={defaultItem?.variant} sx={{ ...defaultItem?.style, ...defaultItem?.sx }} >
                                                            {defaultItem?.value}
                                                        </Typography>
                                                    </>
                                                    }

                                                </>
                                                : <></>}
                                        </>
                                    )
                                }

                                return (
                                    <Content key={index} />
                                )

                            })}
                            {/* <Typography variant="h6b" sx={{ fontSize: "0.775rem" }} >{doctor_option?.company_name}</Typography> */}
                            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} >{doctor_option?.first_name + " " + doctor_option?.last_name}</Typography> */}
                        </Stack>

                        {/* {currentData?.status !== false && <PulsingDot status={currentData.status} />} */}
                    </Stack>}
                </Stack>

            </Box>
            {Boolean(items.length) && <Box>
                {/* <AccountMenu callbackEditLink={setOpenAccountInfoDialog} /> */}
                {/* MENU */}
                <ContextMenu
                    items={items}
                />
            </Box>}
        </TabHeaderContainer>
    )
}

export default RouterHeaderLayout