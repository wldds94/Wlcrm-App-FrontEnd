import { useState } from 'react';

// react router dom
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { CommentOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {MdOutlineAccountTree} from 'react-icons/md'

import SupportListItem from './components/SupportListItem';

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
            {/* <ListItemButton selected={selectedIndex === 0} 
                onClick={(event) => { 
                    handleListItemClick(event, 0); 
                }}
            >
                <ListItemIcon>
                    <QuestionCircleOutlined />
                </ListItemIcon>
                <ListItemText primary="Support" />
            </ListItemButton> */}
            <SupportListItem
                selectedIndex={selectedIndex}
                handleListItemClick={handleListItemClick}
            />
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
            {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon>
                    <CommentOutlined />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                <ListItemIcon>
                    <UnorderedListOutlined />
                </ListItemIcon>
                <ListItemText primary="History" />
            </ListItemButton> */}
        </List>
    );
};

export default SettingTab;
