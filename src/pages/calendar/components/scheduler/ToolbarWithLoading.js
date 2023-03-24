import React from 'react'

// material ui
import { Box, IconButton, Fab, Drawer, Paper, LinearProgress, Stack } from '@mui/material';
// styled
import { styled } from '@mui/material/styles';

// devexpress scheduler
import {
    Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';

// Style & other Comp
const PREFIX = 'Wlcrm';

const classes = {
    toolbarRoot: `${PREFIX}-toolbarRoot`,
    progress: `${PREFIX}-progress`,
};

const StyledDiv = styled('div')({
    [`&.${classes.toolbarRoot}`]: {
        position: 'relative',
        borderBottom: '1px solid #f3f3f3',
        [`&>*`]: {
            borderBottom: 'none',
        }
    },
});

const StyledLinearProgress = styled(LinearProgress)(() => ({
    [`&.${classes.progress}`]: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
    },
}));

const ToolbarWithLoading = ({ children, ...restProps }) => {
    return (
        <StyledDiv className={classes.toolbarRoot}>
            <Toolbar.Root {...restProps}>
                {children}
            </Toolbar.Root>
            <StyledLinearProgress className={classes.progress} />
        </StyledDiv>
    )
}

export default ToolbarWithLoading

export const StyledToolbar = ({ children, ...restProps }) => {
    return (
        <StyledDiv className={classes.toolbarRoot}>
            <Toolbar.Root {...restProps}>
                {children}
            </Toolbar.Root>
            {/* <StyledLinearProgress className={classes.progress} /> */}
        </StyledDiv>
    )
}