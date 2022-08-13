import React from 'react'
import Icon from '@mui/material/Icon';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  iconRoot: {
    textAlign: 'center',
    flexDirection: 'column',
  }
}));

function LinkIcon(props) {
  const classes = useStyles()
  return (
    <Icon {...props} classes={{ root: classes.iconRoot }}>
      <img style={{ height: '100%' }} src="/link.png" alt="icon" />
    </Icon>
  );
}

export default LinkIcon