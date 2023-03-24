// styled
import { alpha, styled } from '@mui/material/styles';

// // Style & other Comp
export const PREFIX = 'Wlcrm';

export const classes = {
    cell: `${PREFIX}-cell`,
    headerCell: `${PREFIX}-headerCell`,
    icon: `${PREFIX}-icon`,
    timeScale: `${PREFIX}-timeScale`,
    cellMonth: `${PREFIX}-cellMonth`,
};


const findColorByGroupId = (id, users) => {
    // console.log(id, users);
    const userFinded = users.find(item => Number(item.id) === Number(id))
    // console.log(userFinded);
    return userFinded ? userFinded?.color : "#fff"
};

export const useGroupingStyles = (Component, group, groupingResources = []) => {
    // console.log(group?.length > 0 ? group[0] : {});
    // console.log(groupingResources);
    const color = findColorByGroupId(group.id, groupingResources);
    return styled(Component)(({ theme }) => ({
        [`&.${classes.cell}`]: {
            backgroundColor: alpha(color, 0.05/*0.1*/),
            height: '60px',
            minWidth: '100px',
            '&:hover': {
                backgroundColor: alpha(color, 0.15/**/),
            },
            '&:focus': {
                backgroundColor: alpha(color, 0.25/*0.2*/),
            },
        },
        [`&.${classes.headerCell}`]: {
            backgroundColor: alpha(color, 0.05/*0.1*/),
            '&:hover': {
                backgroundColor: alpha(color, 0.1),
            },
            '&:focus': {
                backgroundColor: alpha(color, 0.1),
            },
        },
        [`&.${classes.icon}`]: {
            paddingLeft: theme.spacing(1),
            verticalAlign: 'middle',
        },
        [`&.${classes.timeScale}`]: {
            height: '60px',
            lineHeight: '60px',
            '&.Label-emptyLabel': {
                height: '30px',
            }
        },
        [`&.${classes.cellMonth}`]: {
            backgroundColor: alpha(color, 0.05/*0.1*/),
            height: '360px',
            lineHeight: '360px',
            minWidth: '100px',
            '&:hover': {
                backgroundColor: alpha(color, 0.15/**/),
            },
            '&:focus': {
                backgroundColor: alpha(color, 0.25/*0.2*/),
            },
        },
    }));

};