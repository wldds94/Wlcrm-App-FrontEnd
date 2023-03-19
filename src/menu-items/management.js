// assets
import { ImStatsDots } from 'react-icons/im';
import {BsGraphUp} from 'react-icons/bs';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import DashboardIcon from '@mui/icons-material/Dashboard';

// icons
const icons = {
    ImStatsDots
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const management = {
    id: 'group-management',
    title: 'Gestione',
    type: 'group',
    children: [
        {
            id: 'management',
            title: 'Management',
            type: 'item',
            url: '/management', // /invoices',
            regexURI: /\/management/,
            icon: icons.ImStatsDots,
            breadcrumbs: false,
            fullWidth: true,
        }
    ]
};

export default management;