// Assets
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// project import
// import SupportIcon from 'components/support/SupportIcon';
// import {UserAddOutlined} from '@ant-design/icons'

// icons
const icons = {
    AccountCircleIcon,
    LoginOutlined,
    // UserAddOutlined
};

// ==============================|| MENU ITEMS - ACCOUNT ||============================== //

const account = {
    id: 'group-account',
    title: 'Account',
    type: 'group',
    footer: true,
    children: [
        // {
        //     id: 'support',
        //     title: 'Support',
        //     type: 'item',
        //     url: '#support',
        //     regexURI: /\/support/,
        //     icon: SupportIcon,
        //     breadcrumbs: false,
        //     fullWidth: true,
        // },
        {
            id: 'account',
            title: 'Account',
            type: 'item',
            url: '/account',
            regexURI: /\/account/,
            icon: icons.AccountCircleIcon,
            breadcrumbs: false,
            fullWidth: true,
            // visible: false,
        },
        {
            id: 'logout',
            title: 'Logout',
            type: 'item',
            url: '/logout',
            regexURI: /\/logout/,
            icon: icons.LoginOutlined,
            breadcrumbs: false,
            fullWidth: true,
            // visible: false,
        },
    ]
};

export default account;