import { Checkbox, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core"
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce/lib";
import styles from '../css/checkboxItem.module.css';
import { TricksActions } from "../redux/actions";

const CheckboxItem = ({ checkboxObject, handleToggle }) => {

    const { t } = useTranslation("common");

    const dispatch = useDispatch();

    const handleOnClick = () => {
        const isChecked = !checkboxObject.checked;
        handleToggle(checkboxObject.name, isChecked);
    }

    const debouncedToggle = useDebouncedCallback(handleOnClick, 200);

    return (
        <ListItem className={styles.item} key={checkboxObject.name} role={undefined}>
            <ListItemText
                className={styles.text}
                primaryTypographyProps={{ 'variant': 'subtitle1' }}
                id={checkboxObject.index}
                primary={t(`tricks.filters.${(checkboxObject.name).toLowerCase().split(" ").join("")}`)} />
            <ListItemSecondaryAction onClick={
                () => {
                    dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(true))
                    debouncedToggle.callback(checkboxObject.name)
                }
            }>
                <Checkbox
                    checked={checkboxObject.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': checkboxObject.index }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default CheckboxItem;