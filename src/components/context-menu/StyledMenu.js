import React from 'react'
// material ui
import { Box, ClickAwayListener, Grid, Stack, IconButton, Typography, Menu, MenuItem, Paper, Popper } from '@mui/material'
// styled
import { styled, alpha, useTheme } from '@mui/material/styles';

export const StyledMenu = styled(React.forwardRef((props, ref) => (
    // React.forwardRef((props, ref) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
        ref={ref}
    /> // ))
)))(({ theme }) => ({
    '& .MuiPaper-root': {
        elevation: 0,
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        // '& .MuiMenu-list': {
        //     padding: '4px 0',
        // },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root, & svg': {
                fontSize: 18,
                // color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));