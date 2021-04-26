import moment from 'moment';


export function formatDate(d, outFormat) {
    return moment.utc(d).format(outFormat);
}

export function metersToKilometers(m) {
    return (m / 1000).toFixed(1);
}