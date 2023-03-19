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
import EditableButton from 'components/button/EditableButton';
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import CompanyForm from './components/CompanyForm';

// utils
import useCompany from 'hooks/redux/useCompany';

const TypographyStyled = styled(Typography)(({ theme }) => ({
    minHeight: "22px",
}));

const CompanyProfilePage = () => {
    const company = useCompany() // useSelector(getOptions)

    const [isEditable, setIsEditable] = useState(false)


    return (
        <>
            <Stack>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <EditableButton
                        editable={isEditable}
                        onClick={(val) => setIsEditable(val)}
                    />
                </div>
                <SimpleHeaderDivider title={isEditable ? "Modifica Informazioni" : "Informazioni Personali"} />

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
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Nome</Typography>
                                <TypographyStyled variant="h6b" >{company?.doctor_option?.first_name ? company?.doctor_option?.first_name : ""} {company?.doctor_option?.last_name}</TypographyStyled>
                            </Stack>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Codice Fiscale</Typography>
                                <TypographyStyled variant="h6b" >{company?.doctor_option?.cod_fisc}</TypographyStyled>
                            </Stack>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Partita IVA</Typography>
                                <TypographyStyled variant="h6b" >{company?.doctor_option?.piva}</TypographyStyled>
                            </Stack>
                            {/** TELEFONO */}
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Telefono</Typography>
                                <TypographyStyled variant="h6b" >{company?.doctor_option?.telephone}</TypographyStyled>
                            </Stack>
                            {/** EMAIL */}
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Email</Typography>
                                <TypographyStyled variant="h6b" >{company?.doctor_option?.email}</TypographyStyled>
                            </Stack>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >PEC</Typography>
                                <TypographyStyled variant="h6b" >{company?.doctor_option?.pec}</TypographyStyled>
                            </Stack>
                            {/** ADDRESS */}
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Indirizzo</Typography>
                                <TypographyStyled variant="h6b" >{company?.doctor_option !== null && company?.doctor_option?.fullAddress/* getUserFullAddress(company?.doctor_option) */ /*  && accFullAddress */}</TypographyStyled>
                            </Stack>
                        </>
                        : (company && <CompanyForm
                            doctorInfo={company}
                        />)}
                </Box>

            </Stack>

        </>
    )
}

export default CompanyProfilePage