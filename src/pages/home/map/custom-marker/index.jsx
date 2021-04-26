import React, { useMemo } from 'react';
import { Marker } from 'react-google-maps';
import PropTypes from 'prop-types';


const CustomMarker = ({ position, label }) => useMemo(() => {
    const { google } = window;
    const iw = 70;
    const ih = 70;

    return (
        <Marker
            position={{
                lat: position.lat,
                lng: position.lng
            }}
            label={{
                text: label,
                fontSize: '12px'
            }}
            icon={{
                url: '/assets/icons/maps-and-flags.svg',
                anchor: new google.maps.Point(iw / 4, ih / 2),
                size: new google.maps.Size(iw / 2, ih / 2),
                scaledSize: new google.maps.Size(iw / 2, ih / 2),
                labelOrigin: new google.maps.Point(18, 13)
            }}
        />
    );
}, [position, label]);

export default CustomMarker;


CustomMarker.propTypes = {
    position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }),
    label: PropTypes.string.isRequired
};