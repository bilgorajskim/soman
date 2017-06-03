import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ZoneIcon from 'material-ui/svg-icons/maps/place';
import SensorIcon from 'material-ui/svg-icons/hardware/memory';
import Subheader from 'material-ui/Subheader';

export default class SensorList extends React.Component {

  render() {
    return (
      <div>
          <List>
            <Subheader>Czujniki</Subheader>
            {this.props.zones.map(z =>
              <ListItem
                    key={z.id}
                    primaryText={z.name}
                    open={true}
                    leftIcon={<ZoneIcon />}
                    nestedItems={z.sensors.map(s =>
                      <ListItem key={s.id} primaryText={s.name}
                      onClick={() => {
                        console.log('clicked on', s)
                        this.props.onSensorClick(s)
                      }}
                                leftIcon={<SensorIcon />}
                      />,
                    )}
                  />
              )}
          </List>
      </div>
    );
  }
}
