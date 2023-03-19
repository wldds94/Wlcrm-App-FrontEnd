// ==============================|| THEME CONFIG  ||============================== //

const config = {
    defaultPath: '/dashboard',
    fontFamily: `'Public Sans', sans-serif`,
    i18n: 'en',
    miniDrawer: true,
    container: true,
    mode: 'light',
    presetColor: 'default',
    themeDirection: 'ltr',

    // ENCRYPT
    salt: {
        client: 'Wt6dkcSXkevl2hI',
        invoice: 'z8Ygo4vTy4m52xk',
    }, // 'Wt6dkckSX.evl2h'

    // scheduler

};

export default config;

export const drawerWidth = 230;
export const miniDrawerWidth = 60;

export const headerHeight = 60;
export const fullScreenMainHeight = `calc(100vh - ${headerHeight}px)`;

export const schedulerConfig = {
    first_hour: 7,
    last_hour: 21,
    cell_time_step: 30,
    form_time_step: 30,
    // default session values
    mode: 'calendar',
    sessionKeyMode: 'wlcrmUserCalendarMode',
    view: 'Day',
    sessionKeyView: 'wlcrmUserCalendarView',
    onlyUser: false,
    sessionKeyOnlyUser: 'wlcrmUserCalendarOnlyUser',
}

const secretKey = 'fdsfdfsdfdfd'
