import React from 'react'

// material-ui
import { Box, Fade, IconButton } from '@mui/material';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider';
import SupportForm from './SupportForm';

// react redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { getOpenSupport, openSupport } from 'store/reducers/menu';

// icons
import { CloseIcon } from 'assets/font-icons/icons';

const SupportWrapper = () => {
    const dispatch = useDispatch()

    // console.log('SupportWrapper');
    const isOpen = useSelector(getOpenSupport)
    // const {isOpen} = useSelector(state => state.menu)

    const handleClose = () => {
        dispatch(openSupport({ supportOpen: false }))
    }

    const actions = <>
        <IconButton size="small" onClick={() => handleClose()} >
            <CloseIcon /* size="small" */ />
        </IconButton>
    </>

    return (
        <>
            {/* {isOpen &&  */}
            <Fade in={isOpen}>
                <div style={{
                    position: 'fixed',
                    zIndex: 9,
                    right: '0',
                    bottom: '2rem',
                    borderRadius: '4px 0 0 4px',
                    boxShadow: '0px 0px 10px 1px grey',
                    background: '#fdfdff',
                    width: '320px',
                    maxHeight: '450px',
                    overflow: 'auto',
                }}>
                    <Box
                        sx={{
                            p: 1.5,
                            position: 'relative',
                            overflow: 'hidden',
                            // height: '100%',
                            width: '100%',
                            '&:after': {
                                content: `""`,
                                display: 'block',
                                position: 'absolute',
                                width: 0,
                                height: 0,
                                right: '-3px',
                                bottom: '-10px',
                                borderLeft: '10px solid transparent',
                                borderRight: '2px solid transparent',
                                borderTop: '10px solid #fdfdff',
                            },
                        }}
                    >
                        <SimpleHeaderDivider title='Assistenza' actions={actions} />
                        <Box sx={{ mt: 3, }}>
                            <SupportForm />
                        </Box>
                        {/* <Box
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            '&:after': {
                                content: `""`,
                                display: 'block',
                                position: 'absolute',
                                width: 0,
                                height: 0,
                                right: '-3px',
                                bottom: '-10px',
                                borderLeft: '10px solid transparent',
                                borderRight: '2px solid transparent',
                                borderTop: '10px solid white',
                                // boxShadow: '0px 0px 6px 0px',
                            },
                        }}
                    ></Box> */}
                    </Box>
                </div>
            </Fade>
            {/* } */}
        </>
    )
}

export default SupportWrapper