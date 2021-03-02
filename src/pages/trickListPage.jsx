import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REDUCERS_NAMES } from "../redux/reducers";
import { Box, CircularProgress, Divider, Drawer, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";
import { useEventListener } from "../hooks/useEventListener";
import { InfraActions, TricksActions } from "../redux/actions";
import Filters from "../containers/filters";
import Trick from "../components/trick";
import styles from '../css/trickListPage.module.css';
import { useTranslation } from "react-i18next";
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

const TrickListPage = () => {

    const { t } = useTranslation('common');

    const theme = useTheme();

    const dispatch = useDispatch();

    const mobile = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);

    let { isFinishFetching, tricks, pageIndex, numberInPage, maxNumberOfTricks, isLoadingAfterSearch, openDrawer, activeFilters, state } = useSelector((state) => {
        let filteredList = [];
        let isFinishFetching = state[REDUCERS_NAMES.infra].isFinishFetching
        let pageIndex = state[REDUCERS_NAMES.tricks].trickListPageIndex
        let numberInPage = state[REDUCERS_NAMES.tricks].numberOfTricksOnPage
        let isLoadingAfterSearch = state[REDUCERS_NAMES.tricks].isLoadingAfterSearch
        let activeFilters = state[REDUCERS_NAMES.tricks].activeFilters
        let freeSearch = state[REDUCERS_NAMES.tricks].freeSearch
        let maxNumberOfTricks = state[REDUCERS_NAMES.tricks].maxNumberOfTricks
        if (isFinishFetching) {
            filteredList = state[REDUCERS_NAMES.tricks].list.filter((item) => {
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
            maxNumberOfTricks = filteredList.length
            console.log(maxNumberOfTricks);
        }
        return {
            isFinishFetching,
            tricks: filteredList.length > 0 ? filteredList.slice(0, pageIndex * numberInPage) : filteredList,
            pageIndex,
            numberInPage,
            isLoadingAfterSearch,
            maxNumberOfTricks,
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
        dispatch(TricksActions.trickList.pagging.setNextPageIndex(1))
        dispatch(TricksActions.trickList.loading.isLoadingListAfterSearch(false))
    }

    const debouncedSearch = useDebouncedCallback(handleSearch, 200);

    return (
        <Box className={styles.pageWrapper}>
            {isFinishFetching ? (
                <Box className={styles.layout}>
                    <Box className={styles.main}>
                        <Box className={styles.searchInputContainer}>
                            {mobile ? <IconButton className={styles.openDrawerButton} onClick={handleToggleDrawer}>
                                <MenuRounded />
                            </IconButton> : null}
                            <TextField
                                className={styles.searchInput}
                                label={t("infra.search")}
                                variant="outlined"
                                onInput={
                                    (event) => {
                                        dispatch(TricksActions.trickList.loading.isLoadingListAfterSearch(true))
                                        debouncedSearch.callback(event)
                                    }
                                }
                                InputProps={{ type: 'search' }}
                            />
                        </Box>
                        {/* {mobile ? activeFilters.map((filter, index) => (<Typography
                            className={styles.activeFilter}
                            key={`activefilter-${index}-${filter}`}
                            variant='subtitle1'>
                            #{t(`tricks.filters.${filter.toLowerCase().split(" ").join("")}`)}
                        </Typography>)) : null} */}
                        <Box className={styles.trickListContainer}>
                            {isLoadingAfterSearch
                                ? <Box className={styles.loadingSpinnerWrapper}>
                                    <CircularProgress size={100} />
                                </Box>
                                : maxNumberOfTricks > 0 ?
                                 tricks.map((trick, index) => [
                                    <Trick trick={trick} index={index} />,
                                    <Divider key={`divider-${index}`} />
                                ])
                            : <Typography variant='h3' color='textSecondary' className={styles.noResult}>{t('infra.noResult')}</Typography>}
                        </Box>
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
                </Box>)
                : <Box className={styles.spinnerWrapper}>
                    <CircularProgress size={100} />
                </Box>}
        </Box>
    )
}

export default TrickListPage;