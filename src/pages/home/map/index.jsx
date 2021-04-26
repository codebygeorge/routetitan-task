import React, { useEffect, useMemo, useState } from 'react';
import { compose, withProps } from 'recompose';
import { GOOGLE_KEY } from 'constants/env-variables';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Polyline
} from 'react-google-maps';
import CustomMarker from './custom-marker';


const MyMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }}/>,
        containerElement: <div style={{ height: '40%' }}/>,
        mapElement: <div style={{ height: '100%' }}/>
    }),
    withScriptjs,
    withGoogleMap
)(({ stops, deliveryStops, directionPoint }) => {

    const path = useMemo(() => stops.map(s => ({
        lat: s.address.lat,
        lng: s.address.lng
    })), [stops]);


    const [directions, setDirections] = useState();
    const { google } = window;
    const directionsService = new google.maps.DirectionsService();

    const start = useMemo(() => ({
        lat: stops[0].address.lat,
        lng: stops[0].address.lng
    }), [stops]);

    const end = useMemo(() => ({
        lat: stops[stops.length - 1].address.lat,
        lng: stops[stops.length - 1].address.lng
    }), [stops]);

    useEffect(() => {
        directionsService.route(
            {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                provideRouteAlternatives: true,
                optimizeWaypoints: true,
                waypoints: deliveryStops.map(s => ({
                    location: new google.maps.LatLng(s.address.lat, s.address.lng),
                    stopover: true
                }))
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(result);
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, []);

    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={directionPoint}
            center={directionPoint}
            yesIWantToUseGoogleMapApiInternals
        >
            <Polyline
                path={path}
                options={{ strokeColor: '#0037f4' }}
            />
            {directions && (
                <DirectionsRenderer
                    directions={directions}
                    options={{
                        polylineOptions: {
                            storkeColor: '#0037f4',
                            strokeOpacity: 0.4,
                            strokeWeight: 4
                        },
                        preserveViewport: true,
                        suppressMarkers: true,
                        icon: { scale: 3 }
                    }}
                />
            )}
            <CustomMarker
                label="Start"
                position={start}
            />
            <CustomMarker
                label="End"
                position={end}
            />
            {deliveryStops.map(stop => (
                <CustomMarker
                    key={stop.id}
                    label={`${stop.sequence_number}`}
                    position={{
                        lat: stop.address.lat,
                        lng: stop.address.lng
                    }}
                />
            ))}
        </GoogleMap>
    );
});

export default MyMapComponent;