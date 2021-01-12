import { DBActions } from "../actions";

const DBReducer = (state = { db: {} }, action) => {
    switch (action.type) {
        case DBActions.INIT_DB_ACTION_TYPE: {
            const db = action.payload;
            return {
                ...state,
                db: {
                    ...state.db,
                    tricks: db.tricks.elements,
                    userRoles: db.userRoles.elements
                }
            }
        }
        default:
            return state;
    }
}

export default DBReducer;