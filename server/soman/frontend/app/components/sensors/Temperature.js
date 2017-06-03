import React from 'react';
import SensorIcon from 'react-icons/lib/md/ac-unit';

export default function temperatureSensor({data, color}) {
  const value = data ? data.value : '?'
  return <div>
    <div className="sensor__icon">
      <SensorIcon />
    </div>
    <div className="sensor__label">
      {`${value}°C`}
    </div>
  </div>;
}
