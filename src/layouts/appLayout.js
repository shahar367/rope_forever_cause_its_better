import { Box } from "@material-ui/core"

const AppLayout = (props) => {
    return (
        <Box className='appLayout'>
            {props.children}
        </Box>
    )
}

export default AppLayout;