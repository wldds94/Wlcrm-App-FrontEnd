// assets
// import { DashboardOutlined } from '@ant-design/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';

// icons
const icons = {
    DashboardIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigazione',
    type: 'group',
    children: [
        // {
        //     id: 'dashboard-home',
        //     title: 'Dashboard',
        //     type: 'item',
        //     url: '/dashboard',
        //     icon: icons.DashboardOutlined,
        //     // breadcrumbs: false
        // },
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            regexURI: /\//,
            icon: icons.DashboardIcon,
            breadcrumbs: false,
            fullWidth: true,
        }
    ]
};

export default dashboard;
