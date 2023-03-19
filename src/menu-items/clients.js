// Assets
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {UserAddOutlined} from '@ant-design/icons'

// icons
const icons = {
    PeopleOutlineIcon,
    UserAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-clients',
    title: 'Rubrica',
    type: 'group',
    children: [
        {
            id: 'clients/view',
            title: 'Rubrica',
            type: 'item',
            url: '/clients/view',
            regexURI: /\/clients/,
            icon: icons.PeopleOutlineIcon,
            breadcrumbs: false,
            fullWidth: true,
        },
        // {
        //     id: 'clients/create',
        //     title: 'Crea Paziente',
        //     type: 'item',
        //     url: '/clients/create',
        //     regexURI: /\/clients\/create/,
        //     icon: icons.UserAddOutlined,
        //     breadcrumbs: false,
        //     fullWidth: true,
        // },
        // {
        //     id: 'clients/profile/id',
        //     title: 'Profilo Paziente',
        //     type: 'item',
        //     url: '/clients/profile/id/:clientID',
        //     regexURI: /\/clients\/profile\/id\/d+/,
        //     icon: icons.UserAddOutlined,
        //     breadcrumbs: false,
        //     fullWidth: true,
        //     visible: false,
        // },
        // {
        //     id: 'clients/profile/cf',
        //     title: 'Profilo Paziente',
        //     type: 'item',
        //     url: '/clients/profile/cf/:clientCF',
        //     regexURI: /\/clients\/profile\/cf\/[a-zA-Z0-9]+/,
        //     icon: icons.UserAddOutlined,
        //     breadcrumbs: false,
        //     fullWidth: true,
        //     visible: false,
        // }
    ]
};

export default dashboard;