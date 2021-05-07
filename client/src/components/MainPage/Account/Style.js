import { makeStyles } from '@material-ui/core/styles';
import { lime } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: lime[500],
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default useStyles