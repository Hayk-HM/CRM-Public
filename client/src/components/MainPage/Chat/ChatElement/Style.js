import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    marginTop: theme.spacing(1),
  },
  mainGrid: {
    width: '100vh'
  },
  innerGrid: {

  }
}))

export default useStyles