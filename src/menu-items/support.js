
import SupportIcon from "components/support/SupportIcon";

// ==============================|| MENU ITEMS - SUPPORT ||============================== //


const account = {
    id: 'group-support',
    title: 'Support',
    type: 'group',
    footer: true,
    children: [
        {
            id: 'support',
            title: 'Support',
            type: 'item',
            url: '#support',
            regexURI: /\/support/,
            icon: SupportIcon,
            breadcrumbs: false,
            fullWidth: true,
            isSupport: true
        },
    ]
};

export default account;