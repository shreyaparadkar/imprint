import { makeStyles } from '@material-ui/core/styles';

const Styles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    container: {
        marginTop: 40
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap:'wrap'
    }
}));

export default Styles;