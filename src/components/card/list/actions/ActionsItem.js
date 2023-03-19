import React from 'react'

// react router dom
import { Link } from 'react-router-dom'

// material ui
import { IconButton } from '@mui/material'

const ActionsItem = ({
    icon = null,
    withLink = false,
    color = null,
    // linkTo = '',
    onClick = () => { return },
    fontSize = false,
    ...other
}) => {

    const Wrapper = ({ children }) => {
        return (
            <>
                {withLink !== false
                    ? <Link to={withLink}>{children}</Link>
                    : <>{children}</>}
            </>
        )
    }
    return (
        <>
            <Wrapper>
                <IconButton
                    onClick={() => { return withLink !== false ? false : onClick() }}
                    sx={{ fontSize: fontSize ? fontSize : '1.4rem', }}
                    color={color ? color : "secondary"}
                >
                    {icon && icon}
                </IconButton>
            </Wrapper>
        </>

    )
}

export default ActionsItem