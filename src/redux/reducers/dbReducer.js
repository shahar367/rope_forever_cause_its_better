import { SHEETS_NAMES } from "../../db";
import { DBActions } from "../actions";

const db = (state = { db: {} }, action) => {
    switch (action.type) {
        case DBActions.init.INIT_DB_ACTION_TYPE: {
            const db = action.payload;
            return {
                ...state,
                db: {
                    ...state.db,
                    tricks: db[SHEETS_NAMES.trickes].elements,
                    userRoles: db[SHEETS_NAMES.userRoles].elements
                }
            }
        }
        default:
            return state;
    }
}

export default db;