import { Box, useMediaQuery, useTheme } from "@material-ui/core";


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

    const { trick } = useSelector(state => {
        return { trick: state[REDUCERS_NAMES.tricks].list[id] }
    })

    return (
        <Box className={styles.trickVideoContainer}>
            <iframe width={mobile ? size.width : size.width / 2} height="400"
                src={trick[TRICKS_COLUMN_NAMES.link]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowfullscreen
                mozallowfullscreen
                msallowfullscreen
                oallowfullscreen
                webkitallowfullscreen></iframe>
        </Box>)
}

export default TrickPage;