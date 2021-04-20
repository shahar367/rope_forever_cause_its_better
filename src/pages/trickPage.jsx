import { Box, Button, Chip, CircularProgress, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { TRICKS_COLUMN_NAMES } from "../db";
import { REDUCERS_NAMES } from "../redux/reducers";
import styles from '../css/trickPage.module.css';
import Level from "../components/level";
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const TrickPage = () => {

    const { id } = useParams();

    const history = useHistory();

    const { t, i18n } = useTranslation("common");

    const theme = useTheme();

    const mobile = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);

    const setFilters = () => {
        if (mobile) return
        return (<Box className={styles.fillerTagContainer}>
            {Object.values(TRICKS_COLUMN_NAMES.filters).filter((tag => {
                return trick[tag]
            })).map(tag => (<Chip label={`# ${t(`tricks.filters.${(tag).toLowerCase().split(" ").join("")}`)}`} color='primary' clickable />))}
        </Box>)
    }

    let { isFinishFetching, trick } = useSelector(state => {
        let isFinishFetching = state[REDUCERS_NAMES.infra].isFinishFetching
        return {
            isFinishFetching,
            trick: isFinishFetching ? state[REDUCERS_NAMES.tricks].list[id] : {}
        }
    })

    return (
        <Box className={styles.pageWrapper}>
            {isFinishFetching ? [
                <Box className={styles.backToTrickListButtonContainer} key={'back-to-trick-list-button-container'}>
                    <Tooltip title={(<Typography>{t('infra.backToTrickList')}</Typography>)}>
                        <IconButton color='default' onClick={() => history.push('/trickList')}>
                            {i18n.language === 'he' ? <ArrowForward /> : <ArrowBack />}
                        </IconButton>
                    </Tooltip>
                </Box>,
                <Box className={styles.trickInfoContainer} key={'trick-page-info-container'}>
                    <Typography variant='h4'>{trick[TRICKS_COLUMN_NAMES.name]}</Typography>
                    {trick[TRICKS_COLUMN_NAMES.difficulty] || trick[TRICKS_COLUMN_NAMES.levelOfRisk] ?
                        <Box className={styles.trickLevels}>
                            {trick[TRICKS_COLUMN_NAMES.difficulty] ? <Level key={`trick-${TRICKS_COLUMN_NAMES.difficulty}-level`}
                                name={trick[TRICKS_COLUMN_NAMES.name]} levelType={TRICKS_COLUMN_NAMES.difficulty} level={trick[TRICKS_COLUMN_NAMES.difficulty]}>
                            </Level> : null}
                            {trick[TRICKS_COLUMN_NAMES.levelOfRisk] ? <Level key={`trick-${TRICKS_COLUMN_NAMES.levelOfRisk}-level`}
                                name={trick[TRICKS_COLUMN_NAMES.name]} levelType={TRICKS_COLUMN_NAMES.levelOfRisk} level={trick[TRICKS_COLUMN_NAMES.levelOfRisk]}>
                            </Level> : null}
                        </Box> : null
                    }
                    {setFilters()}
                </Box>,
                <Box className={styles.trickVideoContainer} key={'trick-page-video-container'}>
                    <iframe width='100%' height='100%'
                        className={styles.trickVideo}
                        src={trick[TRICKS_COLUMN_NAMES.link]}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" />
                </Box>]
                : <Box className={styles.spinnerWrapper}>
                    <CircularProgress size={100} />
                </Box>}
        </Box>)
}

export default TrickPage;