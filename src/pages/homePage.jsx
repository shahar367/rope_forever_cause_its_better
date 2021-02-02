import { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { SHEETS_NAMES } from "../db";
import { REDUCERS_NAMES } from "../redux/reducers";
import Trick from "../components/trick";
import { Box, Divider } from "@material-ui/core";
import styles from '../css/homePage.module.css';

const HomePage = () => {
    const { tricks, state } = useSelector((state) => {
        return { tricks: state[REDUCERS_NAMES.db][SHEETS_NAMES.tricks], state: state }
    })
    useEffect(() => {
        console.log(state);
    }, [state])

    return (
        <Box className={styles.layout}>{tricks.map((trick, index) => [
            <Trick trick={trick} index={index} />,
            <Divider key={`divider-${index}`} />
        ])}</Box>
    )
}

export default HomePage;