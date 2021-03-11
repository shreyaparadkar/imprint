import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Styles from './styles/userAuth.styles';
import LoginForm from '../components/userAuth/loginForm';
import SignupForm from '../components/userAuth/signupForm';

const UserAuth = () => {
  const [login, setLogin] = useState(true);
  const classes = Styles();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {login ? 'Login' : 'Signup'}
            </Typography>
            {login ? <LoginForm/> : <SignupForm/>}
            <Typography variant="body1">
              {login ? "Don't have an account yet?" : "Already have an account?"}
            </Typography>
            <Button onClick={() => setLogin(!login)}
              variant="text" color="primary"
              size="small">{login ? 'Signup now' : 'Login here'}</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserAuth;

