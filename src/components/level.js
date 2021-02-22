import { Box, fade, Paper, Typography } from "@material-ui/core"
import { common, green, red, yellow } from "@material-ui/core/colors"
import { useTranslation } from "react-i18next"
import styles from '../css/level.module.css'
import { TRICKS_COLUMN_NAMES } from "../db"

//#region objects

const levelColorSpectrom = {
    1: {
        color: green[400],
        textColor: fade(common.black, 0.8)
    },
    2: {
        color: green[600],
        textColor: fade(common.black, 0.8)
    },
    3: {
        color: yellow[600],
        textColor: fade(common.black, 0.8)
    },
    4: {
        color: yellow[800],
        textColor: fade(common.black, 0.8)
    },
    5: {
        color: red[600],
        textColor: fade(common.white, 0.8)
    },
    6: {
        color: red[800],
        textColor: fade(common.white, 0.8)
    },
    // 7: {
    //     color: yellow[600],
    //     textColor: fade(common.black, 0.8)
    // },
    // 8: {
    //     color: yellow[800],
    //     textColor: fade(common.black, 0.8)
    // },
    // 9: {
    //     color: red[400],
    //     textColor: fade(common.black, 0.8)
    // },
    // 10: {
    //     color: red[600],
    //     textColor: fade(common.white, 0.8)
    // },
    // 11: {
    //     color: red[800],
    //     textColor: fade(common.white, 0.8)
    // },
    // 12: {
    //     color: fade(common.black, 0.8),
    //     textColor: fade(common.white, 0.8)
    // }
}

//#endregion

const Level = ({ name, level, levelType }) => {

    const { t } = useTranslation('common');
    const getTranslation = () => {
        switch (levelType) {
            case TRICKS_COLUMN_NAMES.difficulty:
                return 'difficulty';
            case TRICKS_COLUMN_NAMES.levelOfRisk:
                return 'levelOfRisk';
            default:
                return '';
        }
    }

    return (
        <Box key={`trick:${name}-${levelType}:${level}`} className={styles.levelWrapper}>
            <Typography variant="caption">{t(`tricks.levels.${getTranslation()}`)} :</Typography>
            <Paper variant="outlined" className={styles.level}
                style={{
                    backgroundColor: `${levelColorSpectrom[level] ? levelColorSpectrom[level].color : 'white'}`,
                    color: `${levelColorSpectrom[level] ? levelColorSpectrom[level].textColor : 'black'}`
                }}>
                {level}
            </Paper>
        </Box >
    )
}

export default Level;
