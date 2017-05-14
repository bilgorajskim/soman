import axios from 'axios';

const ENDPOINT = '/sensors/api/';

export function getZones(params) {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINT + 'zones', {
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
