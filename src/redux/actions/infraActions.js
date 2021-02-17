const SET_IS_DB_FINISH_FETCHING = "SET_IS_DB_FINISH_FETCHING";
const TOGGLE_HOME_PAGE_DRAWER = "TOGGLE_HOME_PAGE_DRAWER";

const InfraActions = ({
    onInit: {
        dbFetching: {
            SET_IS_DB_FINISH_FETCHING: SET_IS_DB_FINISH_FETCHING,
            setIsDBFinishFetching: (isFinish) => ({
                type: SET_IS_DB_FINISH_FETCHING,
                payload: isFinish
            })
        },
    },
    homePage: {
        TOGGLE_HOME_PAGE_DRAWER: TOGGLE_HOME_PAGE_DRAWER,
        toggleHomePageDrawer: (isOpen) => ({
            type: TOGGLE_HOME_PAGE_DRAWER,
            payload: isOpen
        })
    }
})

export default InfraActions;