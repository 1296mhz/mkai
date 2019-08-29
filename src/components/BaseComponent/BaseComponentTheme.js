import { red } from '@material-ui/core/colors';
export default theme => ({
    root: {
        flexGrow: 1,
    },
    buttonStyle: {
        margin: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        width: '100%',
        flexGrow: 1,
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}
);