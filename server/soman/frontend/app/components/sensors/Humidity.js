import React from 'react';
import SensorIcon from 'react-icons/lib/md/grain';

export default function humiditySensor({data, color}) {
  const value = data ? data.value : '?'
  return <div>
    <div className="sensor__icon">
      <SensorIcon />
    </div>
    <div className="sensor__label">
      {`${value}%`}
    </div>
  </div>;
}
