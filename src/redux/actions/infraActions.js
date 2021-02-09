const SET_IS_DB_FINISH_FETCHING = "SET_IS_DB_FINISH_FETCHING";

const InfraActions = ({
    onInit: {
        dbFetching: {
            SET_IS_DB_FINISH_FETCHING: SET_IS_DB_FINISH_FETCHING,
            setIsDBFinishFetching: (isFinish) => ({
                type: SET_IS_DB_FINISH_FETCHING,
                payload: isFinish
            })
        },
    }
})

export default InfraActions;