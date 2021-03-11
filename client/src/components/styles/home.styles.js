import { makeStyles } from '@material-ui/core/styles';

const Styles = makeStyles(() => ({
    '@global': {
        '.MuiContainer - root': {
            paddingLeft: 0
        },
    },
    root: {
        minWidth: 275,
        backgroundColor: 'rgba(255,255,255,0)',
        boxShadow: '0px 0px 0px #000',
    },
    container: {
        marginTop: 40
    },
    spinner: {
        marginTop: 12
    },
    row: {
        marginTop: 18
    },
    addedOn: {
        // fontWeight: 'bold',
        fontSize: '.9em'
    },
    clientName: {
        fontWeight: 'bold'
    }
}));

export default Styles;