import { InfraActions } from "../actions";

const infra = (state = { isFinishFetching: false, homePageInfra: { openDrawer: false } }, action) => {
    switch (action.type) {
        case InfraActions.onInit.dbFetching.SET_IS_DB_FINISH_FETCHING: {
            const isFinish = action.payload;
            return {
                ...state,
                isFinishFetching: isFinish
            }
        }
        case InfraActions.homePage.TOGGLE_HOME_PAGE_DRAWER: {
            const isOpen = action.payload;
            return {
                ...state,
                homePageInfra: {
                    ...state.homePageInfra,
                    openDrawer: isOpen,
                }
            }
        }
        default:
            return state;
    }
}

export default infra;