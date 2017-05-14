import React from 'react';
var Spinner = require('react-spinkit');
import SensorIcon from 'react-icons/lib/fa/circle';

export default function motionSensor({data, color, active}) {
  return <div className={active?'sensor--active':''}>
    <div className="sensor__icon">
    <SensorIcon />
    </div>
      <div className="sensor__label">
        {active?'Wykryto ruch!':'Brak ruchu'}
      </div>
  </div>;
}
