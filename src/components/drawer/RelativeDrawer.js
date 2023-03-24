import React, { useEffect } from 'react'

// material-ui
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useTheme, styled } from '@mui/material/styles';
import { ListItemIcon, IconButton, Divider, ListItem, ListItemText, Drawer, Box, Stack, Grid } from '@mui/material'

// assets
import CloseIcon from '@mui/icons-material/Close';

const RelativeDrawer = ({ open, handleDrawerClose, children, position = "left", ...others }) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = React.useState(open)

    useEffect(() => { // console.log(open, isOpen);
        if (open !== isOpen) { // console.log(open, isOpen);
            setIsOpen(!isOpen);
        }
    }, [open])

    const handleClose = () => {
        if (isOpen) {
            // setIsOpen(false)
            handleDrawerClose()
        }

    }

    return (
        <>
            {/* <React.Fragment> */}
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClose}
            >
                {/** CONTENT **/}
                <Box
                    sx={{
                        position: "absolute",
                        height: "100%",
                        zIndex: 9, // 2000, // 9,
                        flexShrink: 0,
                        top: 0,
                        background: "#fff",
                        maxWidth: others?.maxWidth ? others?.maxWidth : 600,
                        transition: "all 320ms ease-in",
                        // transition: "border-width 320ms ease-in",
                        borderColor: "#f4f4f4", // "#7f7f7f",
                        // borderStyle: "solid",
                        // borderWidth: "1px",
                        // borderTop: "none",
                        // borderBottom: "none",
                        // borderRadius: "25px"
                        boxShadow: theme.customShadows.z1,
                    }}
                    style={{
                        // minWidth: isOpen ? 250 : 0,
                        left: position === "left" ? 0 : "auto",
                        right: position === "left" ? "auto" : 0,
                        width: isOpen ? '100%' : 0, // "20%" : 0,
                        // overflowX: isOpen ? 'auto' : 'hidden',
                        overflow: isOpen ? 'auto' : 'hidden',
                        // boxShadow: isOpen ? (position === "left" ? "6px 0px 12px 0px rgba(0,0,0,0.9)" : "-8px 1px 12px -6px rgba(0,0,0,0.9)") : 'none',
                        // borderRight: isOpen ? (position === "left" ? '1px solid' : "0") : "0", // isOpen ? (position === "left" ? '1px solid' : "0") : "0",
                        // borderLeft: isOpen ? (position === "left" ? '0' : "1px solid") : "0", // isOpen ? (position === "left" ? '0' : "1px solid #7f7f7f") : "0", // position === "left" ? '0' : "1px solid",
                        // borderWidth: "1px",
                        // boxShadow: position === "left" ? "8px 1px 6px -7px rgba(127,127,127,0.9)" : "-8px 1px 6px -7px rgba(127,127,127,0.9)",
                    }}
                    onMouseDown={(event) => {
                        event.nativeEvent.stopImmediatePropagation()
                        event.stopPropagation()
                    }}
                // onClick={(event) => event.stopPropagation()}
                >
                    <Stack sx={{ padding: '5px 8px 0 8px' }} >
                        <Stack alignItems="end" sx={{ mb: .5, }}>
                            <IconButton size='small' onClick={handleClose}>
                                <CloseIcon size='small' />
                            </IconButton>
                        </Stack>
                        <Divider />
                    </Stack>

                    {<Box sx={{ mt: 1 }}>
                        {others?.persistent ? (
                            children
                        ) : (
                            isOpen ? children : ""
                        )}
                    </Box>}
                    {/* </Box> */}
                </Box>
            </ClickAwayListener>
            {/** OVERLAY  **/}
            {<Box
                sx={{
                    position: "absolute",
                    height: "100%",
                    zIndex: 7, // 2000, // 9,
                    flexShrink: 0,
                    top: 0,
                    background: "rgba(44,44,44,.6)", // "rgba(244,244,244,.6)",
                    opacity: 0,
                    transition: "opacity 420ms ease-in",
                }}
                style={{
                    opacity: 1,
                    width: isOpen ? '100%' : 0, // "20%" : 0,
                    overflowX: isOpen ? 'auto' : 'hidden',
                }}
                onClick={handleClose/* () => handleClose() */}
            ></Box>}
            {/* </React.Fragment> */}
        </>
    )
}

export default RelativeDrawer
