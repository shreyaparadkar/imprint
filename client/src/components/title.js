import React from 'react';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Styles = makeStyles((theme) => ({
  container: {
    marginTop: -11,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontWeight:'bold'
  },
  divider: {
    height: '1.5px',
    width: '75%',
    backgroundColor: theme.palette.grey[300],
    marginBottom:20
  }
}));

const Title = (props) => {
  const classes = Styles();

  return (
    <div className={classes.container}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        {props}
      </Typography>
      <Divider className={classes.divider} />
    </div>
  );
}

export default Title;