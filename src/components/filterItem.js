import { Checkbox, Icon, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core"
import { useTranslation } from "react-i18next";
import { ReactComponent as Climbing } from '../assets/svg/climbing.svg';
import styles from '../css/filterItem.module.css';

const FilterItem = ({ filterObject, handleToggle }) => {

    const { t } = useTranslation("common");

    const handleOnclick = () => {
        const isChecked = !filterObject.checked;
        handleToggle(filterObject.name, isChecked);
    }

    return (
        <ListItem className={styles.item} key={filterObject.name} role={undefined}>
            <ListItemIcon>
                <Icon color='primary'>
                    <Climbing fill='currentColor' />
                </Icon>
            </ListItemIcon>
            <ListItemText
                className={styles.text}
                primaryTypographyProps={{ 'variant': 'subtitle1' }}
                id={filterObject.index}
                primary={t(`tricks.filters.${(filterObject.name).toLowerCase().split(" ").join("")}`)} />
            <ListItemSecondaryAction onClick={() => handleOnclick(filterObject.name)}>
                <Checkbox
                    checked={filterObject.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': filterObject.index }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default FilterItem;