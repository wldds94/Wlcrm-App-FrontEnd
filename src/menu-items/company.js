// Assets
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
// icons
const icons = {
    StoreIcon
};

// ==============================|| MENU ITEMS - AZIENDA ||============================== //

const company = {
    id: 'group-company',
    title: 'Studio',
    type: 'group',
    children: [
        {
            id: '/company',
            title: 'Informazioni Base',
            type: 'item',
            url: '/company',
            regexURI: /\/company/,
            icon: icons.StoreIcon,
            breadcrumbs: false,
            fullWidth: true,
        },
        // {
        //     // id: 'rubrica-add',
        //     // title: 'Crea Paziente',
        //     // type: 'item',
        //     // url: '/clients/add',
        //     // icon: icons.UserAddOutlined,
        //     // // breadcrumbs: false
        // }
    ]
};

export default company;