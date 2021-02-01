const SET_IS_DB_FINISH_LOADING = "SET_IS_DB_FINISH_LOADING";

const InfraActions = ({
    finishLoading: {
        SET_IS_DB_FINISH_LOADING: SET_IS_DB_FINISH_LOADING,
        setIsDBFinishLoading: (isFinish) => ({
            type: SET_IS_DB_FINISH_LOADING,
            payload: isFinish
        })
    }
})

export default InfraActions;