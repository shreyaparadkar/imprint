import {makeStyles} from '@material-ui/core';

const Styles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        backgroundColor: '#fff',
        padding: 0,
        boxShadow: '1px 2px 5px #888',
        paddingBottom: '24px',
        borderRadius:'6px'
    },
    container: {
        marginTop: 40
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

export default Styles;