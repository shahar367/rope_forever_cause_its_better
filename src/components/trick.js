import { Box, Divider, Icon, Link, Typography } from '@material-ui/core'
import { TRICKS_COLUMN_NAMES } from '../db'
import styles from '../css/trick.module.css'
import Level from './level';
// import { useTranslation } from 'react-i18next';
// import { ReactComponent as Climbing } from '../assets/svg/climbing.svg';


const Trick = ({ trick, index }) => {
    // const { t } = useTranslation('common');
    const handleClick = (event) => !trick[TRICKS_COLUMN_NAMES.filmed] ? event.preventDefault() : ''
    // const filterIconBulider = () => {
    //     let icons = [];
    //     Object.values(TRICKS_COLUMN_NAMES.filters).forEach(filter => {
    //         if (trick[filter]) {
    //             icons.push(
    //                 <Icon color='primary'>
    //                     <Climbing fill='currentColor' width={20} />
    //                 </Icon>
    //             )
    //         }
    //     })
    //     return icons;
    // }
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
            <Box component='section' className={styles.trickDescripationSection}>
                <Typography>{trick[TRICKS_COLUMN_NAMES.notes]}</Typography>
            </Box>
            {/* <Box component='section' className={styles.trickFiltersSection}>
                {filterIconBulider()}
            </Box> */}
        </Link>
    )
}

export default Trick;
