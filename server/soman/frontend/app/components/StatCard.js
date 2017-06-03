import React, {PureComponent} from 'react';
import tinycolor from 'tinycolor2';
import API from './../../api/index.js';
import Paper from 'material-ui/Paper';

const style = {
};

class StatCard extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      latestEvent: null,
      sensorId: null
    }
  }

  componentDidMount() {
    this._startFetchingData()
  }

  async _startFetchingData() {
    let sensors = await API.sensors.getSensors()
    let sensor = sensors.filter(s => s.type === this.props.sensor)[0]
    if (!sensor) return
    console.log('Found matching sensor for stat', this.props.sensor, sensor)
    this.setState({
      sensorId: sensor.id
    })
    setInterval(() => this._update(), 10000)
    this._update()
  }

  async _update() {
    let events = await API.sensors.getLatestEventsForSensor(
      this.state.sensorId
    )
    if (events.length) {
      let latestEvent = events[0]
      this.setState({
        latestEvent
      })
    }
  }

  render() {
    let {sensor} = this.props;
    let value = this.state.latestEvent ? this.state.latestEvent.data.value : '?'
    let icon = null;
    let friendlyName = '';
    let friendlyValue = value;
    let color = null;
    switch (sensor) {
      case 'temperature':
        friendlyName = 'temperatura';
        icon = <img src={require('./../icons/temperature.png')} alt='' />;
        color = '#B0E9E9';
        friendlyValue = `${value}ºC`;
        break;
      case 'humidity':
        friendlyName = 'wilgotność';
        icon = <img src={require('./../icons/humidity.png')} alt='' />;
        color = '#B8F4B8';
        friendlyValue = `${value}%`;
        break;
      case 'smoke':
        friendlyName = 'dym';
        icon = <img src={require('./../icons/airPollution2.png')} alt='' />;
        color = '#FFC0C0';
        let pollutionLevel = Math.round((value/1000) * 100)
        friendlyValue = `${pollutionLevel}%`
    }

    let bgColor = tinycolor(color);
    let noteStyles = {
      backgroundColor: color,
      color: bgColor.isDark() ? '#fff' : '#000'
    };

    return <Paper className="basic-stat" style={noteStyles} zDepth={1}>
      <div className="basic-stat__img">
      {icon}
      </div>
      <div className="basic-stat__name">
      {friendlyName}
      </div>
      <div className="basic-stat__value">
      {friendlyValue}
      </div>
    </Paper>
  }
}

export default StatCard;
