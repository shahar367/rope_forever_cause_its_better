import { combineReducers } from "redux";
import db from "./dbReducer"

const rootReducer = combineReducers({
    db
})

export default rootReducer;