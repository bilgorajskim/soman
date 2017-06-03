import React from 'react';
import OpenIcon from 'react-icons/lib/md/lock-open';
import CloseIcon from 'react-icons/lib/md/lock-outline';

export default function doorSensor({data, color}) {
  const active = data ? data.value === 0 : false
  return <div className={active?'sensor--active':''}>
    <div className="sensor__icon">
      {active ? <OpenIcon/> : <CloseIcon/>}
    </div>
    <div className="sensor__label">
      {active?'Drzwi otwarte':'Drzwi zamknięte'}
    </div>
  </div>;
}
