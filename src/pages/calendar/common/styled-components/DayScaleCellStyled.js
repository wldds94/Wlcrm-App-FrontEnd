import React from 'react'

// devexpress scheduler
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { classes, useGroupingStyles } from './useGroupingStyles';

const DayScaleCellStyled = ({
    // className={classes.cell}
    groupingInfo = [],
    resources = [],
    ...restProps
}) => {
    const StyledComponent = useGroupingStyles(
        DayView.DayScaleCell,
        groupingInfo?.length > 0 ? groupingInfo[0] : {}, // groupingInfo[0], // 
        resources
    );

    return (
        <StyledComponent
            className={classes.cell}
            groupingInfo={groupingInfo}
            {...restProps}
        />
    )
}

export default DayScaleCellStyled