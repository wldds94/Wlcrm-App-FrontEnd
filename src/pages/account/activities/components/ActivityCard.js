import AccordionCard from 'components/card/list/AccordionCard'
import React, { useEffect, useState } from 'react'

// mui material
import { Box, Stack, Typography } from '@mui/material'

// react redux
import { useDispatch } from 'react-redux'

// project import
import AnimateButton from 'components/@extended/AnimateButton'

// utils
import { isDeepEqual } from 'utils/equal'

// assets
import ClientImage from "assets/images/userAgents/client.png"
import ChromeImage from "assets/images/userAgents/chrome.png"
import FirefoxImage from "assets/images/userAgents/firefox.png"
import SafariImage from "assets/images/userAgents/safari.png"
import EdgeImage from "assets/images/userAgents/microsoft.png"
import OperaImage from "assets/images/userAgents/opera.png"

// icons
import { AiOutlineLogout } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'

// utils
import { getDateFormat } from 'utils/libs/dayjsUtils'
import ActionsCard from 'components/card/list/actions/ActionsCard'
import RevokeForm from './RevokeForm'

const ImagesClient = [
    {
        label: 'Google Chrome',
        img: ChromeImage,
    },
    {
        label: 'Mozilla Firefox',
        img: FirefoxImage,
    },
    {
        label: 'Microsoft Edge',
        img: EdgeImage,
    },
    {
        label: 'Opera',
        img: OperaImage,
    },
    {
        label: 'Safari',
        img: SafariImage,
    },
]

const getImageClient = (label) => {
    const finded = ImagesClient?.find(item => item?.label === label)
    return finded ? finded?.img : ClientImage
}

const ActivityCard = ({
    item = null,
    ...other
}) => {
    // console.log(item);
    const dispatch = useDispatch()

    // console.log(JSON.parse(item));
    const [currentItem, setCurrentItem] = useState(null)
    useEffect(() => {
        // if (!isDeepEqual(JSON.parse(item), currentItem)) {
        //     setCurrentItem(JSON.parse(item))
        // }
        if (!isDeepEqual(item, currentItem)) {
            setCurrentItem(item)
        }
    }, [item])

    const actionsItems = [
        {
            icon: <AiOutlineLogout /* color="#1890ff" */ />,
            // onClick: () => handleActive(),
            withLink: "/clients/profile/view",
        },
    ]

    const ContentDetails = () => {
        return (
            <>
                <Stack direction="row" gap={4} sx={{ p: '2rem 1rem', opacity: currentItem?.isValid ? 1 : .6 }} >
                    <Stack sx={{ /* alignSelf: 'center' */ }}>
                        <Box sx={{
                            position: 'relative',
                            'img': {
                                display: 'block',
                                maxWidth: '50px'
                            }
                        }}>
                            <img src={getImageClient(currentItem?.userAgent)} />
                            {!Boolean(currentItem?.isValid) && <Box sx={{
                                position: 'absolute',
                                right: '-16px',
                                top: '50%',
                            }}>
                                <MdClose size={40} />
                            </Box>}
                        </Box>
                    </Stack>
                    <Stack >
                        <Typography color="text.secondary" >
                            {getDateFormat(currentItem?.data, 0, 'DD MMM YYYY - HH:mm', true)}
                        </Typography>
                        <Typography variant="h6b">{currentItem?.userAgent}</Typography>
                        <Typography variant="body2" color="text.secondary">{currentItem?.clientIp}</Typography>
                        <Box sx={{ pt: 2, }} >
                            <RevokeForm
                                formData={{
                                    jwt: currentItem?.jwt
                                }}
                                disabled={!Boolean(currentItem?.isValid)}
                            />
                        </Box>
                    </Stack>
                </Stack>

                {/* <ActionsCard
                    items={actionsItems}
                /> */}
            </>
        )
    }

    return (
        <AccordionCard
            fullWidth={true}
            item={currentItem}
            // ContentSummary={() => <ContentSummary />}
            ContentDetails={() => <ContentDetails />}
        />
    )
}

export default ActivityCard