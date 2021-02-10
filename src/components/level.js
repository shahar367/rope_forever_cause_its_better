import { useEffect, useState } from "react"
import { Box, fade, Paper, Typography } from "@material-ui/core"
import { common, green, red, yellow } from "@material-ui/core/colors"
import { TRICKS_COLUMN_NAMES } from "../db"
import styles from '../css/level.module.css'

const levelColorSpectrom = {
    1: {
        color: green[200],
        textColor: fade(common.black, 0.8)
    },
    2: {
        color: green[400],
        textColor: fade(common.black, 0.8)
    },
    3: {
        color: green[600],
        textColor: fade(common.white, 0.8)
    },
    4: {
        color: green[800],
        textColor: fade(common.white, 0.8)
    },
    5: {
        color: yellow[200],
        textColor: fade(common.black, 0.8)
    },
    6: {
        color: yellow[400],
        textColor: fade(common.black, 0.8)
    },
    7: {
        color: yellow[600],
        textColor: fade(common.black, 0.8)
    },
    8: {
        color: yellow[800],
        textColor: fade(common.black, 0.8)
    },
    9: {
        color: red[400],
        textColor: fade(common.black, 0.8)
    },
    10: {
        color: red[600],
        textColor: fade(common.white, 0.8)
    },
    11: {
        color: red[800],
        textColor: fade(common.white, 0.8)
    },
    12: {
        color: fade(common.black, 0.8),
        textColor: fade(common.white, 0.8)
    }
}

const Level = ({ name, level, levelType }) => {

    const [levelTypeHebrow, setLevelTypeHebrow] = useState()

    useEffect(() => {
        switch (levelType) {
            case TRICKS_COLUMN_NAMES.difficulty:
                setLevelTypeHebrow('רמת קושי')
                break;
            case TRICKS_COLUMN_NAMES.levelOfRisk:
                setLevelTypeHebrow('רמת סיכון')
                break;
            default:
                break;
        }
    }, [levelType])

    return (
        <Box key={`trick:${name}-${levelType}:${level}`} className={styles.levelWrapper}>
            <Typography variant="caption">{levelTypeHebrow} :</Typography>
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
