import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    Stack,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
// styled
import { useTheme, styled } from '@mui/material/styles';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `none`,
    '.MuiAccordionSummary-root': {
        gap: '1.5rem',
    },
    '.MuiAccordionSummary-content': {
        flexDirection: 'column',
        gap: '.5rem',
        // marginBottom: 0,
        margin: 0,
    },
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionCard = ({
    item = {
        id: 0,
    },
    // display
    fullWidth = false,
    bottomBorder = true,
    boxShadow = true,
    lightBoxShadow = false,
    withDarkBackground = false,
    withHoverBackground = true,
    ContentSummary = () => { return (<></>) },
    ContentDetails = () => { return (<></>) },
    // separateContent = true,
    OffContent = () => { return (<></>) },
    isSavingChange = false, // true, // false,
    
    ...other
}) => {
    const theme = useTheme();

    const [currentItem, setCurrentItem] = useState(item)
    useEffect(() => {
        if (JSON.stringify(item) !== JSON.stringify(currentItem)) {
            setCurrentItem(item)
        }
    }, [item])

    // const [isOpenCard, setIsOpenCard] = useState(false)

    // const [isSaving, setIsSaving] = useState(isSavingChange)
    // useEffect(() => {
    //     if (isSavingChange !== isSaving) {
    //         setIsSaving(isSavingChange)
    //     }
    // }, [isSavingChange])

    return (
        <>
            <Box /* key={index} */ sx={{
                position: 'relative',
                borderBottom: /* fullWidth ? 'none' :  */bottomBorder && currentItem?.color ? '1px solid ' + currentItem.color : '1px solid #f0f0f0',
                paddingTop: fullWidth ? 0 : '1rem',
                paddingBottom: fullWidth ? 0 : bottomBorder ? 0 : '1rem',
                boxShadow: boxShadow === false ? 'unset' : lightBoxShadow ? '0px 3px 5px -1px #f0f0f0' : '0px 4px 15px -1px #f0f0f0',
                background: withDarkBackground ? '#f9f9f9' : 'unset',
                transition: 'background linear 200ms',
                '&:hover': {
                    background: withHoverBackground ? '#f9f9f9' : 'unset'
                }
            }}>
                <Box sx={{
                    p: fullWidth ? 0 : 2,
                    pb: fullWidth ? 0 : bottomBorder ? 'calc(1rem + 1px)' : 0,
                }}>
                    <Stack >
                        <Box >
                            <ContentSummary />
                        </Box>
                        <Box /* style={{ marginTop: fullWidth ? '1rem' : 0}} */ >
                            <ContentDetails />
                        </Box>
                    </Stack>
                </Box>
                {/* <Accordion TransitionProps={{ unmountOnExit: true }} expanded={isOpenCard} onChange={() => setIsOpenCard(!isOpenCard)} 
                    sx={{ pb: bottomBorder ? 'calc(1rem + 1px)' : 0, }}
                >
                    <AccordionSummary
                        expandIcon={<RigthArrowIos sx={{ fontSize: '0.9rem', transform: !isOpenCard ? 'rotateZ(0)' : 'rotateZ(90deg)' }} />}
                        // expandIcon={!isOpenCard ? <ArrowForwardIosIcon sx={{ fontSize: '0.9rem' }} /> : <CloseIcon sx={{ fontSize: '1.1rem' }} />}
                        aria-controls={"accordion-card-content-" + currentItem?.id}
                        id={"accordion-card-header-" + currentItem?.id}
                    >

                        <ContentSummary />

                    </AccordionSummary>
                    <AccordionDetails>

                        <ContentDetails />

                    </AccordionDetails>
                </Accordion> */}
                {bottomBorder && <div style={{
                    height: '2px',
                    background: currentItem?.color ? currentItem?.color : 'transparent',
                    width: '100%',
                    // boxShadow: '0px 4px 15px -1px #f0f0f0',
                }}></div>}
                {/* {Boolean(isSaving) &&
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255,255,255, .6)', // '#f5f5f5',
                        // opacity: '.4',
                    }}></div>} */}
            </Box>


            <OffContent />
        </>
    )
}

export default AccordionCard