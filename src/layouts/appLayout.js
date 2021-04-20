import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@material-ui/core"
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import './appLayout.css';

const AppLayout = (props) => {

    const history = useHistory();

    const handleHomeButtonClicked = () => {
        history.push('/');
    }

    return [
        <AppBar position="fixed" className='appBar' key={'where-the-straps-for-the-rope-exists'}>
            <Toolbar className='appBarToolbar'>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleHomeButtonClicked}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6">title</Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>,
        <Box id={'appLayout'} className='appLayout' key={'the-air'}>
            {props.children}
        </Box>
    ]
}

export default AppLayout;