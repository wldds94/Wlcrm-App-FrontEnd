import React, { useEffect, useRef, useState } from 'react';
// material ui
import { Box, ClickAwayListener, Grid, Stack, IconButton, Typography, Menu, MenuItem, Paper, Popper } from '@mui/material'
// import { AppBar, Box, ClickAwayListener, IconButton, Paper, Popper, Toolbar, useMediaQuery } from '@mui/material';

// styled
import { styled, alpha, useTheme } from '@mui/material/styles';

// project import
import Transitions from 'components/@extended/Transitions';
import { StyledMenu } from './StyledMenu';

// assets
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';

// const StyledMenu = styled(React.forwardRef((props, ref) => (
//     // React.forwardRef((props, ref) => (
//     <Menu
//         elevation={0}
//         anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//         }}
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}
//         {...props}
//         ref={ref}
//     /> // ))
// )))(({ theme }) => ({
//     '& .MuiPaper-root': {
//         elevation: 0,
//         filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//         borderRadius: 6,
//         marginTop: theme.spacing(1),
//         minWidth: 180,
//         color:
//             theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//         boxShadow:
//             'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//         // '& .MuiMenu-list': {
//         //     padding: '4px 0',
//         // },
//         '& .MuiMenuItem-root': {
//             '& .MuiSvgIcon-root': {
//                 fontSize: 18,
//                 color: theme.palette.text.secondary,
//                 marginRight: theme.spacing(1.5),
//             },
//             '&:active': {
//                 backgroundColor: alpha(
//                     theme.palette.primary.main,
//                     theme.palette.action.selectedOpacity,
//                 ),
//             },
//         },
//     },
// }));

const ContextMenu = ({
    id,
    items = [],
    SwapIcon = <MoreVertIcon />,
    selectedKey = null,
    ...other
}) => {

    const theme = useTheme();

    const anchorRef = useRef(null);
    // const open = Boolean(anchorEl);
    const [open, setOpen] = useState(false);

    // const getSelected = (items, key) => {
    //     const finded = items?.find(item => String(item?.key) === String(key))
    //     return finded
    // }
    // const [selected, setSelected] = useState(getSelected(items, selectedKey))
    // useEffect(() => {
    //     const finded = getSelected(items, selectedKey)
    //     if (JSON.stringify(finded) !== JSON.stringify(selected)) {
    //         setSelected(finded)
    //     }
    // }, [items, selectedKey])

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <IconButton
                id={id + "-button"} // "account-info-menu-button"
                aria-controls={open ? id : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleToggle}
                ref={anchorRef}
            >
                {SwapIcon}
            </IconButton>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{
                    width: '100%', // matchDownSM ? '100%' : `calc(100% - 4px)` // '100%',
                    // transform: `translate3d(0, 60px, 0px)`,
                }}
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [22, 15], // matchDownSM ? [0, 9] : [22, 15], // [0, 9]
                                // transform: `translate3d(0, 60px, 0px)`,
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper sx={{ boxShadow: theme.customShadows.z1 }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <StyledMenu
                                    id={id}
                                    MenuListProps={{
                                        'aria-labelledby': id + '-button',
                                    }}
                                    anchorEl={anchorRef.current}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {items?.map((item, index) => {
                                        const color = String(selectedKey) === String(item.key) ? 'primary' : 'secondary'
                                        // const Icon = item?.icon ? item.icon : false
                                        return (
                                            <MenuItem key={index} onClick={item?.onClick} sx={{ position: "relative" }} disableRipple>
                                                <Typography color={color} sx={{ display: 'flex', }} >{item?.icon}</Typography>
                                                {/* <Typography color={color} >{item?.label}</Typography> */}{/* <EditIcon /> */}
                                                {<Typography color={color} sx={{ display: 'block', mr: 2, }} >{item?.label}</Typography>}
                                                {/* item?.label */}{/* Modifica Profilo */}
                                                {String(selectedKey) === String(item.key) &&
                                                    (<Stack alignSelf='baseline'>
                                                        <CheckIcon color="primary" />
                                                    </Stack>)}
                                            </MenuItem>

                                        )
                                    })}
                                    {/* <MenuItem onClick={handleEditLink} disableRipple>
                                        <EditIcon />
                                        Modifica Profilo
                                    </MenuItem> */}
                                    {/* <MenuItem onClick={handleClose} disableRipple>
                                            <FileCopyIcon />
                                            Duplicate
                                        </MenuItem>
                                        <Divider sx={{ my: 0.5 }} />
                                        <MenuItem onClick={handleClose} disableRipple>
                                            <ArchiveIcon />
                                            Archive
                                        </MenuItem>
                                        <MenuItem onClick={handleClose} disableRipple>
                                            <MoreHorizIcon />
                                            More
                                        </MenuItem> */}
                                </StyledMenu>

                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    )
}

export default ContextMenu