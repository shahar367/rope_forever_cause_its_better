import { List } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { TRICKS_COLUMN_NAMES } from "../db"
import { REDUCERS_NAMES } from "../redux/reducers";
import FilterItem from "../components/filterItem";
import { TricksActions } from "../redux/actions";

const Filters = () => {
    const dispatch = useDispatch();

    const { filtersList } = useSelector(state => {
        const filtersList = Object.values(TRICKS_COLUMN_NAMES.filters)
            .map((filter, index) => ({
                name: filter,
                checked: state[REDUCERS_NAMES.tricks].activeFilters.includes(filter),
                index: index
            }));
        return { filtersList: filtersList }
    })

    const handleToggle = (filterName, isChecked) => {
        if (isChecked) {
            dispatch(TricksActions.trickList.filters.addFilter(filterName))
        } else {
            dispatch(TricksActions.trickList.filters.removeFilter(filterName))
        }
        dispatch(TricksActions.trickList.pagging.setNextPageIndex(1))
        dispatch(TricksActions.trickList.loading.setIsLoadingListAfterSearch(false))
    }

    return (
        <List>
            { filtersList.map((filter) =>
                <FilterItem key={`sidebar-${filter.name}`} filterObject={filter} handleToggle={handleToggle} />
            )}
        </List>
    )
}

export default Filters;