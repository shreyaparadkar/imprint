import { makeStyles } from '@material-ui/core/styles';

const Styles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        // backgroundColor: '#f1f3f8',
        boxShadow: '0.5px 1px 5px #888' 
    },
    container: {
        marginTop: 40
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap:'wrap'
    },
    accordianDetails: {
        marginTop: -10,
    }

}));

export default Styles;