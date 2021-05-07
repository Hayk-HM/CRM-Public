import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    title: {
      color: 'black',
      marginBottom: theme.spacing(3)
    },
    subTitle: {
      color: 'black',
    },
    text: {
      color: 'grey',
      marginBottom: theme.spacing(3)
    },
    container: {
      paddingTop: theme.spacing(6)
    }
  }),
);

export default useStyles