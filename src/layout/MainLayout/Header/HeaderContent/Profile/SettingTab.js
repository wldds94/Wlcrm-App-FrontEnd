import { useState } from 'react';

// react router dom
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LockOutlined } from '@ant-design/icons';
import {AiOutlineHeart} from 'react-icons/ai';
import {MdOutlineAccountTree} from 'react-icons/md'

// import SupportListItem from './components/SupportListItem';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
    const theme = useTheme();

    // navigation
    const navigate = useNavigate()

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleNavigate = (location) => {
        navigate(location);
    }

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
            <ListItemButton selected={selectedIndex === 0} 
                onClick={(event) => { 
                    handleListItemClick(event, 0); 
                }}
            >
                <ListItemIcon>
                    <AiOutlineHeart />
                </ListItemIcon>
                <ListItemText primary="Preferenze" />
            </ListItemButton>
            {/* <SupportListItem
                selectedIndex={selectedIndex}
                handleListItemClick={handleListItemClick}
            /> */}
            <ListItemButton selected={selectedIndex === 1}
                onClick={(event) => {
                    handleListItemClick(event, 1)
                    handleNavigate('/account/activities')
                }}
            >
                <ListItemIcon>
                    <MdOutlineAccountTree />
                </ListItemIcon>
                <ListItemText primary="Account Activities" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 2}
                onClick={(event) => {
                    handleListItemClick(event, 2)
                    handleNavigate('/account/privacy')
                }}
            >
                <ListItemIcon>
                    <LockOutlined />
                </ListItemIcon>
                <ListItemText primary="Privacy & Sicurezza" />
            </ListItemButton>
        </List>
    );
};

export default SettingTab;
