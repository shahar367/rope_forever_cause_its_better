import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REDUCERS_NAMES } from "../redux/reducers";
import { Box, Divider, Drawer, IconButton, TextField, Typography, useTheme } from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";
import { useEventListener } from "../hooks/useEventListener";
import { InfraActions, TricksActions } from "../redux/actions";
import Filters from "../containers/filters";
import Trick from "../components/trick";
import styles from '../css/homePage.module.css';
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../hooks/useWindowSize";
import { TRICKS_COLUMN_NAMES } from "../db";
import { useDebouncedCallback } from "use-debounce/lib";

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

    const { t } = useTranslation('common');

    const theme = useTheme();

    const size = useWindowSize();

    const dispatch = useDispatch();

    const mobile = size.width <= theme.breakpoints.values.sm;

    let { tricks, pageIndex, numberInPage, maxNumberOfTricks, openDrawer, activeFilters, state } = useSelector((state) => {
        let pageIndex = state[REDUCERS_NAMES.tricks].trickListPageIndex
        let numberInPage = state[REDUCERS_NAMES.tricks].numberOfTricksOnPage
        let activeFilters = state[REDUCERS_NAMES.tricks].activeFilters
        let freeSearch = state[REDUCERS_NAMES.tricks].freeSearch
        let filteredList = state[REDUCERS_NAMES.tricks].list.filter((item) => {
            let filteredItem = true;
            if (activeFilters.length > 0) {
                activeFilters.forEach(filter => {
                    filteredItem = filteredItem && item[filter]
                })
            }
            if (freeSearch) {
                filteredItem = filteredItem && item[TRICKS_COLUMN_NAMES.name].includes(freeSearch)
            }
            return filteredItem;
        })
        return {
            tricks: filteredList.slice(0, pageIndex * numberInPage),
            pageIndex,
            numberInPage,
            maxNumberOfTricks: state[REDUCERS_NAMES.tricks].list.length,
            openDrawer: state[REDUCERS_NAMES.infra].homePageInfra.openDrawer,
            activeFilters,
            state: state
        }
    })

    const handlePaggination = () => {
        if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
        else if (pageIndex * numberInPage > maxNumberOfTricks) return;
        dispatch(TricksActions.trickList.pagging.setNextPageIndex(++pageIndex))
    }

    useEventListener("scroll", handlePaggination, window);

    useEffect(() => {
        console.log(state)
    }, [])

    const handleToggleDrawer = () => {
        dispatch(InfraActions.homePage.toggleHomePageDrawer(!openDrawer))
    }

    const handleSearch = (event) => {
        const newSearch = event.target.value;
        dispatch(TricksActions.trickList.filters.freeSearchInputChange(newSearch))
    }

    const debouncedSearch = useDebouncedCallback(handleSearch, 200);

    return (
        <Box className={styles.layout}>
            <Box className={styles.main} style={{ flex: `0 0 ${mobile ? '100%' : 'calc(100% - 215px)'}` }}>
                {mobile ? <IconButton className={styles.openDrawerButton} onClick={handleToggleDrawer}>
                    <MenuRounded />
                </IconButton> : null}
                <TextField
                    label="Search input"
                    margin="normal"
                    variant="outlined"
                    onInput={debouncedSearch.callback}
                    InputProps={{ type: 'search' }} />
                {activeFilters.map((filter, index) => (<Typography
                    className={styles.activeFilter}
                    key={`activefilter-${index}-${filter}`}
                    variant='subtitle1'>
                    #{t(`tricks.filters.${filter.toLowerCase().split(" ").join("")}`)}
                </Typography>))}
                {tricks.map((trick, index) => [
                    <Trick trick={trick} index={index} />,
                    <Divider key={`divider-${index}`} />
                ])}
            </Box>
            {mobile ?
                (<Drawer anchor='right' open={openDrawer} onClose={handleToggleDrawer}>
                    <Filters />
                </Drawer>) :
                [
                    <Divider className={styles.sidebarDivider} orientation="vertical" />,
                    <Box className={styles.sidebar}>
                        <Filters />
                    </Box>
                ]
            }
        </Box>
    )
}

export default HomePage;