import React, {PureComponent} from 'react';
import {Button} from 'reactstrap';
import EditIcon from 'react-icons/lib/fa/edit';
import tinycolor from 'tinycolor2';

class StatCard extends PureComponent {

  componentWillMount() {
    this.setState({
    });
  }

  render() {
    let {value, sensor} = this.props;

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
      case 'airPollution':
        friendlyName = 'powietrze';
        icon = <img src={require('./../icons/airPollution.png')} alt='' />;
        color = '#FFC0C0';
        friendlyValue = `${value}%`;
    }

    let bgColor = tinycolor(color);
    let noteStyles = {
      backgroundColor: color,
      color: bgColor.isDark() ? '#fff' : '#000'
    };

    return <div className="basic-stat" style={noteStyles}>
      <div className="basic-stat__img">
      {icon}
      </div>
      <div className="basic-stat__name">
      {friendlyName}
      </div>
      <div className="basic-stat__value">
      {friendlyValue}
      </div>
    </div>
  }
}

export default StatCard;
