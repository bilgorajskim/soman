import axios from 'axios';

const ENDPOINT = '/sensors/api/';

export async function getLatestEvents() {
    const resp = await axios.get('/sensors/api/sensor-events/?page_size=10')
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
