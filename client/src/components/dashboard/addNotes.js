import React, { useState } from 'react';
import axios from 'axios';

import RichTextEditor from 'react-rte';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Title from '../title';
import Styles from '../styles/addNotes.styles';
import toolbarCustomization from '../../helpers/toolbar';

const AddNotes = () => {
 
  const [name, setName] = useState('');
  const [note, setNote] = useState(RichTextEditor.createEmptyValue());
  const [followUpStatus, setFollowUpStatus] = useState(false);
  const [followUpAfter, setFollowUpAfter] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [err, setErr] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [wantToFollowUp, setWantToFollowUp ] = useState(false);

  const classes = Styles();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  const clearInputs = () => {
    setName('');
    setNote(RichTextEditor.createEmptyValue());
    setFollowUpStatus(false);
    setFollowUpAfter(null);
    setWantToFollowUp(false);
    setErr(false);
    setDate(new Date().toISOString().slice(0, 10));
  }

  const handleNewClient = () => {

    if(name.length===0 || note.length===0){
      setErr(true);
      return;
    }
    const info = { name: name, date:date, notes:note.toString('html'),
      follow_up: followUpStatus, follow_up_after: followUpAfter
    };
    const login = JSON.parse(localStorage.login);
    const token = login.token;

    const headers = { 
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    };

    axios.post('/api/addnotes', info,{headers})
        .then(response => {
          console.log(response.data);
          setErr(false);
          setOpenSnackbar(true);
          setSnackbarText(response.data);
          clearInputs();
        })
        .catch(error=>{
          setErr(true);
          setOpenSnackbar(true);
          setSnackbarText('Oops! Could not add note. Please try again.')
          console.log(error)
    });
  }

  return (
    <Container maxWidth='md' className={classes.container}>
      {Title('Add notes')}
      <Typography variant='body2' color="primary" align="center">Add client details and other personal notes.You can
      also add meeting logs and request follow up for them.</Typography><br/>
      <Container className={classes.root}>
          <Container maxWidth='md'>
            <div className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Client Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={e => setName(e.target.value)}
                value = {name}
              />
              <RichTextEditor value={note} onChange={value => setNote(value)} placeholder="Add notes..."
                editorStyle={{ height: 230 }} toolbarConfig={toolbarCustomization.toolbarConfig}
                customControls={toolbarCustomization.customControls(setNote)}/>
              <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" flexWrap="wrap">
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="date"
                  type="date"
                  name="selected_date"
                  label="Date"
                  value= { date }
                  onChange={e => setDate(e.target.value)}
                />
                {!wantToFollowUp ?
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={e => setWantToFollowUp(!wantToFollowUp)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Do you want to follow up about this?"
                  />
                  : <TextField
                    variant="outlined"
                    margin="normal"
                    id="name"
                    label="Follow up after(days)?"
                    name="follow_up_after"
                    autoComplete="name"
                    autoFocus
                    onChange={e => {
                      setFollowUpAfter(e.target.value);
                      setFollowUpStatus(true);
                    }}
                  />
                }
              </Box>
              <Button variant="contained" color="primary"
                onClick={handleNewClient} style={{marginTop:12}}
              >Add</Button>
            </div>
          </Container>
        {/* </CardContent> */}
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Follow up completed!"
        autoHideDuration={2500}>
        <MuiAlert elevation={6} variant="filled" severity={err ? "error" : "success"}>{snackbarText}</MuiAlert>
      </Snackbar>
      <br /><br />
    </Container>
  )
}

export default AddNotes;