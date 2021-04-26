import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Breadcrumbs, Typography } from '@material-ui/core';
import { formatDate, metersToKilometers } from 'utils/helpers';


const GeneralData = ({
                         className,
                         currentStop,
                         routeName,
                         deliveryStopsNumber,
                         totalDistance,
                         totalDrivingTime,
                         totalCompletionTime
                     }) => useMemo(() => (
    <Box className={className}>
        <Typography component="h1">
            <b>{routeName}</b>
        </Typography>
        <Breadcrumbs separator={'\u2022'} aria-label="breadcrumb">
            <Typography component="span" variant="body2">
                {currentStop === deliveryStopsNumber ? 'Done' : `${currentStop} / ${deliveryStopsNumber} stops`}
            </Typography>
            <Typography component="span" variant="body2">
                {metersToKilometers(totalDistance)} km
            </Typography>
            <Typography component="span" variant="body2">
                {formatDate((totalCompletionTime - totalDrivingTime) * 1000, 'H[h]:mm[m]')}
            </Typography>
        </Breadcrumbs>
    </Box>
), [
    className,
    currentStop,
    routeName,
    totalDistance,
    totalDrivingTime,
    totalCompletionTime
]);

export default GeneralData;

GeneralData.propTypes = {
    className: PropTypes.string,
    currentStop: PropTypes.number.isRequired,
    routeName: PropTypes.string.isRequired,
    deliveryStopsNumber: PropTypes.number.isRequired,
    totalDistance: PropTypes.number.isRequired,
    totalDrivingTime: PropTypes.number.isRequired,
    totalCompletionTime: PropTypes.number.isRequired
};

GeneralData.defaultProps = {
    className: ''
};