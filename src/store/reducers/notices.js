// types
import { createSlice, nanoid } from '@reduxjs/toolkit';

// initial state
const initialState = {
    notices: [
        // {
        //     id: '1',
        //     title: 'Error: Impossibile eseguire operazione',
        //     content: "I've heard good things.",
        //     severity: "error", // "error" - "warning" - "info" - "success"
        //     open: true,
        //     dismissed: false,
        //     created: new Date().toISOString(),
        // },
        // {
        //     id: '2',
        //     title: 'Operazione eseguita',
        //     content: "The more I say slice, the more I want pizza.",
        //     severity: "success", // "error" - "warning" - "info" - "success"
        //     open: true,
        //     dismissed: false,
        //     created: new Date,
        // },
        // {
        //     id: '3',
        //     title: 'Warning: Possibile Errore di sistema',
        //     content: "The more I say slice, the more I want pizza.",
        //     severity: "warning", // "error" - "warning" - "info" - "success"
        //     open: true,
        //     dismissed: false,
        //     created: new Date,
        // },
        // {
        //     id: '4',
        //     title: 'Info: Informazione di sistema',
        //     content: "The more I say slice, the more I want pizza.",
        //     severity: "info", // "error" - "warning" - "info" - "success"
        //     open: true,
        //     dismissed: false,
        //     created: new Date,
        // }
    ],
};

const types = {
    error: 'Impossibile eseguire operazione',
    success: 'Operazione eseguita',
    warning: 'Warning: Possibile errore',
    info: 'Info: Informazione di sistema',
}

// ==============================|| SLICE - MENU ||============================== //

const notices = createSlice({
    name: 'notices',
    initialState,
    reducers: {
        cleanNotices: () => initialState,
        addNotice: {
            reducer(state, action) {
                // console.log(state);
                // console.log(action);
                // console.log(action.payload);

                state.notices.push(action.payload)
            },
            prepare(/* notice, title, */ {content, severity}) {
                // console.log(types); console.log(severity); console.log(types[severity]);
                return {
                    payload: {
                        id: nanoid(),
                        title: types[severity],
                        content,
                        severity,
                    }
                }
            }
        },
        hideNotice(state, action) {
            console.log(action);
            state.notices = state.notices.map(notice => {
                if(notice.id === action.payload.id) {
                    // const newNotice = Object.assign(notice, {}) // newNotice.open = 
                    notice.open = false
                }
                return notice
            })
        },
        deleteNotice(state, action) {
            console.log(action);
            state.notices = state.notices.filter(notice => notice.id != action.payload.id)
        }
    }
})

export const selectAllNotices = (state) => state.notices;

export const { deleteNotice, addNotice, hideNotice, cleanNotices } = notices.actions

export default notices.reducer;