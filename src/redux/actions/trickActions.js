const INIT_TRICKS_LIST = "INIT_DB_ACTION_TYPE";
const NEXT_PAGE = "NEXT_PAGE";
const LOADING_LIST_AFTER_SEARCH = "LOADING_LIST_AFTER_SEARCH";
const ADD_FILTER = "ADD_FILTER";
const REMOVE_FILTER = "REMOVE_FILTER";
const FREE_SEARCH_INPUT_CHANGE = "FREE_SEARCH_INPUT_CHANGE";
const LOADING_NEXT_PAGE = "LOADING_NEXT_PAGE";
const CHANGE_DIFFICULTY_RANGE = "CHANGE_DIFFICULTY_RANGE"; 
const CHANGE_LEVEL_OF_RISK_RANGE = "CHANGE_LEVEL_OF_RISK_RANGE"; 

const TricksActions = ({
    init: {
        INIT_TRICKS_LIST: INIT_TRICKS_LIST,
        initTricksList: (tricksList) => ({
            type: INIT_TRICKS_LIST,
            payload: tricksList
        })
    },
    trickList: {
        pagging: {
            NEXT_PAGE: NEXT_PAGE,
            setNextPageIndex: (index) => ({
                type: NEXT_PAGE,
                payload: index
            }),
            LOADING_NEXT_PAGE: LOADING_NEXT_PAGE,
            setIsLoadingNextPage: (isLoadingNextPage) => ({
                type: LOADING_NEXT_PAGE,
                payload: isLoadingNextPage
            })
            
        },
        loading: {
            LOADING_LIST_AFTER_SEARCH: LOADING_LIST_AFTER_SEARCH,
            setIsLoadingListAfterSearch: (isLoading) => ({
                type: LOADING_LIST_AFTER_SEARCH,
                payload: isLoading
            })
        },
        filters: {
            ADD_FILTER: ADD_FILTER,
            addFilter: (filter) => ({
                type: ADD_FILTER,
                payload: filter
            }),
            REMOVE_FILTER: REMOVE_FILTER,
            removeFilter: (filter) => ({
                type: REMOVE_FILTER,
                payload: filter
            }),
            FREE_SEARCH_INPUT_CHANGE: FREE_SEARCH_INPUT_CHANGE,
            freeSearchInputChange: (freeSearch) => ({
                type: FREE_SEARCH_INPUT_CHANGE,
                payload: freeSearch
            }),
            CHANGE_DIFFICULTY_RANGE: CHANGE_DIFFICULTY_RANGE,
            changeDifficultyRange: (range) => ({
                type: CHANGE_DIFFICULTY_RANGE,
                payload: range,
            }),
            CHANGE_LEVEL_OF_RISK_RANGE: CHANGE_LEVEL_OF_RISK_RANGE,
            changeLevelOfRiskRange: (range) => ({
                type: CHANGE_LEVEL_OF_RISK_RANGE,
                payload: range,
            })
        }
    },
})

export default TricksActions;