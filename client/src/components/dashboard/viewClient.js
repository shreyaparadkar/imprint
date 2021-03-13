import React, { useState, Fragment } from 'react';
import axios from 'axios';

import RichTextEditor from 'react-rte';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Title from '../title';
import Styles from '../styles/viewClient.styles';

const ViewClient = () => {

  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [requestStatus, setRequestStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editNoteId, setEditNoteId] = useState([]);
  const [editedText, setEditedText] = useState(RichTextEditor.createEmptyValue());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarErr, setSnackbarErr] = useState(false);

  const classes = Styles();
  const login = JSON.parse(localStorage.login);
  const token = login.token;

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": `Bearer ${token}`
  };

  const handleSearch = () => {
    const info = { name: name, date: selectedDate }
    
    setStatus(false);
    setRequestStatus(true);
    setData([]);
    axios.post('/api/viewclient', info,{headers})
      .then(response => {
        setData(response.data);
        setStatus(true);
        setRequestStatus(false);
      })
      .catch(error => {
        setErrMessage(error.response.data.msg);
        setStatus(false);
        setRequestStatus(false);
      });
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  const handleUpdate = (name,id) => {
    const info = { name: name, id: id, newNote: editedText.toString('html') };
    axios.post('/api/updatenote', info, { headers })
      .then(response => {
        data.forEach((client) => {
          if (client.name === name) {
            client.minutes.forEach(note => {
              if (note.id === id) {
                note.note = editedText.toString('html');
                return;
              }
            });
            const note = editNoteId.filter(noteId => noteId !== id);
            setEditNoteId(note);
          }
        });
        setOpenSnackbar(true);
        setSnackbarText(response.data.msg);
      })
      .catch(error => {
        setOpenSnackbar(true);
        setSnackbarErr(true);
        setSnackbarText('Error updating note! Please try again.')
      });
  }

  const handleDelete = (name,id) => {
    const info = { name: name, id: id }
    axios.post('/api/deletenote', info, { headers })
      .then(response => {
        data.forEach((client) => {
          if (client.name === name) {
            client.minutes.forEach(note => {
              if (note.id === id) {
                let n = client.minutes.indexOf(note);
                if (n > -1) {
                  client.minutes.splice(n, 1);
                  return;
                }
                
              }
            });
          }
        });
        setOpenSnackbar(true);
        setSnackbarText(response.data.msg);
      })
      .catch(error => {
        setOpenSnackbar(true);
        setSnackbarErr(true);
        setSnackbarText('Error deleting note! Please try again.')
      });
  }

  return (
    <Container maxWidth='md' className={classes.container}>
      {Title('View client records')}
      <Typography variant='body2' align='center' color="primary">
        Click view to see all clients. If you want to search for a
        specific client, or date, enter that in the search box and click view. <br/>
        You can also edit or delete any particular note.
      </Typography>
      <br />
      <Card className={classes.root}>
        <CardContent>
          <Container maxWidth='lg'>
            <div className={classes.form}>
              <TextField variant="standard" margin="dense" id="name" name="name" autoComplete="name"
                placeholder="Client name" onChange={e => setName(e.target.value)}
              />
              <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
                <TextField variant="standard" id="date" type="date" name="selected_date" margin="dense"
                onChange={e => setSelectedDate(e.target.value)}
                />
              </Box>
              <Button onClick={handleSearch} color="primary" variant="contained" size="small" style={{ padding: '0 40px' }}
              >view</Button>
            </div>
          </Container>
        </CardContent>
      </Card><br />
      <Typography variant="body1" align='center' color="secondary">
        {errMessage}
      </Typography>
      {status ?
      <Card className={classes.root} style={{boxShadow:'none',backgroundColor:'rgba(0,0,0,0)'}} >
          {data.map(client =>
            <Fragment key={data.indexOf(client)}>
              <Card className={classes.root} style={{ backgroundColor: '#f1f3f8'}}>
                <CardContent>
                  <Typography variant='h6' key={data.indexOf(client)} color="primary" align="center">
                    {client.name}
                  </Typography><br />
                  {client.minutes.map(note =>
                    <Fragment key={note.id}>
                      <Accordion key={note.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                          <Typography className={classes.heading}>{note.date.slice(0, 16)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Container maxWidth="xl" disableGutters className={classes.accordianDetails}>
                            { note.follow_up ?
                              note.follow_up_status ?
                                <><Typography variant="caption" color="textSecondary">Follow up completed.</Typography></> :
                                <><Typography variant="caption" color="primary">Follow up not completed yet.</Typography></>
                              : null
                            }
                            <RichTextEditor value={editStatus && editNoteId.includes(note.id) ? editedText :
                              RichTextEditor.createValueFromString(note.notes, 'html')} readOnly={!editNoteId.includes(note.id)}
                              onChange={value => setEditedText(value)} key={note.id}
                              editorStyle={{ maxHeight: 230, overflow: 'auto' }} />
                            <br/>
                            <Button size="small" onClick={() => {
                              if (editStatus)
                                handleUpdate(client.name, note.id);
                              else
                                setEditedText(RichTextEditor.createValueFromString(note.notes, 'html'));
                              setEditStatus(!editStatus);
                              setEditNoteId([editNoteId,note.id]);
                            }}
                            ><EditIcon color="primary" fontSize="small" />&nbsp;
                              {editStatus && editNoteId.includes(note.id) ? 'Save' : 'Edit'}</Button>
                            <Button size="small" onClick={()=>handleDelete(client.name,note.id)} >
                              <DeleteIcon color="error" fontSize="small" />&nbsp;Delete</Button>
                          </Container>
                        </AccordionDetails>
                      </Accordion>
                    </Fragment>
                  )}
                  <br />
                </CardContent>
              </Card><br />
            </Fragment>
          )}
        </Card>
        : requestStatus ?
        <Box display="flex" flexDirection="row" justifyContent="center">
          <CircularProgress />
          </Box> : null
      }
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Follow up completed!"
        autoHideDuration={3500}>
        <MuiAlert elevation={6} variant="filled" severity={snackbarErr ? "error" : "success"}>{snackbarText}</MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default ViewClient;