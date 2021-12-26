import { alpha, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,
    color: (props) => theme.palette[props.color].dark,
    backgroundColor: (props) => alpha(theme.palette[props.color].main, 0.16),
  },
}));

export default function Label({
  color = 'default',
  variant = 'ghost',
  children,
  ...other
}) {
  const classes = useStyles({ color, variant, ...other });
  return <span className={classes.root}>{children}</span>;
}
