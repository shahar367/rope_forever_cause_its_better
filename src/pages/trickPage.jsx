import { Box, CircularProgress, useMediaQuery, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TRICKS_COLUMN_NAMES } from "../db";
import { useWindowSize } from "../hooks/useWindowSize";
import { REDUCERS_NAMES } from "../redux/reducers";
import styles from '../css/trickPage.module.css';

const TrickPage = () => {

    const { id } = useParams();

    const size = useWindowSize()

    const theme = useTheme();

    const mobile = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);

    let { isFinishFetching, trick } = useSelector(state => {
        let isFinishFetching = state[REDUCERS_NAMES.infra].isFinishFetching
        return {
            isFinishFetching,
            trick: isFinishFetching ? state[REDUCERS_NAMES.tricks].list[id] : {}
        }
    })

    return (
        <Box className={styles.pageWrapper}>
            {isFinishFetching ?
                <Box className={styles.trickVideoContainer}>
                    <iframe width={mobile ? size.width : size.width / 2} height="400"
                        src={trick[TRICKS_COLUMN_NAMES.link]}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" />
                </Box>
                : <Box className={styles.spinnerWrapper}>
                    <CircularProgress size={100} />
                </Box>}
        </Box>)
}

export default TrickPage;