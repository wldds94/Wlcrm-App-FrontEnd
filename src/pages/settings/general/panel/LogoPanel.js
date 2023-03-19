import React, { useState } from 'react'

// material-ui
import {
    AccordionDetails,
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Stack,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
// styled
import { styled } from '@mui/material/styles';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import LogoForm from '../components/LogoForm';

// assets
import { CloseIcon, EditIcon } from 'assets/font-icons/icons';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `none`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

const LogoAvatar = styled(Avatar)(({ theme }) => ({
    width: 75,
    height: 75,
    // border: `2px solid ${theme.palette.background.paper}`,
}));

const LogoPanel = ({
    logoURL = null,
}) => {
    // console.log(logoURL);
    // const [currentLogo, setCurrentLogo] = useState(null)
    // useEffect(() => {
    //     async function getLogo(url, name = false) {
    //         const logoFile = await createFileFromUrl(url, name)
    //         if (!isDeepEqual(logoFile, currentLogo)) {
    //             setCurrentLogo(logoFile)
    //         }
    //     }
    //     if (logoURL !== null) {
    //         getLogo(logoURL)
    //     }
    // }, [logoURL])

    const [isEditabled, setIsEditabled] = useState(false)

    return (
        <Stack spacing={2} sx={{ p: 2}} >
            <SimpleHeaderDivider title="Logo" />
            <Box sx={{
                paddingBottom: '1rem'
            }}>
                <Accordion expanded={true} >
                    {/* {isEditabled && <AccordionSummary
                        expandIcon={<></>}
                        aria-controls="edit-logo-content"
                        id="edit-logo-header"
                        sx={{ cursor: 'initial' }}
                    >
                        <Typography variant="h6b" >Modifica Logo</Typography>
                    </AccordionSummary>} */}
                    <AccordionDetails>
                        {isEditabled
                            ? <div>
                                <Stack alignItems="end" >
                                    <IconButton onClick={() => setIsEditabled(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                                {/* <SimpleHeaderDivider
                                    title={"Modifica"}
                                    actions={ }
                                /> */}
                                <LogoForm /* formData={{ logo: [currentLogo], }} */ />
                            </div>
                            : <>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <Button variant="contained"
                                            onClick={() => { setIsEditabled(true) }}
                                            sx={{
                                                p: .5,
                                                borderRadius: "50%",
                                                minWidth: 'unset',
                                                boxShadow: '0 0 5px 2px #c5c5c5',
                                            }}>
                                            <EditIcon sx={{ fontSize: '1rem', }} />
                                        </Button>
                                    }
                                >
                                    <LogoAvatar alt="Logo" src={logoURL} />
                                </Badge>
                            </>}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Stack>
    )
}

export default LogoPanel