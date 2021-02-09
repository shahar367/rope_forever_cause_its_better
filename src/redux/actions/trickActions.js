const INIT_TRICKS_LIST = "INIT_DB_ACTION_TYPE";
const NEXT_PAGE = "NEXT_PAGE";

const TricksActions = ({
    init: {
        INIT_TRICKS_LIST: INIT_TRICKS_LIST,
        initTricksList: (tricksList) => ({
            type: INIT_TRICKS_LIST,
            payload: tricksList
        })
    },
    trickList: {
        NEXT_PAGE: NEXT_PAGE,
        setNextPageIndex: (index) => ({
            type: NEXT_PAGE,
            payload: index
        })
    }
})

export default TricksActions;