import React from 'react';
import SensorIcon from 'react-icons/lib/fa/life-bouy';

export default function waterSensor({data, color, active}) {
  return <div className={active?'sensor--active':''}>
    <div className="sensor__icon">
    <SensorIcon />
    </div>
      <div className="sensor__label">
        {active?'Wykryto wodę!':'Brak wody'}
      </div>
  </div>;
}
