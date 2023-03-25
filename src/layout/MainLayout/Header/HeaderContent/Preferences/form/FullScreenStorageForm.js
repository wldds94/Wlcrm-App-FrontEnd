import React, { useEffect } from 'react'

// material ui
import { Box, IconButton, Stack, Switch, Typogrphy } from '@mui/material';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider'

// hooks
import useLocalStorage from 'hooks/session/useLocalStorage';

// icons
import { RiFullscreenFill, RiFullscreenExitLine } from 'react-icons/ri'

// config
// import config from 'config';

const FullScreenStorageForm = () => {
    // const { fullScreenkey, fullScreenValue = false } = config
    const [isFullscreen, setIsFullscreen] = React.useState(false); // useLocalStorage(fullScreenkey, fullScreenValue) // React.useState(false);

    function onFullscreenChange() {
        setIsFullscreen(Boolean(document.fullscreenElement));
    }

    function openFullscreen() {
        var elem = document.body
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    // Watch for fullscreenchange
    React.useEffect(() => {
        document.addEventListener('fullscreenchange', onFullscreenChange);

        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    // useEffect(() => {
    //     if (isFullscreen) {
    //         // We’re going fullscreen
    //         document.exitFullscreen();

    //     } else {
    //         // We’re exiting fullscreen
    //         // document.body.requestFullscreen();
    //         openFullscreen()
    //     }
    // }, [isFullscreen])
    const toggleFullScreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            openFullscreen()
        }
    }

    return (
        <div>
            <SimpleHeaderDivider
                description={"FullScreen"}
            />
            {/* <IconButton onClick={() => { toggleFullScreen() }}>
                T
            </IconButton> */}
                <Box sx={{ p: .5 }} ></Box>
            <Stack direction="row" alignItems="center" gap={2} >
                <Stack>
                    <RiFullscreenExitLine size={20} />
                </Stack>
                <Switch
                    checked={isFullscreen}
                    onChange={toggleFullScreen}
                // inputProps={{ 'aria-label': 'controlled' }}
                />
                <Stack>
                    <RiFullscreenFill size={20} />
                </Stack>
            </Stack>

        </div>
    )
}

export default FullScreenStorageForm