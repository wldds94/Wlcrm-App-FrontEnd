import React from 'react'

// material-ui
import {
    AccordionSummary,
    AccordionDetails,
    Box,
    Stack,
    Typography
} from '@mui/material';
// import { Divider } from '../../../../node_modules/@mui/material/index';
import MuiAccordion from '@mui/material/Accordion';
// styled
import { styled } from '@mui/material/styles';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import SendResetPasswordForm from './SendResetPasswordForm';
import UpdatePasswordForm from './UpdatePasswordForm';

// assets
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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

const AccountSecurityPanel = () => {
    const [resetAccordion, setResetAccordion] = React.useState(false)

    const [editAccordion, setEditAccordion] = React.useState(false)

    return (
        <Stack spacing={2} >
            <SimpleHeaderDivider title="PASSWORD" />
            <Box sx={{
                borderBottom: '1px solid #f0f0f0',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            }}>
                <Accordion TransitionProps={{ unmountOnExit: true }} expanded={resetAccordion} onChange={() => setResetAccordion(!resetAccordion)} >
                    <AccordionSummary
                        expandIcon={!resetAccordion ? <ArrowForwardIosIcon sx={{ fontSize: '0.9rem' }} /> : <CloseIcon sx={{ fontSize: '1.1rem' }} />}
                        aria-controls="reset-password-content"
                        id="reset-password-header"
                    >
                        <Typography variant="h6b" >Reset Password</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SendResetPasswordForm />
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box sx={{
                // borderBottom: '1px solid #f0f0f0',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            }}>
                <Accordion TransitionProps={{ unmountOnExit: true }} expanded={editAccordion} onChange={() => setEditAccordion(!editAccordion)} >
                    <AccordionSummary
                        expandIcon={!editAccordion ? <ArrowForwardIosIcon sx={{ fontSize: '0.9rem' }} /> : <CloseIcon sx={{ fontSize: '1.1rem' }} />}
                        aria-controls="edit-password-content"
                        id="edit-password-header"
                    >
                        <Typography variant="h6b" >Modifica Password</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdatePasswordForm />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Stack>
    )
}

export default AccountSecurityPanel