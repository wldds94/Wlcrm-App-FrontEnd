import React from 'react'

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// react-redux
import { useDispatch } from 'react-redux';
// slices
import { openSupport } from 'store/reducers/menu';

// assets
import { CommentOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';

const SupportListItem = ({
    selectedIndex,
    handleListItemClick,
    ...other
}) => {
    const dispatch = useDispatch()

    return (
        <>
            <ListItemButton selected={selectedIndex === 0}
                onClick={(event) => {
                    handleListItemClick(event, 0);
                    dispatch(openSupport())
                }}
            >
                <ListItemIcon>
                    <QuestionCircleOutlined />
                </ListItemIcon>
                <ListItemText primary="Support" />
            </ListItemButton>
        </>
    )
}

export default SupportListItem