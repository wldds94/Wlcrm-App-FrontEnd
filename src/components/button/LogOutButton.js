import PropTypes from 'prop-types';
// redux
import { useDispatch } from 'react-redux';

// material-ui
import {
    IconButton,
} from '@mui/material';

// types store - Redux
import { logOut } from 'store/reducers/auth';

// material-ui
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LogoutOutlined } from '@ant-design/icons';
import { cleanEncrypt } from 'store/reducers/encrypt';


const LogOutButton = ({
    size = "small",
    color = "secondary",
    style = {},
    label = false,
    type = 'icon', // list - button
    ...other
}) => {
    // Redux
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(cleanEncrypt())
        // logout
        dispatch(logOut());
    };

    // const mainContent = () => (
    //     switch:
    // )

    const Button = <LogoutOutlined /* onClick={handleLogout} */ style={{ ...style }} />

    return (
        <>
            {type === 'icon' ? (
                <IconButton size="large" color="secondary" onClick={handleLogout}>
                    {/* <LogoutOutlined style={{ ...style }} /> */}
                    {Button }
                </IconButton>
            ) : (
                <ListItemButton onClick={handleLogout} >
                    <ListItemIcon>
                    {Button} {/* <LogoutOutlined style={{ ...style }} /> */}
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            )}
        </>


    )
}

export default LogOutButton