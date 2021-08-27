import { Box, Typography } from '@material-ui/core';
import Category from '../components/category';
import styles from '../css/homePage.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TricksActions } from '../redux/actions';
import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Trick from '../components/trick';

const categories = [
    { name: "allVideos", img: '' },
    { name: "beginners", img: '' },
    { name: "intermediate", img: '' },
    { name: 'advanced', img: '' }
]

const HomePage = () => {

    const history = useHistory()

    const dispatch = useDispatch();

    const [saveTrickList, setSaveTrickList] = useLocalStorage("save-trick-list", [])

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
        setSaveTrickList([{
            Climbing: false,
            Difficulty: 3,
            Dismount: false,
            Drops: true,
            Filmed: true,
            Force: false,
            Lasso: false,
            "Level of risk": 2,
            Link: "https://www.youtube.com/embed/-BAl2D7AdmU",
            Name: "כוכב נופל",
            Notes: "אם עושים על חבל מומלץ להיזהר על הסובבים, יש לחבל נטיה להצליף",
            Other: false,
            Positions: false,
            "Rope recommended": false,
            Swings: false,
            Tishu: false,
            "Tishu recommended": false,
            Transitions: false,
            id: 1
        }])
        dispatch(TricksActions.trickList.clear.clearTrickList())
    }, [dispatch])

    return [
        <Box key={'home=page-categories-container'} className={styles.catergoriesContainer}>
            {categories.map((category) => {
                category.onClick = getCategoryOnClickByName(category.name);
                return <Category key={`category-html-tag-${category.name}`} CategoryObject={category} />
            })}

        </Box>,
        <Box key={'home=page-saved-trick-container'} style={{
            width: '100%', display: "flex", height: '100%', flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        }}>
            {saveTrickList.map((trick, index) => {
                console.log('save-trick');
                <Trick trick={trick} CardMode={true}></Trick>
            })
            }</Box>
    ]
}

export default HomePage;