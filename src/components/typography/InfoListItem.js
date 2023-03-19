import React from 'react'

// material-ui
import {
    Typography
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const defaultItem = {
    icon: false,
    itemText: false,
    value: false,
}

const InfoListItem = ({ 
    info = {}, 
    index = 0, 
    responsive = false,
    ...other 
}) => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const item = {
        ...defaultItem,
        ...info
    }

    return (
        <ListItem
            key={index}
            component="div"
            disablePadding
            sx={{ 
                gap: matchDownSM ? '.4rem' : "1rem",
                ...other?.sx/* , flex: 'auto 0 1', */ 
            }}
        >
            <ListItemIcon>
                {Boolean(info?.icon) ? info.icon : ""}
                {/* {info.icon}<PersonSearchIcon /> */}
            </ListItemIcon>
            {responsive ? (
                matchDownSM ? <></> : (info?.itemText !== false ? <ListItemText primary={info.itemText !== false ? info.itemText : ""} sx={{ flex: 'auto 0 1', color: "grey", minWidth: info.itemText ? "70px" : "0" }} /> : "")
            ) : (info?.itemText !== false ? <ListItemText primary={info.itemText !== false ? info.itemText : ""} sx={{ flex: 'auto 0 1', color: "grey", minWidth: info.itemText ? "70px" : "0" }} /> : "")}
            
            {Boolean(info?.value) || info?.value === 0 ? <Typography variant="h6b">{info.value}</Typography> : ""}
        </ListItem>
    )
}

export default InfoListItem