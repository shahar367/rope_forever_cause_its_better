import { TricksActions } from "../actions";

const tricks = (state = { trickListPageIndex: 1, numberOfTricksOnPage: 10, activeFilters: [], freeSearch: '' }, action) => {
    switch (action.type) {
        case TricksActions.init.INIT_TRICKS_LIST: {
            const trickList = action.payload;
            return {
                ...state,
                list: trickList.elements,
            }
        }
        case TricksActions.trickList.pagging.NEXT_PAGE: {
            const index = action.payload;
            return {
                ...state,
                trickListPageIndex: index,
            }
        }
        case TricksActions.trickList.filters.ADD_FILTER: {
            const addFilter = action.payload;
            return {
                ...state,
                activeFilters: [...state.activeFilters].concat([addFilter])
            }
        }
        case TricksActions.trickList.filters.REMOVE_FILTER: {
            const removeFilter = action.payload;
            return {
                ...state,
                activeFilters: [...state.activeFilters].filter(filter => filter !== removeFilter)
            }
        }
        case TricksActions.trickList.filters.FREE_SEARCH_INPUT_CHANGE: {
            const freeSearch = action.payload;
            return {
                ...state,
                freeSearch: freeSearch
            }
        }
        default:
            return state;
    }
}

export default tricks;