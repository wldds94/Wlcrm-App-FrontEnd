import React from 'react'

// react-router-dom
import { Link } from "react-router-dom";

// assets
import { ImPrinter } from "react-icons/im";
import { FaArrowLeft } from "react-icons/fa";
import { IconButton } from '../../../node_modules/@mui/material/index';

const PrintLoader = ({
    onClickBackLoader = () => { return },
}) => {
    return (
        <div id="wlcrm-print-loader" className="background">
            <div className='loader-info'>
                <div className='icon container'>
                    <ImPrinter style={{ fontSize: '2rem', color: '#979797b3',/* color: 'rgba(151, 151, 151, .5)' */ }} />
                </div>
                <div className="dots container">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className='loader-back'>
                <IconButton onClick={() => onClickBackLoader()} >
                    <FaArrowLeft style={{fontSize: '2rem',}} />
                </IconButton>
            </div>
        </div >
    )
}

export default PrintLoader