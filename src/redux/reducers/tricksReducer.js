import { TricksActions } from "../actions";

const tricks = (state = { trickListPageIndex: 1, numberOfTricksOnPage: 10, }, action) => {
    switch (action.type) {
        case TricksActions.init.INIT_TRICKS_LIST: {
            const trickList = action.payload;
            return {
                ...state,
                list: trickList.elements,
            }
        }
        case TricksActions.trickList.NEXT_PAGE: {
            const index = action.payload;
            return {
                ...state,
                trickListPageIndex: index,
            }
        }
        default:
            return state;
    }
}

export default tricks;