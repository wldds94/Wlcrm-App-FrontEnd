// Routes ---> react-router-dom
import Routes from 'routes';

// Theme
import ThemeCustomization from 'themes';

// App import
// import Validate from 'app/Validate';

// or for Day.js
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';
// @mui/x-date-pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InitialLoader from 'app/InitialLoader';
// import MailLoader from 'common/mail/loader/MailLoader';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'it'} >
        <ThemeCustomization>
            {/* <MailLoader /> */}
            <InitialLoader>
                <Routes />
            </InitialLoader>
        </ThemeCustomization>
    </LocalizationProvider>
);

export default App;