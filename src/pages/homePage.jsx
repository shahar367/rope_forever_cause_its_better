import { Box } from '@material-ui/core';
import Category from '../components/category';
// import beginners from '../assets/png/beginners.png';
// import intermediate from '../assets/png/intermediate.png';
// import advanced from '../assets/png/advanced.png';
import styles from '../css/homePage.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TricksActions } from '../redux/actions';
import { useEffect } from 'react';

const categories = [
    { name: "allVideos", img: '' },
    { name: "beginners", img: '' },
    { name: "intermediate", img: '' },
    { name: 'advanced', img: '' }
]

const HomePage = () => {

    const history = useHistory()

    const dispatch = useDispatch();

    const getCategoryOnClickByName = (categoryName) => {
        switch (categoryName) {
            case categories[0].name: {
                return () => { history.push('/trickList') }
            }
            case categories[1].name: {
                return () => {
                    dispatch(TricksActions.trickList.filters.changeDifficultyRange([1, 2]))
                    history.push('/trickList')
                }
            }
            case categories[2].name: {
                return () => {
                    dispatch(TricksActions.trickList.filters.changeDifficultyRange([3, 4]))
                    history.push('/trickList')
                }
            }
            case categories[3].name: {
                return () => {
                    dispatch(TricksActions.trickList.filters.changeDifficultyRange([5, 6]))
                    history.push('/trickList')
                }
            }
            default: {
                return () => { history.push('/trickList') }
            }
        }
    }

    useEffect(() => {        
        dispatch(TricksActions.trickList.clear.clearTrickList())        
    },[dispatch])

    return (
        <Box className={styles.catergoriesContainer}>
            {categories.map((category) => {
                category.onClick = getCategoryOnClickByName(category.name);
                return <Category key={`category-html-tag-${category.name}`} CategoryObject={category} />
            })}
        </Box>)
}

export default HomePage;