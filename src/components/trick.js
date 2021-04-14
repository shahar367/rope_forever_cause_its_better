import { Box, Card, CardActionArea, Chip, Typography } from '@material-ui/core'
import { TRICKS_COLUMN_NAMES } from '../db'
import styles from '../css/trick.module.css'
import Level from './level';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Trick = ({ trick }) => {

    const history = useHistory();

    const { t } = useTranslation('common');

    const handleClick = (event) => {
        if (!trick[TRICKS_COLUMN_NAMES.filmed]) {
            return;
        }
        history.push(`/trick/${trick.id}`)
    }

    const setFilters = () => {
        return (<Box component='section' className={styles.trickFiltersSection}>
            {Object.values(TRICKS_COLUMN_NAMES.filters).filter((tag => {
                return trick[tag]
            })).map(tag => (<Chip key={`${trick[TRICKS_COLUMN_NAMES.name]}-${t(`tricks.filters.${(tag).toLowerCase().split(" ").join("")}`)}-trick-tag`} label={`# ${t(`tricks.filters.${(tag).toLowerCase().split(" ").join("")}`)}`} color='primary' clickable />))}
        </Box>)
    }

    return (
        <Card key={`trick-${trick.id}`} className={styles.trick} onClick={handleClick} variant='outlined'>
            <CardActionArea>
                <Box component='section' className={styles.trickInfoSection}>
                    <Box className={styles.trickTitle}>
                        <Typography variant="h6" className={styles.trickName}>{trick[TRICKS_COLUMN_NAMES.name]}</Typography>
                    </Box>
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
                </Box>
                {/* <Box component='section' className={styles.trickDescripationSection}>
                    <Typography>{trick[TRICKS_COLUMN_NAMES.notes]}</Typography>
                </Box> */}
                {setFilters()}
            </CardActionArea>
        </Card >
    )
}

export default Trick;
