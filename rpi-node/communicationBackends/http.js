const axios = require('axios');

function pushSensorUpdate(data) {
  const API_HOST = process.env.API_HOST || 'http://localhost:8000';
  axios.post(API_HOST + '/sensors/api/ping/', data).catch((err) => {
    console.error(err);
  });
}

module.exports = {
  pushSensorUpdate
};