import { createStyles, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => createStyles({
    '@global': {
        '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0
        },
        'html, body': {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            'overscroll-behavior-y': 'none',
            'overscroll-behavior-x': 'none'
        },
        a: {
            textDecoration: 'none'
        }
    }
}));

const GlobalStyles = () => {
    useStyles();
    return null;
};

export default GlobalStyles;