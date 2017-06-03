import React from 'react';
import SensorIcon from 'react-icons/lib/fa/circle';

export default function motionSensor({data, color}) {
  const active = data ? data.value === 1 : false
  return <div className={active?'sensor--active':''}>
    <div className="sensor__icon">
      <SensorIcon />
    </div>
    <div className="sensor__label">
      {active?'Wykryto ruch!':'Brak ruchu'}
    </div>
  </div>;
}
