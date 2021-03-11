import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import RichTextEditor from 'react-rte';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';

import Title from '../title';
import Styles from '../styles/home.styles';

const Home = () => {
  const [status, setStatus] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [errorUpdating, setErrorUpdating] = useState(false);

  const classes = Styles();

  const getNotifications = useCallback(() => {
    const login = JSON.parse(localStorage.login);
    const token = login.token;
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    };
    axios.get('/api/followup', { headers })
      .then(response => {
        if (response.data.length > 0) {
          setNotifs(response.data);
          setStatus(true);
        }
        else
          setStatus(false);
        setLoading(false);
      })
      .catch(error => {
        setErr(true);
        setStatus(false);
      });
  },[])
  
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  const handleFollowUpStatus = (client, notif) => {
    const login = JSON.parse(localStorage.login);
    const token = login.token;
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    };
    const info = { name: client, id: notif }
    axios.post('/api/followup',info,{headers})
        .then(response => {
          setSnackbarText(response.data.msg);
          setOpenSnackbar(true);
          getNotifications();
        })
      .catch(error => {
        setSnackbarText(error.response.statusText);
        setOpenSnackbar(true);
        setErrorUpdating(true);
      });
  }

  useEffect(() => { getNotifications() }, [getNotifications]);

  const showNotifCards = () => {
    return <Container maxWidth='md'>
      <br/>
      <Typography variant='subtitle1' color="primary" align="center">Complete followup with these clients</Typography>
      <br />
      {notifs.map(client =>
        < React.Fragment key={notifs.indexOf(client)}>
          {client['minutes'].map(notif =>
            <React.Fragment key={notif.id}>
              <Card style={{ boxShadow: '1px 2px 6px #888'}}>
                <CardContent>
                  <Typography variant="subtitle1" className={classes.clientName}>{client.name}</Typography><br />
                  <RichTextEditor value={RichTextEditor.createValueFromString(notif.notes, 'html')} readOnly
                    editorStyle={{maxHeight:230,overflow:'auto'}}/>
                  <Box className={classes.row}>
                    <Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap"
                      justifyContent="space-between" style={{"marginTop":3}} className="cardFooter">
                      <Typography variant="body2" color="textSecondary"
                        className={classes.addedOn}>Added on {notif.date.slice(0, 16)}</Typography>
                      <Button color="primary" size="small"
                        onClick={() => handleFollowUpStatus(client.name, notif.id)}>
                        <CheckIcon fontSize="small"/>&nbsp;
                        Followed Up
                    </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <br />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </Container>
  }

  return (
    <Container maxWidth='md' className={classes.container} disableGutters>
      {Title('Dashboard')}
      {
        err ?
          <> <br />
            <Typography variant='body1' align='center' color="error">There was an error loading data! Please try again.</Typography>
          </>
          : loading ?
            <Box display="flex" justifyContent="center">
              <CircularProgress className={classes.spinner} />
            </Box>
            : status ?
              showNotifCards()
              : <> <br />
                <Typography variant='body1' align='center'>No new notifications right now.</Typography>
              </>
      }
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Follow up completed!"
        autoHideDuration={2500}>
        <MuiAlert elevation={6} variant="filled" severity={errorUpdating?"error":"success"}>{ snackbarText }</MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Home;