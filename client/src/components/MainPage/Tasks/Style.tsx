import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    closeButton: {
      marginTop: theme.spacing(1)
    },
    updateButton: {
      marginBottom: theme.spacing(1)
    },
    container: {
      marginRight: theme.spacing(1)
    },
    gridContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
  }));

export default useStyles