import { ArrowBackIcon } from 'assets/font-icons/icons'
import React from 'react'
import { Link } from 'react-router-dom'

// styled
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';


const BackPanelLink = ({
    url = false,
    label = 'Indietro',
    ...other
}) => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const styleSM = matchDownSM ? {
        background: 'white',
        borderRadius: '50%',
        padding: '0.3rem',
        boxShadow: '0px 0px 7px 0px #858585',
    } : {}

    return (
        <div style={{
            position: "absolute",
            bottom: '1rem',
            left: '1rem',
            zIndex: 9,
            ...styleSM
            // cursor: 'pointer',
        }}>
            <Link
                to={url}
                style={{
                    color: '#1890ff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'end',
                    gap: '.5rem',
                    fontWeight: 800,
                }} >
                <ArrowBackIcon />
                {!matchDownSM && label}
            </Link>
        </div>
    )
}

export default BackPanelLink