import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { lime } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      width: 40
    },
    avatar: {
      marginRight: theme.spacing(2),
      backgroundColor: lime[500],
    },
    fullName: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
  }),
);

export default useStyles