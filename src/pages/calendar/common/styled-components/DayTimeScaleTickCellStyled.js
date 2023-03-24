import React from 'react'

// devexpress scheduler
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { classes, useGroupingStyles } from './useGroupingStyles';

const DayTimeScaleTickCellStyled = ({
    groupingInfo = [],
    resources = [],
    ...restProps
}) => {
    const StyledComponent = useGroupingStyles(
        DayView.TimeScaleTickCell,
        groupingInfo?.length > 0 ? groupingInfo[0] : {}, // groupingInfo[0], // 
        resources
    );

    return (
        <StyledComponent
            // className={classes.timeScale}
            // groupingInfo={groupingInfo}
            {...restProps}
            style={{
                ...restProps?.style,
                height: '60px',
                // lineHeight: '60px',
                backgroundColor: '#f5f5f5',
                borderRight: '3px solid #fff',
                borderBottom: '3px solid #fff',
                borderTop: '3px solid #fff',
            }}
        />
    );
}

export default DayTimeScaleTickCellStyled