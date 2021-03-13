import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import auth from '../../auth/auth';
import Styles from '../../screens/styles/userAuth.styles';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState({});

    const classes = Styles();
    const history = useHistory();

    const handleSignup = () => {
        const info = { email: email,name:name, password: password };
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
        };
        axios.post('/api/signup', info, { headers })
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

    const inputField = ({ id, label,type,onChangeFn}) => {
        return <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type={type}
            id={id}
            label={label}
            autoComplete={id}
            autoFocus={id === 'name' ? true : null}
            onChange={e => onChangeFn(e.target.value)}
            error={err[id] ? true : null}
            helperText={err[id] ? err[id] : null}
            onKeyDown={id === "password" ? (e) => {
                if (e.key === 'Enter') {
                    handleSignup()
                }
            }:null}
        />
    }

    return (
        <form className={classes.form} noValidate>
            {inputField({ id: 'name', label: 'Name', type: 'text', onChangeFn: setName })}
            {inputField({ id: 'email', label: 'Email',type:'email',onChangeFn:setEmail })}
            {inputField({ id: 'password', label: 'Password',type:'password',onChangeFn:setPassword })}
            <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSignup}>
                Signup
            </Button>
            {err.msg ?
                <Typography variant="body1" color="secondary" align="center">
                    User with this email already exists.
                </Typography>
                : null}
        </form>
    )
}

export default SignupForm;
