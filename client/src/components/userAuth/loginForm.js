import React,{ useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import auth from '../../auth/auth';
import Styles from '../../screens/styles/userAuth.styles';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState({});

    const classes = Styles();
    const history = useHistory();

    const handleLogin = () => {
        const info = { email: email, password: password };
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
        };
        axios.post('/api/login', info, { headers })
            .then(response => {
                let token = response.data.token;
                auth.login(token, () => {
                    history.push("/dashboard");
                });
            })
            .catch(error => {
                setErr(error.response.data);
            });
    }

    const inputField = ({ id, label }) => {
        return <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type={id === 'email' ? 'email' : 'password'}
            id={id}
            label={label}
            autoComplete={id}
            autoFocus={id === 'email' ? true : null}
            onChange={e => id === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)}
            error={err[id] ? true : null}
            helperText={err[id] ? err[id] : null}
            onKeyDown={id === "email" ? null : (e) => {
                if (e.key === 'Enter') {
                    handleLogin()
                }
            }}
        />
    }

    return (
        <form className={classes.form} noValidate>
            {inputField({ id: 'email', label: 'Email' })}
            {inputField({ id: 'password', label: 'Password' })}
            <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}>
                Login
            </Button>
            {err.msg ?
                <Typography variant="body1" color="secondary" align="center">
                    Error logging in. Enter vaild credentials.
                  </Typography>
                : null}
        </form>
    )
}

export default LoginForm;
