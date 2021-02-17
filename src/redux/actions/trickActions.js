const INIT_TRICKS_LIST = "INIT_DB_ACTION_TYPE";
const NEXT_PAGE = "NEXT_PAGE";
const ADD_FILTER = "ADD_FILTER";
const REMOVE_FILTER = "REMOVE_FILTER";

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
            })
        }
    },
})

export default TricksActions;