// Assets
import {BiChat} from 'react-icons/bi';
// import StoreIcon from '@mui/icons-material/Store';
// icons
const icons = {
    BiChat
};

// ==============================|| MENU ITEMS - AZIENDA ||============================== //

const chat = {
    id: 'group-chat',
    title: 'LiveChat',
    type: 'group',
    children: [
        {
            id: '/chat/channel',
            title: 'Live Chat',
            type: 'item',
            url: '/chat/channel/0',
            regexURI: /\/chat/,
            icon: icons.BiChat,
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

export default chat;