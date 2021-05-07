import { makeStyles } from '@material-ui/core/styles';
import { lime } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
  },
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: lime[500],
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  fullName: {
    marginRight: theme.spacing(2),
  },
  profileLogo: {
    alignContent: 'center',
    marginTop: theme.spacing(2),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  profileName: {
    alignContent: 'center',
    marginTop: theme.spacing(2),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default useStyles