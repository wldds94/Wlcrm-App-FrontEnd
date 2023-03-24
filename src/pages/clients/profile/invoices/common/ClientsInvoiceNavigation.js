import React, { useEffect, useState } from 'react'

// react-router-dom
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    IconButton,
    Typography,
    Stack
} from '@mui/material';

// assets
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const ClientsInvoiceNavigation = ({
    item = null,
    client = null,
    // index = 0,
    // total = 0,
    itemsList = [],
    basePath = "/clients/profile/",
    servicePath = "/fatture",
    navPath = "", // "/fatture/preview/" --- "/fatture/edit/"
    ...other
}) => {
    const navigate = useNavigate()

    const index = itemsList?.find((el, index) => el?.chiperId === item?.chiperId)
    const [currentIndex, setCurrentIndex] = useState(index >= 0 ? index : 0)
    useEffect(() => {
        const index = itemsList.findIndex(invoice => invoice?.chiperId === item?.chiperId)
        console.log(index);
        if (index !== currentIndex) {
            setCurrentIndex(index)
        }
    }, [itemsList])

    const handleSwitchNav = (next) => {
        if (next >= 0 && next < itemsList.length) {
            navigate(basePath + client?.chiperId + servicePath + itemsList[next]?.chiperId + navPath)
        }
    }

    return (
        <div style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: '40px',
            width: '100%',
            background: 'white',
            zIndex: 3,
            boxShadow: '0px -1px 4px rgba(0, 0, 0, 20%)',
            display: 'flex',
            alignItems: "center",
        }}>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ /* pt: 1.5, pb: 1, */ pl: 3, pr: 3, width: "100%" }} >
                <Box>
                    <Typography variant="h6b" color="secondary" >{currentIndex + 1} / {itemsList.length}</Typography>
                </Box>

                <Stack direction="row" >
                    {/* {(index - 1) >= 0 && <IconButton onClick={() => handleSwitchNav(Number(index - 1))} >
                        <AiOutlineArrowLeft />
                    </IconButton>} */}
                    <IconButton 
                        onClick={() => handleSwitchNav(Number(currentIndex - 1))}
                        sx={{ 
                            opacity: (currentIndex - 1) >= 0 ? "1" : ".4",
                            cursor: (currentIndex - 1) >= 0 ? "pointer" : "default",
                        }}
                    >
                        <AiOutlineArrowLeft />                        
                    </IconButton>

                    <IconButton 
                        onClick={() => handleSwitchNav(Number(currentIndex + 1))}
                        sx={{ 
                            opacity: currentIndex < (itemsList.length - 1) ? "1" : ".4",
                            cursor: currentIndex < (itemsList.length - 1) ? "pointer" : "default",
                        }}
                    >
                        <AiOutlineArrowRight />                        
                    </IconButton>
                </Stack>
            </Stack>
        </div>
    )
}

export default ClientsInvoiceNavigation