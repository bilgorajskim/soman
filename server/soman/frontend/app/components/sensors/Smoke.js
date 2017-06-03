import React from 'react';
import SensorIcon from 'react-icons/lib/fa/fire';

export default function smokeSensor({data, color}) {
  const active = data ? data.value > 150 : false
  return <div className={active?'sensor--active':''}>
    <div className="sensor__icon">
     <SensorIcon />
    </div>
    <div className="sensor__label">
      {active?'Wykryto dym!':'Brak dymu'}
    </div>
  </div>;
}
