// Assets
import {BsFillJournalBookmarkFill, BsJournalBookmarkFill} from 'react-icons/bs';
// import StoreIcon from '@mui/icons-material/Store';
// icons
const icons = {
    BsJournalBookmarkFill
};

// ==============================|| MENU ITEMS - AZIENDA ||============================== //

const journal = {
    id: 'group-journal',
    title: 'Diario Clinico',
    type: 'group',
    children: [
        {
            id: '/clinical/list',
            title: 'Diario Clinico',
            type: 'item',
            url: '/clinical/list',
            regexURI: /\/clinical/,
            icon: icons.BsJournalBookmarkFill,
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

export default journal;