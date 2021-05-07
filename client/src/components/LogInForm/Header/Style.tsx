import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 100,
    },
    logo: {
      height: '50px'
    },
    loginButton: {
      marginTop: theme.spacing(2)
    }
  }),
);

export default useStyles