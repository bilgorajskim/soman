import React from 'react';
import SensorIcon from 'react-icons/lib/fa/fire';
import { sensorConfig } from '../../sensorConfig'

export default function smokeSensor({data, color}) {
  const active = data ? data.value > sensorConfig.smoke.triggerThreshold : false
  return <div className={active?'sensor--active':''}>
    <div className="sensor__icon">
     <SensorIcon />
    </div>
    <div className="sensor__label">
      {active?'Wykryto dym!':'Brak dymu'}
    </div>
  </div>;
}
