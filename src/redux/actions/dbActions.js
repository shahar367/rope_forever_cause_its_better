const INIT_DB_ACTION_TYPE = "INIT_DB_ACTION_TYPE";

const DBActions = ({
    INIT_DB_ACTION_TYPE: INIT_DB_ACTION_TYPE,
    initDB: (db) => ({
        type: INIT_DB_ACTION_TYPE,
        payload: db
    })
})

export default DBActions;
