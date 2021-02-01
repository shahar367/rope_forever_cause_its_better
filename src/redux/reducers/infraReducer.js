import { InfraActions } from "../actions";

const infra = (state = { isFinishLoading: false }, action) => {
    switch (action.type) {
        case InfraActions.finishLoading.SET_IS_DB_FINISH_LOADING: {
            const isFinish = action.payload;
            return {
                ...state,
                isFinishLoading: isFinish
            }
        }
        default:
            return state;
    }
}

export default infra;