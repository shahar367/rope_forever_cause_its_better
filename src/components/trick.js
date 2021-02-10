import { Box, Divider, Link, Typography } from '@material-ui/core'
import { TRICKS_COLUMN_NAMES } from '../db'
import styles from '../css/trick.module.css'
import Level from './level';


const Trick = ({ trick, index }) => {
    const notFilmed = 'לא צולם';
    const handleClick = (event) => !trick[TRICKS_COLUMN_NAMES.filmed] ? event.preventDefault() : ''
    const filterIconBulider = () => {
        let icons = [];
        // Object.values(TRICKS_COLUMN_NAMES.filters).forEach(filter => {if(trick[filter]) icons.push(<Box style={{background: `url(..${})`}}></Box>)})
        return icons;
    }
    return (
        <Link key={`trick-${index}`}
            href={trick[TRICKS_COLUMN_NAMES.link]}
            className={styles.trick}
            target='_blank'
            color='textPrimary'
            underline='none'
            onClick={handleClick}>
            <Box component='section' className={styles.trickInfoSection}>
                <Box className={styles.trickTitle}>
                    <Typography variant="h6" className={styles.trickName}>{trick[TRICKS_COLUMN_NAMES.name]}</Typography>
                    {!trick[TRICKS_COLUMN_NAMES.filmed] ? <Typography key={`trick-notFilmed-${index}`} component="span" variant="subtitle1" color='textSecondary'>{notFilmed}</Typography> : null}
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
            <Divider orientation="vertical" />
            <Box component='section'>
                {filterIconBulider()}
            </Box>
        </Link>
    )
}

export default Trick;