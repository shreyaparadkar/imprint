import { makeStyles } from '@material-ui/core/styles';
import background from '../../assets/background.jpg';

const Styles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom:theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default Styles;