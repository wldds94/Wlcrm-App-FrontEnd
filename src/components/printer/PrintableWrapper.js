import React, { useEffect, useRef, useState } from 'react'

// material-ui
import {
    Dialog,
    Slide,
} from '@mui/material';

// project import
import PrintLoader from './PrintLoader';

const PrintableWrapper = ({
    printComponent = false,
    data = null,
    onClose = () => { return },
    PrintContent = () => (<></>),
    delay = 500,
    ...other
}) => {
    const timerRef = useRef(null);

    const [isPrinting, setIsPrinting] = useState(printComponent)

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            console.log('Active Timeout');
            window.print()
        }, delay);

        return () => {
            console.log('Cleaning Timeout');
            clearTimeout(timerRef.current);
        };
    }, [])

    const handleClose = () => {
        setIsPrinting(false);
        onClose()
    }

    return (
        <Dialog
            fullScreen
            open={isPrinting} // {isPrinting}
            // onClose={() => setOpenPreviewInvoice(false)}
            // TransitionComponent={Transition}
        >
            {timerRef.current === null &&
                <PrintLoader onClickBackLoader={() => handleClose()} />}
            {/* <button onClick={() => window.print()}>
                Print!
            </button>
            <button onClick={() => setIsPrinting(false)}>
                Close!
            </button> */}
            <div style={{ height: '100%', }}>
                {<PrintContent />}

            </div>
            
        </Dialog>
    )
}

export default PrintableWrapper