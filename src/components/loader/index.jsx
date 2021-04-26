import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    background: {
        position: 'absolute',
        zIndex: '100',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        cursor: 'progress'
    },
    loader: {
        position: 'absolute',
        zIndex: '101',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '48px',
        height: '48px',
        borderRadius: '100%',
        padding: '6px',
        boxShadow: '0 0 10px -4px #00000069',
        backgroundColor: theme.palette.background.paper
    }
}));

const Loader = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.background}/>
            <div className={classes.loader}>
                <CircularProgress size={36} thickness={4}/>
            </div>
        </>
    );
};

export default Loader;