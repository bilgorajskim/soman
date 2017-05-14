import axios from 'axios';

const ENDPOINT = '/sensors/api/';

export function getLevels() {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINT + 'levels')
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
