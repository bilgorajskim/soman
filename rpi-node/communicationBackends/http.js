const axios = require('axios');

function pushSensorUpdate(data) {
  const API_HOST = process.env.API_HOST ?
    ('http://' + process.env.API_HOST) :
    'http://localhost:8000';
  console.log('Pushing update', data)
  axios.post(API_HOST + '/sensors/api/ping/', data).catch((err) => {
    console.error(err);
  });
}

module.exports = {
  pushSensorUpdate
};