import React, { useEffect, useState } from 'react'

// react-router-dom
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    IconButton,
    ListItemIcon,
    MenuItem,
    Typography,
    TextField,
    Stack
} from '@mui/material';

// project import
import PrintableWrapper from './PrintableWrapper';

// assets
import { IoMdPrint } from 'react-icons/io'

const PrintableButton = ({
    // item = null,
    // client = null,
    PrintContent = () => (<></>),
    onPrint = () => { return },
    fontSize = false,
    icon = false,
    ...other
}) => {
    const [haveToPrint, setHaveToPrint] = useState(false)

    const handleClose = () => {
        console.log('Closing Print');
        setHaveToPrint(false)
    }

    const handlePrint = () => {
        setHaveToPrint(true)
        onPrint()
    }

    return (
        <>
            <IconButton
                onClick={() => handlePrint()}
                sx={{ fontSize: fontSize ? fontSize : '1.3rem !important', }}
            >
                {icon !== false ? icon : <IoMdPrint />}
            </IconButton>

            {haveToPrint
                ? <PrintableWrapper
                    PrintContent={PrintContent}
                    printComponent={haveToPrint}
                    onClose={() => handleClose()}
                />
                : ""}
            {/* {haveToPrint ? <PrinterWrapper
                data={item}
                printComponent={haveToPrint}
                onClose={() => handleClose()}
                onClickBackLoader={""}
            /> : ""} */}
        </>
    )
}

export default PrintableButton