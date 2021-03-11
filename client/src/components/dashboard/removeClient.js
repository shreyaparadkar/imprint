import React, { useState } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Styles from '../styles/viewClient.styles';
import Title from '../title';

const RemoveClient = () => {

  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [err, setErr] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const classes = Styles();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  const handleAlert = () => {
    if (name) {
      setOpen(!open);
      setErr(false);
    }
    else {
      setSnackbarText('Enter valid name');
      setOpenSnackbar(true);
      setErr(true);
    }
  }

  const handleDeletion=()=>{
    const info = { name: name }
    setOpen(false);

    const login = JSON.parse(localStorage.login);
    const token = login.token;

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    };
    axios.post('/api/removeclient',info,{headers})
    .then(response => {
      setOpenSnackbar(true);
      setErr(false);
      if (response.data.removed) {
        setStatus(true);
        setSnackbarText(`All data about ${name} is deleted.`);
      }
      else {
        setStatus(false);
        setSnackbarText(`Could not find ${name}. Check the spelling and try again.`);
      }
    })
    .catch(error=>{
      setErr(true);
      setOpenSnackbar(true);
      setSnackbarText('Error while deleting client data. Please try again.')
      });
  }

  const handleConfirmation=()=>{
    handleDeletion()
  }

  return (
    <Container maxWidth='md' className={classes.container}>
      {Title('Remove client records')}
      <Card className={classes.root}>
        <CardContent>
          <Container maxWidth='lg'>
            <div className={classes.form} noValidate>
              <TextField variant="standard" margin="dense" id="name" name="name" autoComplete="name"
                autoFocus placeholder="Client name" onChange={(e)=>setName(e.target.value)} 
              />
              <Button variant="outlined" color="primary" style={{ padding: '0 35px' }} size="small"
                onClick={handleAlert}
              >delete</Button>
            </div>
          </Container>
        </CardContent>
      </Card><br />
      <Dialog
        open={open}
        onClose={handleAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete client"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all notes about {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlert} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmation}
            color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Follow up completed!"
        autoHideDuration={2500}>
        <MuiAlert elevation={6} variant="filled" severity={err ? "error" : status?"success":"warning"}>{snackbarText}</MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default RemoveClient;