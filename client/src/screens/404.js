import React from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';


const Styles = makeStyles(() => ({
    container: {
        height:'82vh'
    },
    text: {
        fontWeight: 'bold',
        marginBottom:'30px'
    },
    btn: {
        marginTop:'15px'
    }
}));

const PageNotFound = () => {
    const classes = Styles();
    const history = useHistory();
    return (
        <Box display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            className={classes.container}
        >
            <Typography variant="h3" className={classes.text}>PAGE NOT FOUND</Typography>
            <Typography variant="body1" align="center">The page you are looking for could not be found.
                <br />
                It might have been renamed,
                removed or did not exist in the first place.
            </Typography>
            <Button onClick={() => history.push('/dashboard')}
                variant="contained"
                color="primary"
                size="small"
                className={classes.btn}
            >Go home</Button>
        </Box>
    )
}

export default PageNotFound;