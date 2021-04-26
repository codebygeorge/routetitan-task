import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { findLastIndex } from 'lodash';
import withDataFetch from 'components/data-fetch-HOC';
import { makeStyles, Paper } from '@material-ui/core';
import StopsList from './stops-stepper';
import GeneralData from './general-data';
import Map from '../map';


const useStyles = makeStyles(theme => ({
    routesBody: {
        position: 'relative',
        height: 'calc(60% + 15px)',
        marginTop: '-15px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        paddingTop: '80px'
    },
    generalData: {
        position: 'absolute',
        padding: theme.spacing(2),
        width: '100%',
        top: 0,
        boxShadow: '0px 3px 10px -4px #0000004f'
    },
    stopsList: {
        height: '100%',
        overflow: 'auto'
    }
}));

function RoutesBlock({ data }) {
    // console.log(data);

    const classes = useStyles();
    const deliveryStops = useMemo(() => data.stops.filter(s => s.type === 'delivery'), [data.stops]);
    const [currentStop, setCurrentStop] = useState(findLastIndex(data.stops, stop => stop.end_time_string !== undefined));
    const [directionPoint, setDirectionPoint] = useState({
        lat: data.stops[0].address.lat,
        lng: data.stops[0].address.lng
    });

    const nextStep = () => {
        setCurrentStop(prevState => prevState + 1);
    };

    const goToPoint = addressProps => {
        setDirectionPoint(addressProps);
    };

    return (
        <>
            <Map
                stops={data.stops}
                deliveryStops={deliveryStops}
                directionPoint={directionPoint}
            />
            <Paper className={classes.routesBody}>
                <GeneralData
                    className={classes.generalData}
                    currentStop={currentStop}
                    routeName={data.route_name}
                    deliveryStopsNumber={deliveryStops.length}
                    totalDistance={data.total_distance}
                    totalDrivingTime={data.total_driving_time}
                    totalCompletionTime={data.total_completion_time}
                />
                <StopsList
                    className={classes.stopsList}
                    currentStop={currentStop}
                    nextStep={nextStep}
                    goToPoint={goToPoint}
                    stops={data.stops}
                    deliveryStops={deliveryStops}
                />
            </Paper>
        </>
    );
}

RoutesBlock.propTypes = {
    data: PropTypes.shape({
        stops: PropTypes.arrayOf(PropTypes.shape({
            address: PropTypes.shape({
                lat: PropTypes.number.isRequired,
                lng: PropTypes.number.isRequired
            })
        })),
        route_name: PropTypes.string.isRequired,
        total_distance: PropTypes.number.isRequired,
        total_driving_time: PropTypes.number.isRequired,
        total_completion_time: PropTypes.number.isRequired
    }).isRequired
};

export default withDataFetch('/narzero/849b3190d9cb47503f36c35aee5e7c72/raw/e6c13ccd56cb1cad854ce5fa556229b3e906eb5f/route.json')(RoutesBlock);