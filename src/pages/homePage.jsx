import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REDUCERS_NAMES } from "../redux/reducers";
import Trick from "../components/trick";
import { Box, Divider } from "@material-ui/core";
import { useEventListener } from "../hooks/useEventListener";
import { TricksActions } from "../redux/actions";
import styles from '../css/homePage.module.css';

//#region helpMethod
const getScrollTop = () => {
    return (window.pageYOffset !== undefined)
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

const getDocumentHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};
//#endregion

const HomePage = () => {

    const dispatch = useDispatch();

    let { tricks, pageIndex, numberInPage, maxNumberOfTricks, state } = useSelector((state) => {
        let pageIndex = state[REDUCERS_NAMES.tricks].trickListPageIndex
        let numberInPage = state[REDUCERS_NAMES.tricks].numberOfTricksOnPage
        return {
            tricks: state[REDUCERS_NAMES.tricks].list.slice(0, (pageIndex + 1) * numberInPage),
            pageIndex,
            numberInPage,
            maxNumberOfTricks: state[REDUCERS_NAMES.tricks].list.length,
            state: state
        }
    })


    const handlePaggination = () => {
        if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
        else if ((pageIndex) * numberInPage > maxNumberOfTricks)    return;
        dispatch(TricksActions.trickList.setNextPageIndex(++pageIndex))
    }

    useEventListener("scroll", handlePaggination, window);

    useEffect(() => {
        console.log(state)
    }, [])

    return (
        <Box className={styles.layout}>{tricks.map((trick, index) => [
            <Trick trick={trick} index={index} />,
            <Divider key={`divider-${index}`} />
        ])}</Box>
    )
}

export default HomePage;