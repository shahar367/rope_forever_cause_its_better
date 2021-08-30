import { TricksActions } from "../actions";
import { TRICKS_COLUMN_NAMES } from "../../db";

const initialState = {
    trickListPageIndex: 1,
    numberOfTricksOnPage: 10,
    activeFilters: [],
    freeSearch: '',
    isLoadingAfterSearch: false,
    isLoadingNextPage: false,
    ranges: {
        [TRICKS_COLUMN_NAMES.difficulty]: [1, 6],
        [TRICKS_COLUMN_NAMES.levelOfRisk]: [1, 6]
    }
}

const tricks = (state = initialState, action) => {
    switch (action.type) {
        case TricksActions.init.INIT_TRICKS_LIST: {
            const trickList = action.payload.map((trick, index) => ({ ...trick, id: index }));
            return {
                ...state,
                list: trickList,
                maxNumberOfTricks: trickList.length,
            }
        }
        case TricksActions.trickList.pagging.NEXT_PAGE: {
            const index = action.payload;
            return {
                ...state,
                trickListPageIndex: index,
            }
        }
        case TricksActions.trickList.pagging.LOADING_NEXT_PAGE: {
            const isLoadingNextPage = action.payload;
            return {
                ...state,
                isLoadingNextPage: isLoadingNextPage
            }
        }
        case TricksActions.trickList.loading.LOADING_LIST_AFTER_SEARCH: {
            const isLoading = action.payload;
            return {
                ...state,
                isLoadingAfterSearch: isLoading
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
        case TricksActions.trickList.filters.CHANGE_DIFFICULTY_RANGE: {
            const difficultyRange = action.payload;
            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [TRICKS_COLUMN_NAMES.difficulty]: difficultyRange
                }
            }
        }
        case TricksActions.trickList.filters.CHANGE_LEVEL_OF_RISK_RANGE: {
            const levelOfRiskRange = action.payload;
            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [TRICKS_COLUMN_NAMES.levelOfRisk]: levelOfRiskRange
                }
            }
        }
        case TricksActions.trickList.clear.CLEAR_TRICK_LIST: {
            return {
                ...state,
                ...initialState
            }
        }
        default:
            return state;
    }
}

export default tricks;