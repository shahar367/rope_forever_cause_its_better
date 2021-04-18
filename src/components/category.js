import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import styles from '../css/category.module.css';

const Category = ({ CategoryObject }) => {

    const { t } = useTranslation("common");

    return (
        <Card className={styles.categoryCard} elevation={3}>
            <CardActionArea>
                {/* <CardMedia
                    component="img"
                    alt={t(`categories.${CategoryObject.name}`)}
                    height="200"
                    image={CategoryObject.img}
                    title={t(`categories.${CategoryObject.name}`)}
                /> */}
                <CardContent className={styles.categoryCardContantContainer}>
                    <Typography variant="h5" component="h2" align='center' className={styles.categoryCardContant}>{t(`categories.${CategoryObject.name}`)}</Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <IconButton size="small" color='inherit'>
                    <YouTube htmlColor={red[600]} />
                </IconButton>
            </CardActions> */}
        </Card>
    )
}

export default Category;