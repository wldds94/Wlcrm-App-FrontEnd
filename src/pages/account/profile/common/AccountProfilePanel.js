import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    Stack,
    Typography
} from '@mui/material';
// styled
import { styled } from '@mui/material/styles';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import AccountInfoForm from '../components/AccountInfoForm';
import EditableButton from 'components/button/EditableButton';

// utils
import convertDate from 'utils/date';


const TypographyStyled = styled(Typography)(({ theme }) => ({
    minHeight: "22px",
}));

const AccountProfilePanel = ({ account, ...others }) => {
    // const dispatch = useDispatch()

    const [currentAccount, setCurrentAccount] = useState(account)
    useEffect(() => {
        // console.log('Account Effect');
        if (JSON.stringify(account) !== JSON.stringify(currentAccount)) {
            // if (Number(account?.ID) !== Number(currentAccount?.ID)) {
            // console.log('Account Effect: UPDATE');

            setCurrentAccount(account)
        }
    }, [account/* dispatch */])

    const [isEditable, setIsEditable] = useState(false)

    const firstName = currentAccount?.meta?.first_name ? currentAccount?.meta?.first_name : ""
    const lastName = currentAccount?.meta?.last_name ? currentAccount?.meta?.last_name : ""
    return (
        <Stack>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <EditableButton
                    editable={isEditable}
                    onClick={(val) => setIsEditable(val)}
                />
            </div>
            <SimpleHeaderDivider title={isEditable ? "Modifica Account" : "Il tuo Account"} />

            <Box
                sx={{
                    // p: 2,
                    '& > *': {
                        p: 2,
                    }
                }}
            >
                {!isEditable
                    ? <>
                        {/** EMAIL */}
                        <Stack>
                            <Typography variant="h6" color="#a1a2a9" >Email</Typography>
                            <TypographyStyled variant="h6b" >{currentAccount?.user_email && (currentAccount?.user_email)}</TypographyStyled>
                        </Stack>
                        {/** NOME */}
                        <Stack>
                            <Typography variant="h6" color="#a1a2a9" >Nome</Typography>
                            <TypographyStyled variant="h6b" >{firstName + " " + lastName}</TypographyStyled>
                        </Stack>
                        {/** TELEFONO */}
                        <Stack>
                            <Typography variant="h6" color="#a1a2a9" >Telefono</Typography>
                            <TypographyStyled variant="h6b" >{currentAccount?.meta?.telephone ? (currentAccount?.meta?.telephone) : " "}</TypographyStyled>
                        </Stack>
                        {/** DATA NASCITA */}
                        <Stack>
                            <Typography variant="h6" color="#a1a2a9" >Data di Nascita</Typography>
                            <TypographyStyled variant="h6b" >{currentAccount?.meta && (currentAccount?.meta?.birth_date ? convertDate(currentAccount?.meta?.birth_date) : "")}</TypographyStyled>
                        </Stack>
                        {/** GENERE */}
                        <Stack>
                            <Typography variant="h6" color="#a1a2a9" >Genere</Typography>
                            <TypographyStyled variant="h6b" >{currentAccount?.meta && (currentAccount?.meta?.sex)}</TypographyStyled>
                        </Stack>
                        {/** ADDRESS */}
                        <Stack>
                            <Typography variant="h6" color="#a1a2a9" >Indirizzo</Typography>
                            <TypographyStyled variant="h6b" >{currentAccount !== null && currentAccount?.fullAddress /* getUserFullAddress(currentAccount?.meta) */}</TypographyStyled>
                        </Stack>
                    </>
                    : <AccountInfoForm account={currentAccount} />}
            </Box>

        </Stack>
    )
}

export default AccountProfilePanel