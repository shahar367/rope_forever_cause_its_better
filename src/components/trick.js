import { Box, Link, Typography } from '@material-ui/core'
import { TRICKS_COLUMN_NAMES } from '../db'
import styles from '../css/trick.module.css'
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const Trick = ({ trick, index }) => {
    const notFilmed = 'לא צולם';
    const handleClick = (event) => !trick[TRICKS_COLUMN_NAMES.filmed] ? event.preventDefault() : ''
    return (
        <Link key={`trick-${index}`}
            href={trick[TRICKS_COLUMN_NAMES.link]}
            className={styles.trick}
            target='_blank'
            color='textPrimary'
            underline='none'
            onClick={handleClick}>
            <Typography variant="h6" className={styles.trickName}>{trick[TRICKS_COLUMN_NAMES.name]}</Typography>
            {!trick[TRICKS_COLUMN_NAMES.filmed] ? <Typography component="span" variant="subtitle1" color='textSecondary'>{notFilmed}</Typography> : null}
        </Link>
    )
}

export default Trick;