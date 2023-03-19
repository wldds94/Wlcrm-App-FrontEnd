// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth';
import menu from './menu';
// import client from './client';
// import notices from './notices';
// import options from './options';
// import invoice from './invoice';
// import calendar from './calendar';
// import clinical from './clinical';
// import user from './user';
// // import account from './account';
// import chat from './chat';
// import shopping from './shopping';
// // encrypting
// import encrypt from './encrypt';

// // mailer
// import mailer from './mailer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    auth,
    // client,
    // notices,
    // options,
    // invoice,
    // calendar,
    // clinical,
    // user,
    // chat,
    // shopping,
    // // mailer
    // mailer,
    // // encrypt
    // encrypt,
});

export default reducers;
