import {createTheme} from '@material-ui/core/styles'
import {lightBlue} from '@material-ui/core/colors'

const theme = createTheme({
    palette:{
        primary:{
            main:lightBlue[300]
        }
    }
})

export default theme