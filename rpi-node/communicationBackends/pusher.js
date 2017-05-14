const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '314088',
  key: 'fb954647d2e4c2c9aa88',
  secret: 'bc425c34f9be4e478e0f',
  cluster: 'eu',
  encrypted: true
});

function pushSensorUpdate(data) {
  pusher.trigger('sensors', 'update', data);
}

module.exports = {
  pushSensorUpdate
};