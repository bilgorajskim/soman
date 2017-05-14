import React from 'react';
var Spinner = require('react-spinkit');
import SensorIcon from 'react-icons/lib/md/lightbulb-outline';

export default function lightSensor({data, color, active}) {
  return <div className={active?'sensor--active':''}>
    <div className="sensor__icon">
    <SensorIcon />
    </div>
      <div className="sensor__label">
        {active?'Światło zapalone':'Światło zgaszone'}
      </div>
  </div>;
}
