import { combineReducers } from "redux";
import tricks from "./tricksReducer";
import infra from "./infraReducer";

const rootReducer = combineReducers({
    tricks,
    infra,
})

const REDUCERS_NAMES = {
    tricks: "tricks",
    infra: "infra"
}

export { REDUCERS_NAMES };
export default rootReducer;