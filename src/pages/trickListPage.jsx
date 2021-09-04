import { useCallback, useEffect } from "react";
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
import SliderItem, { defaultSilderItem } from "../components/sliderItem";

//#region helpMethod

const getScrollTop = () => {
    return (document.getElementById('trickListMain').scrollTop !== undefined)
        ? document.getElementById('trickListMain').scrollTop
        : document.getElementById('trickListMain').parentNode.scrollTop;
}

const getDocumentHeight = () => {
    const trickListMain = document.getElementById('trickListMain');
    return Math.max(
        trickListMain.scrollHeight, trickListMain.offsetHeight
    );
};
//#endregion

//#region helpObjects

const sliderMarks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 6,
        label: '6',
    },
]

//#endregion

const TrickListPage = () => {

    let trickListMainElement = document.getElementById('trickListMain') ? document.getElementById('trickListMain') : window;

    const { t } = useTranslation('common');

    const theme = useTheme();

    const mobile = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);

    const dispatch = useDispatch();

    //#region selector

    let { isFinishFetching, tricks, pageIndex, numberInPage, maxNumberOfTricks, ranges, isLoadingAfterSearch, openDrawer } = useSelector((state) => {
        let filteredList = [];
        let isFinishFetching = state[REDUCERS_NAMES.infra].isFinishFetching
        let pageIndex = state[REDUCERS_NAMES.tricks].trickListPageIndex
        let numberInPage = state[REDUCERS_NAMES.tricks].numberOfTricksOnPage
        let isLoadingNextPage = state[REDUCERS_NAMES.tricks].isLoadingNextPage
        let isLoadingAfterSearch = state[REDUCERS_NAMES.tricks].isLoadingAfterSearch
        let activeFilters = state[REDUCERS_NAMES.tricks].activeFilters
        let ranges = state[REDUCERS_NAMES.tricks].ranges
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
                if (ranges) {
                    filteredItem = filteredItem
                        && ranges[TRICKS_COLUMN_NAMES.difficulty][0] <= item[TRICKS_COLUMN_NAMES.difficulty]
                        && item[TRICKS_COLUMN_NAMES.difficulty] <= ranges[TRICKS_COLUMN_NAMES.difficulty][1]
                        && ranges[TRICKS_COLUMN_NAMES.levelOfRisk][0] <= item[TRICKS_COLUMN_NAMES.levelOfRisk]
                        && item[TRICKS_COLUMN_NAMES.levelOfRisk] <= ranges[TRICKS_COLUMN_NAMES.levelOfRisk][1]
                }
                if (freeSearch) {
                    filteredItem = filteredItem && item[TRICKS_COLUMN_NAMES.name].includes(freeSearch)
                }
                return filteredItem;
            })
            maxNumberOfTricks = filteredList.length
        }
        return {
            isFinishFetching,
            tricks: filteredList.length > 0 ? filteredList.slice(0, pageIndex * numberInPage) : filteredList,
            pageIndex,
            numberInPage,
            isLoadingNextPage,
            isLoadingAfterSearch,
            maxNumberOfTricks,
            openDrawer: state[REDUCERS_NAMES.infra].homePageInfra.openDrawer,
            activeFilters,
            ranges,
            state: state
        }
    })

    //#endregion

    const handlePaggination = () => {
        if (getScrollTop() + 1 < getDocumentHeight() - trickListMainElement.offsetHeight) return;
        else if (pageIndex * numberInPage > maxNumberOfTricks) return;
        dispatch(TricksActions.trickList.pagging.setNextPageIndex(++pageIndex));
    }

    //#region filters functions

    const handleToggleDrawer = () => {
        dispatch(InfraActions.homePage.toggleHomePageDrawer(!openDrawer))
    }

    const handleSearch = (event) => {
        const newSearch = event.target.value;
        dispatch(TricksActions.trickList.filters.freeSearchInputChange(newSearch))
        dispatch(TricksActions.trickList.pagging.setNextPageIndex(1))
        dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(false))
    }

    const debouncedSearch = useDebouncedCallback(handleSearch, 200);

    const handleDifficultyRangeChange = (value) => {
        dispatch(TricksActions.trickList.filters.changeDifficultyRange(value))
    }

    const handleLevelOfRiskRangeChange = (value) => {
        dispatch(TricksActions.trickList.filters.changeLevelOfRiskRange(value))
    }

    //#endregion

    const trickListView = () => {
        if (isLoadingAfterSearch) {
            return (<Box className={styles.loadingSpinnerWrapper}>
                <CircularProgress size={100} />
            </Box>)
        } else if (maxNumberOfTricks <= 0) {
            return (<Typography
                variant='h3'
                color='textSecondary'
                className={styles.noResult}>
                {t('infra.noResult')}
            </Typography>)
        } else {
            return (tricks.map(trick => [
                <Trick key={`trick-html-${trick.id}`} trick={trick} />
            ]))
        }
    }

    const view = useCallback(() => trickListView(), [tricks, maxNumberOfTricks, isLoadingAfterSearch])

    useEffect(() => {
        trickListMainElement = document.getElementById('trickListMain') ? document.getElementById('trickListMain') : window;
        console.log(trickListMainElement);
        trickListMainElement.addEventListener("scroll", handlePaggination);
        if (isLoadingAfterSearch) {
            setTimeout(() => {
                dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(false));
            }, 300);
        }
        return () => {
            trickListMainElement.removeEventListener("scroll", handlePaggination);
            // dispatch(TricksActions.trickList.clear.clearTrickList())
        }
    }, [isFinishFetching])

    return (
        <Box className={styles.pageWrapper}>
            {isFinishFetching ? (
                <Box className={styles.layout}>
                    <Box id={'trickListMain'} className={styles.main}>
                        <Box className={styles.addedFiltersSearchInputContainer}>
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
                                            dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(true))
                                            debouncedSearch.callback(event)
                                        }
                                    }
                                    InputProps={{ type: 'search' }}
                                />
                                {mobile ? <Box className={styles.showNumberOfTricks}>
                                    <Typography>{t('infra.numberOfTricks')}</Typography>
                                    <Typography>{tricks.length}</Typography>
                                </Box> : null}
                            </Box>
                            <Box className={styles.sildersContainer}>
                                <SliderItem label={'tricks.levels.difficulty'} containerStyles={styles.levelsliderStyle}
                                    handleSliderValueChange={handleDifficultyRangeChange}
                                    sliderOption={{
                                        ...defaultSilderItem,
                                        marks: sliderMarks,
                                        min: 1,
                                        max: 6,
                                        rangeMode: true,
                                        rangeValue: ranges[TRICKS_COLUMN_NAMES.difficulty],
                                        beforeChangeFunc: () => dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(true)),
                                        afterChangeFunc: () => {
                                            dispatch(TricksActions.trickList.pagging.setNextPageIndex(1))
                                            dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(false))
                                        }
                                    }} />
                                <SliderItem label={'tricks.levels.levelOfRisk'} containerStyles={styles.levelsliderStyle}
                                    handleSliderValueChange={handleLevelOfRiskRangeChange}
                                    sliderOption={{
                                        ...defaultSilderItem,
                                        marks: sliderMarks,
                                        min: 1,
                                        max: 6,
                                        rangeMode: true,
                                        rangeValue: ranges[TRICKS_COLUMN_NAMES.levelOfRisk],
                                        beforeChangeFunc: () => dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(true)),
                                        afterChangeFunc: () => {
                                            dispatch(TricksActions.trickList.pagging.setNextPageIndex(1))
                                            dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(false))
                                        }
                                    }} />
                                {mobile ? null : <Box className={styles.showNumberOfTricks}>
                                    <Typography>{t('infra.numberOfTricks')}</Typography>
                                    <Typography>{maxNumberOfTricks}</Typography>
                                </Box>}
                            </Box>
                        </Box>
                        <Box className={`${styles.trickListContainer} ${maxNumberOfTricks <= 0 || isLoadingAfterSearch ? styles.centerText : ''}`}>
                            {view()}
                        </Box>
                    </Box>
                    {mobile ?
                        (<Drawer anchor='right' classes={{
                            paper: styles.sidebar
                        }} open={openDrawer} onClose={handleToggleDrawer}>
                            <Filters />
                        </Drawer>) :
                        [
                            <Divider key={'trick-page-divider'} className={styles.sidebarDivider} orientation="vertical" />,
                            <Box key={'sidebar'} className={styles.sidebar}>
                                <Filters />
                            </Box>
                        ]
                    }
                </Box>)
                : <Box className={styles.spinnerWrapper}>
                    <CircularProgress size={100} />
                </Box>}
        </Box >
    )
}

export default TrickListPage;