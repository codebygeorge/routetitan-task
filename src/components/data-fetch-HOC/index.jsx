import React, { useEffect, useMemo } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import { useStateComplex } from 'hooks';
import axios from 'axios';
import axiosInstance from 'api-client';
import Loader from '../loader';


/**
 * @param {String} urlForFetch - Url to fetch
 */

const withDataFetch = urlForFetch => Component => () => {

    const [state, setState] = useStateComplex({
        isFetched: false,
        isError: false,
        data: undefined
    });

    function fetchData() {

        setState({
            isFetched: false,
            data: undefined
        });

        axiosInstance.get(urlForFetch, {
            // ...requestToken && { cancelToken: requestToken.token }
        })
            .then(res => {
                setState({
                    isFetched: true,
                    data: res.data
                });
            })
            .catch(err => {
                if (!axios.isCancel(err)) {
                    setState({
                        isFetched: true,
                        isError: true,
                        data: undefined
                    });
                }
            });
    }

    useEffect(() => {
        if (!state.isFetched) {
            fetchData();
        }
    }, []);

    const errorScreen = useMemo(() => (
        <Box display="flex" alignItems="center" justifyContent="center"
             flexDirection="column"
             style={{
                 height: '100%',
                 backgroundColor: 'white'
             }}
        >
            <Warning fontSize="large"/>

            <Box p={3} mb={3} style={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h5" gutterBottom>Connection problem!</Typography>
                <Typography variant="body1" component="p" gutterBottom
                            style={{ textTransform: 'capitalize' }}
                >
                    Slow or no internet connection.
                    <br/>
                    Refresh the page or check your connection.
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center">
                <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    onClick={fetchData}
                    autoFocus
                >
                    Refresh
                </Button>
            </Box>
        </Box>
    ), []);

    return (
        !state.isFetched ? (
            <Loader/>
        ) : (
            state.isError ? (
                errorScreen
            ) : (
                <Component data={state.data}/>
            )
        )
    );
};
export default withDataFetch;