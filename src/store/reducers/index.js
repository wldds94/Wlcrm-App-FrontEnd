// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth';
import menu from './menu';
import notices from './notices';
import options from './options';
import client from './client';
import invoice from './invoice';
import calendar from './calendar';
import clinical from './clinical';
import users from './users';
import chat from './chat';
import shopping from './shopping';
import encrypt from './encrypt';
// mailer
import mailer from './mailer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    auth,
    notices,
    encrypt,
    // --- TO INITIAL DISPATCH
    users,
    options,
    client,
    invoice,
    calendar,
    clinical,
    chat,
    shopping,
    mailer,
});

export default reducers;
