const axios = require('axios');
const _ = require('lodash');

const COMMUNICATION_BACKEND = process.env.COMMUNICATION_BACKEND || 'http';
const TEST = process.env.TEST == true || false;
const TEST_SIGNAL_INTERVAL = process.env.TEST_SIGNAL_INTERVAL || 1000;
const THROTTLE_INTERVAL = process.env.THROTTLE_INTERVAL || 250;

const pushUpdate = require('./communicationBackends/' +
  COMMUNICATION_BACKEND
  + '.js')
.pushSensorUpdate;

let pushTimeouts = {}

const pushThrottledUpdate = function (options) {
  sensorStates[options.sensorId] = {
    value: options.value,
    date: Date.now()
  }
  if (pushTimeouts[options.sensorId]) {
    clearTimeout(pushTimeouts[options.sensorId])
  }
  pushTimeouts[options.sensorId] = setTimeout(() => {
    pushUpdate(options)
  }, THROTTLE_INTERVAL)
};

const sensors = require('./sensorConfig.json');
let sensorStates = {};
const SerialPort = require('serialport', {lock: false});
if (TEST) {
  console.log(`Simulating 0-1 values with ${TEST_SIGNAL_INTERVAL}ms interval`);
  sensors.forEach(sensor => {
    console.log('Binding sensor', sensor);
    setInterval(() => {
      let high = sensor.high;
      let low = sensor.low;
      if (sensor.type === 'digital') {
        high = 1
        low = 0
      }
      const value = _.random(high, low)
      console.log('Pushing test value ' + value);
      pushThrottledUpdate({value, sensorId: sensor.id});
    }, TEST_SIGNAL_INTERVAL);
  });
} else {
    const port = new SerialPort('/dev/ttyACM0', {
      baudRate: 9600
    });
    const DelimiterParser = SerialPort.parsers.Delimiter;
    const parser = port.pipe(new DelimiterParser({delimiter: ';'}));
    parser.on('data', function (data) {
      let dataFragments = `${data}`.split(':')
      let arduinoSensorId = dataFragments[0]
      let arduinoSensorValue = parseInt(dataFragments[1])
      let sensorConfig = sensors.find(s => s.serialId === arduinoSensorId)
      if (!sensorConfig)
        return console.error('Config not found for sensor:', arduinoSensorId)
      let serverSensorId = sensorConfig.id
      if (sensorStates[serverSensorId] && arduinoSensorValue === sensorStates[serverSensorId].value)
        return
      console.log('Sensor update:', arduinoSensorId, arduinoSensorValue)
      if (isNaN(arduinoSensorValue)) {
        return console.warn('Ignoring invalid value:', arduinoSensorValue)
      }
      pushThrottledUpdate({value: arduinoSensorValue, sensorId: serverSensorId})
    });
}

console.log('Pushing data via ' + COMMUNICATION_BACKEND);
console.log(`Throttling updates to ${THROTTLE_INTERVAL}ms`);