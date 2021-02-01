import { Box, Typography } from '@material-ui/core'
import { TRICKS_COLUMN_NAMES } from '../db'

const Trick = ({ trick }) => {
    return (
        <Box>
            <Typography variant="h2">{trick[TRICKS_COLUMN_NAMES.name]}</Typography>
        </Box>
    )
}

export default Trick;