import { InfraActions } from "../actions";

const infra = (state = { isFinishFetching: false }, action) => {
    switch (action.type) {
        case InfraActions.onInit.dbFetching.SET_IS_DB_FINISH_FETCHING: {
            const isFinish = action.payload;
            return {
                ...state,
                isFinishFetching: isFinish
            }
        }
        default:
            return state;
    }
}

export default infra;