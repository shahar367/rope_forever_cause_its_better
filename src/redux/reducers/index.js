import { combineReducers } from "redux";
import db from "./dbReducer";
import infra from "./infraReducer";

const rootReducer = combineReducers({
    db,
    infra,
})

const REDUCERS_NAMES = {
    db: "db",
    infra: "infra"
}

export { REDUCERS_NAMES };
export default rootReducer;