import { Box } from '@material-ui/core';
import Category from '../components/category';
import beginners from '../assets/png/beginners.png';
import intermediate from '../assets/png/intermediate.png';
import advanced from '../assets/png/advanced.png';
import styles from '../css/homePage.module.css';

const categories = [
    { name: "beginners", img: beginners },
    { name: "intermediate", img: intermediate },
    { name: 'advanced', img: advanced }
]

const HomePage = () => {
    return (
        <Box className={styles.catergoriesContainer}>
            {categories.map((category, index) => (
                <Category CategoryObject={category} />
            ))}
        </Box>)
}

export default HomePage;