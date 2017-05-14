const axios = require('axios');
const _ = require('lodash');

const COMMUNICATION_BACKEND = process.env.COMMUNICATION_BACKEND || 'http';
const TEST = process.env.TEST == true || false;
const TEST_SIGNAL_INTERVAL = process.env.TEST_SIGNAL_INTERVAL || 1000;
const THROTTLE_INTERVAL = process.env.THROTTLE_INTERVAL || 10;

const pushUpdate = require('./communicationBackends/' +
  COMMUNICATION_BACKEND
  + '.js')
.pushSensorUpdate;

let lastValue = null;
const pushThrottledUpdate = _.throttle(function (options) {
  if (lastValue === options.value)
    return;
  lastValue = options.value;
  pushUpdate(options);
}, THROTTLE_INTERVAL);

const sensors = require('./sensorConfig.json');

let sensorGpios = [];
var ports = [];
var SerialPort = require('serialport', {lock: false});

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
    var port = new SerialPort('/dev/ttyAMA0');
    var Delimiter = SerialPort.parsers.Delimiter;
    SerialPort.list((err, ports) => {
      console.log(ports);
    });
    var parser = port.pipe(new ByteLength({length: 8}));
    //let parser = port.pipe(new Delimiter({delimiter: ';'}));
    parser.on('data', function (data) {
        console.log('Data', data, JSON.stringify(data));
      // let sensorType = data.charAt(0);
      // let sensorState = data.charAt(1);
      // console.log(sensorType, sensorState);
    });

  port.on('error', function(err) {
    console.log('Error: ', err.message);
  });
  ports.push(port);
}

console.log('Pushing data via ' + COMMUNICATION_BACKEND);
console.log(`Throttling updates to ${THROTTLE_INTERVAL}ms`);