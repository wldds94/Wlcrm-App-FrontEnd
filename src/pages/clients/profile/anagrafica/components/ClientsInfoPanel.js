import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    Grid,
    Stack,
    Typography
} from '@mui/material';
// styled
import { styled } from '@mui/material/styles';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import convertDate from 'utils/date';
import { getDateFormat } from 'utils/libs/dayjsUtils';
import { getUserFullAddress } from 'utils/app/user';


const TypographyStyled = styled(Typography)(({ theme }) => ({
    minHeight: "22px",
}));

const ClientsInfoPanel = ({
    client = {},
}) => {
    return (
        <>
            <Box sx={{ pt: 2}}>
                <SimpleHeaderDivider title={"Informazioni Personali"} />
                <Box
                    sx={{
                        // p: 2,
                        '& > *': {
                            p: 2,
                        }
                    }}
                >
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Nome</Typography>
                                <TypographyStyled variant="h6b" >{client?.first_name && (client?.first_name + " " + client?.last_name)}</TypographyStyled>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Codice Fiscale</Typography>
                                <TypographyStyled variant="h6b" >{client?.piva}</TypographyStyled>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            {/** DATA NASCITA */}
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Data di Nascita</Typography>
                                <TypographyStyled variant="h6b" >{client?.birth_date && getDateFormat(client?.birth_date, 0, 'DD-MM-YYYY')}</TypographyStyled>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >SESSO</Typography>
                                <TypographyStyled variant="h6b" >{client?.sex}</TypographyStyled>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <SimpleHeaderDivider title={"Contatti"} />
                <Box
                    sx={{
                        // p: 2,
                        '& > *': {
                            p: 2,
                        }
                    }}
                >
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Telefono</Typography>
                                <TypographyStyled variant="h6b" >{client?.telephone}</TypographyStyled>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >Email</Typography>
                                <TypographyStyled variant="h6b" >{client?.email}</TypographyStyled>
                            </Stack>
                        </Grid>
                        {client?.pec && <Grid item xs={6}>
                            <Stack>
                                <Typography variant="h6" color="#a1a2a9" >PEC</Typography>
                                <TypographyStyled variant="h6b" >{client?.pec}</TypographyStyled>
                            </Stack>
                        </Grid>}
                    </Grid>

                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <SimpleHeaderDivider title={"Residenza"} />
                <Box
                    sx={{
                        // p: 2,
                        '& > *': {
                            p: 2,
                        }
                    }}
                >
                    <Stack>
                        <Typography variant="h6" color="#a1a2a9" >Indirizzo</Typography>
                        <TypographyStyled variant="h6b" >{getUserFullAddress(client)}</TypographyStyled>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default ClientsInfoPanel