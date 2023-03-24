import React from 'react'

// devexpress scheduler
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { classes, useGroupingStyles } from './useGroupingStyles';

const TimeTableCellStyled = ({
    // className={classes.cell}
    groupingInfo = [],
    resources = [],
    ...restProps
}) => {

    const StyledComponent = useGroupingStyles(
        DayView.TimeTableCell,
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

// const TimeTableCellStyled = ({
//     // className={classes.cell}
//     groupingInfo = [],
//     resources = [],
//     ...restProps
// }) => {
//     // console.log(classes);
//     // console.log(resources);
//     // console.log(groupingInfo);
//     // console.log(groupingInfo[0]);
//     // console.log(groupingInfo?.length > 0);
//     // // console.log(restProps);
//     // // const TimeTableCell = React.memo((groupingInfo, restProps) => {
//     // //     const StyledComponent = useGroupingStyles(
//     // //         DayView.TimeTableCell,
//     // //         groupingInfo[0], // groupingInfo[0], // groupingInfo?.length > 0 ? groupingInfo[0] : {},
//     // //         resources
//     // //     );
//     // //     return (
//     // //         <StyledComponent
//     // //             className={classes.cell}
//     // //             groupingInfo={groupingInfo}
//     // //             {...restProps}
//     // //         />
//     // //     );
//     // // }, [groupingInfo, restProps]);
//     const StyledComponent = useGroupingStyles(
//         DayView.TimeTableCell,
//         groupingInfo?.length > 0 ? groupingInfo[0] : {}, // groupingInfo[0], // 
//         resources
//     );

//     return (
//         <StyledComponent
//             className={classes.cell}
//             groupingInfo={groupingInfo}
//             {...restProps}
//         />
//     )
// }

export default TimeTableCellStyled