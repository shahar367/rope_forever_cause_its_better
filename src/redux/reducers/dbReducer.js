import { SHEETS_NAMES } from "../../db";
import { DBActions } from "../actions";

const db = (state = { }, action) => {
    switch (action.type) {
        case DBActions.init.INIT_DB_ACTION_TYPE: {
            const db = action.payload;
            return {
                ...state,
                [SHEETS_NAMES.tricks]: db[SHEETS_NAMES.tricks].elements,
                [SHEETS_NAMES.userRoles]: db[SHEETS_NAMES.userRoles].elements
            }
        }
        default:
            return state;
    }
}

export default db;