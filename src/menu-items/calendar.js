// Assets
import EventIcon from '@mui/icons-material/Event';
// import {UserAddOutlined} from '@ant-design/icons'

// icons
const icons = {
    EventIcon,
    // UserAddOutlined
};

// ==============================|| MENU ITEMS - CALENDAR ||============================== //

const schedule = {
    id: 'group-schedule',
    title: 'Agenda',
    type: 'group',
    children: [
        {
            id: 'schedule',
            title: 'Calendario',
            type: 'item',
            url: '/schedule',
            regexURI: /\/schedule/,
            icon: icons.EventIcon,
            breadcrumbs: false,
            fullWidth: true,
        },
        // {
        //     id: 'rubrica-add',
        //     title: 'Crea Paziente',
        //     type: 'item',
        //     url: '/clients/add',
        //     icon: icons.UserAddOutlined,
        //     // breadcrumbs: false
        // }
    ]
};

export default schedule;