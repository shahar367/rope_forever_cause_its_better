import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core"
import { red } from "@material-ui/core/colors";
import { YouTube } from "@material-ui/icons";
import { useTranslation } from "react-i18next"
import styles from '../css/category.module.css';

const Category = ({ CategoryObject }) => {

    const { t } = useTranslation("common");

    return (
        <Card className={styles.categoryCard}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={t(`categories.${CategoryObject.name}`)}
                    height="200"
                    image={CategoryObject.img}
                    title={t(`categories.${CategoryObject.name}`)}
                />
                <CardContent>
                    <Typography variant="h5" component="h2" align='center'>{t(`categories.${CategoryObject.name}`)}</Typography>
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