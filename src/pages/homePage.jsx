import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Trick from "../components/trick";
import { SHEETS_NAMES } from "../db";
import { REDUCERS_NAMES } from "../redux/reducers";

const HomePage = () => {
    const { tricks } = useSelector((state) => {
        return { tricks: state[REDUCERS_NAMES.db][SHEETS_NAMES.tricks] }
    })
    useEffect(() => {
    }, [])

    return (
        <div>{tricks !== undefined ? tricks.map((trick, index) => (<Trick trick={trick} key={`trick-${index}`} />)) : <CircularProgress />}</div>
    )
}

export default HomePage;