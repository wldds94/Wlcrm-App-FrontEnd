// project import
// import pages from './pages';
import dashboard from './dashboard';
import schedule from './calendar';
// chat
import chat from './chat';
import clients from './clients';
import invoices from './invoices';
import journal from './journal';
import settings from './settings';
import company from './company';
import management from './management';
// import commercialista from './commercialista';
import support from './support';

// NOT VISIBLE
import account from './account';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, schedule, chat, clients, invoices, journal, company, management/* , commercialista , pages*/, settings/* , support */, account, support]
};

export default menuItems;
