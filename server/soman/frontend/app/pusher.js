import Pusher from 'pusher-js';

Pusher.logToConsole = true;

export const pusher = new Pusher('fb954647d2e4c2c9aa88', {
  cluster: 'eu',
  encrypted: true
});
