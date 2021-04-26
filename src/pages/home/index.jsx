import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoutesBlock from './routes-block';


const useStyles = makeStyles(theme => ({
    demoPageWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#9a9a9a'
    },
    demoPage: {
        width: '375px',
        height: '667px',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    demoText: {
        position: 'fixed',
        top: '5px',
        right: '5px',
        fontSize: '14px',
        color: 'white'
    }
}));

function Home() {
    const classes = useStyles();

    return (
        <Box className={classes.demoPageWrapper}>
            <Typography className={classes.demoText}>Demo by George Ghazaryan</Typography>
            <Box className={classes.demoPage}>
                <RoutesBlock/>
            </Box>
        </Box>
    );
}

export default Home;