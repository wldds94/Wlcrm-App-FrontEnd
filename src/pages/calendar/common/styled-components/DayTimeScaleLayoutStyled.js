import React from 'react'

// devexpress scheduler
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { classes, useGroupingStyles } from './useGroupingStyles';

const DayTimeScaleLayoutStyled = ({
    // className={classes.cell}
    groupingInfo = [],
    resources = [],
    ...restProps
}) => {
    const StyledComponent = useGroupingStyles(DayView.TimeScaleLayout, groupingInfo?.length > 0 ? groupingInfo[0] : {}, resources);
    // restProps.height = 60
    return (
        <StyledComponent
            className={classes.timeScale}
            // groupingInfo={groupingInfo}
            // height={60}
            {...restProps}
            style={{
                ...restProps?.style,
                // height: '60px',
                // backgroundColor: 'red'
            }}
        />
    );
}

export default DayTimeScaleLayoutStyled