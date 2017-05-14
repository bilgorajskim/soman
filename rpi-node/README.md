# SOMAN rPi sensor proxy

Passes data from Arduino to the Django server.

## Usage

First, edit sensorConfig.json. Use sensor IDs from Django admin panel and map them to Arduino signals.

Then run it using this command:

`TEST=1 TEST_SIGNAL_INTERVAL=1000 THROTTLE_INTERVAL=10 COMMUNICATION_BACKEND=http node index.js`

Where:

- TEST can be set to 1 to make server simulate sensor data.
This is useful for testing without Arduino. When set to 0 (default) it will take data from the actual sensor.
- TEST_SIGNAL_INTERVAL is the interval of simulated signals in milliseconds
- THROTTLE_INTERVAL is the number of milliseconds that must elapse between signal changes to push update
- COMMUNICATION_BACKEND can be either pusher or http
- API_HOST is the host receiving pings; applies only to http backend