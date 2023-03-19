// assets
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

// icons
const icons = {
    MiscellaneousServicesIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const settings = {
    id: 'settings-group',
    title: 'Impostazioni',
    type: 'group',
    children: [
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            regexURI: /\/settings/,
            icon: icons.MiscellaneousServicesIcon,
            breadcrumbs: false,
            fullWidth: true,
        },
    ]
};

export default settings;
