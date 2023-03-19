import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// icons
const icons = {
    RequestQuoteIcon,
    AddShoppingCartIcon
};

const invoices = {
    id: 'group-invoices',
    title: 'Fatturazione',
    type: 'group',
    children: [
        {
            id: 'invoices/list',
            title: 'Fatture',
            type: 'item',
            url: '/invoices/list',
            regexURI: /\/invoices/,
            icon: icons.RequestQuoteIcon,
            breadcrumbs: false,
            fullWidth: true,
        },
        // {
        //     id: 'invoices/create',
        //     title: 'Nuova Fattura',
        //     type: 'item',
        //     url: '/invoices/create',
        //     regexURI: /\/invoice\/create/,
        //     icon: icons.AddShoppingCartIcon,
        //     breadcrumbs: false,
        //     fullWidth: true,
        // }
    ]
};

export default invoices;