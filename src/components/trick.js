import { Box, Card, CardActionArea, Typography } from '@material-ui/core'
import { TRICKS_COLUMN_NAMES } from '../db'
import styles from '../css/trick.module.css'
import Level from './level';
import { useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { ReactComponent as Climbing } from '../assets/svg/climbing.svg';


const Trick = ({ trick }) => {

    const history = useHistory();
    // const { t } = useTranslation('common');
    const handleClick = (event) => {
        if (!trick[TRICKS_COLUMN_NAMES.filmed]) {
            return;
        }
        history.push(`/trick/${trick.id}`)
    }
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
                <Box component='section' className={styles.trickDescripationSection}>
                    <Typography>{trick[TRICKS_COLUMN_NAMES.notes]}</Typography>
                </Box>
                {/* <Box component='section' className={styles.trickFiltersSection}>
                {filterIconBulider()}
            </Box> */}
            </CardActionArea>
        </Card>
    )
}

export default Trick;
