import React from 'react'

// devexpress scheduler
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { classes, useGroupingStyles } from './useGroupingStyles';

const DayTimeScaleLabelStyled = ({
    groupingInfo = [],
    resources = [],
    ...restProps
}) => {

    const StyledComponent = useGroupingStyles(
        DayView.TimeScaleLabel,
        groupingInfo?.length > 0 ? groupingInfo[0] : {},
        resources
    );
    restProps.height = '60px'
    return (
        <StyledComponent
            className={classes.timeScale}
            // groupingInfo={groupingInfo}
            {...restProps}
            style={{
                ...restProps?.style,
                // height: '60px',
                // lineHeight: '60px',
                // backgroundColor: 'yellow'
            }}
        />
    );
}

export default DayTimeScaleLabelStyled