import React from 'react'

// react router dom
import { Link } from "react-router-dom";

// material ui
import { Box, Stack, Typography } from '@mui/material'

// project import
import AccordionCard from 'components/card/list/AccordionCard'

// icons
import { RigthArrowIos } from 'assets/font-icons/icons'


const LinkCard = ({
    item = {},
    ...other
}) => {

    const ContentDetails = () => {
        return (
            <Box sx={{ position: 'relative', }}>
                <Box sx={{
                    p: 1.5,
                    width: '100%',
                    // minWidth: '150px',
                    // maxWidth: '50%',
                    height: '80px',
                    '& .link-arrow': {
                        display: 'flex',
                        transition: 'all ease-in 220ms'
                    },
                    '&:hover .link-arrow': {
                        ml: .5,
                    }
                }}>
                    <Stack direction="row" alignItems="center" gap={1} >
                        <Stack >
                            <Typography variant="h6b" color="secondary">
                                {item?.label}
                            </Typography>
                        </Stack>

                        <div className="link-arrow" >
                            <RigthArrowIos style={{
                                fontSize: '1rem',
                                color: "#8c8c8c"
                            }} />
                        </div>
                    </Stack>

                </Box>
                <Stack sx={{
                    position: 'absolute',
                    // width: '100%',
                    // height: '100%',
                    // background: 'red',
                    right: '2px',
                    bottom: '2px',
                }}>
                    <item.icon style={{ fontSize: '2rem', color: "#bdbdbd" }} />
                </Stack>
            </Box>
        )
    }

    return (
        <Link to={item?.to} style={{ textDecoration: 'none'}}>
            <AccordionCard
                fullWidth={true}
                item={item}
                ContentDetails={() => <ContentDetails />}
            />
        </Link>
    )
}

export default LinkCard