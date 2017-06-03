import axios from 'axios';

const ENDPOINT = '/sensors/api/';

export async function getLatestEvents() {
    const resp = await axios.get('/sensors/api/sensor-events/?page_size=30&ordering=-date')
    return resp.data.results
}

export async function getLatestEventsForSensor(sensorId, count = 1) {
    const resp = await axios.get(
      '/sensors/api/sensor-events/?page_size=' + count + '&ordering=-date&sensor_id=' + sensorId
    )
    return resp.data.results
}

export function getSensors(params) {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINT + 'sensors', {
            params
        })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
