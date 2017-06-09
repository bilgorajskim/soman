import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Row, Col, Card, CardTitle, CardBlock, Button, Form, FormGroup, Label, Input, ButtonGroup} from 'reactstrap';
import tinycolor from 'tinycolor2';
import API from './../../api/index.js';
import SensorList from './SensorList.js';
import ThreeLevelView from './ThreeLevelView.js';
import EventHistory from './sensors/EventHistory'
import { closeEventHistory, showEventHistory } from '../state/modules/eventHistory'
import CircularProgress from 'material-ui/CircularProgress';

const renderField = ({input, label, type, labelWidth, inputWidth, children}) => {
  if (!labelWidth) labelWidth = 4;
  if (!inputWidth) inputWidth = 8;
  let field = null;
  if (type == 'checkbox') {
    field = <label className="custom-control custom-checkbox">
      <Input {...input} className="custom-control-input" type={type}/>
      <span className="custom-control-indicator"/>
      <span className="custom-control-description">
                     {label}
                    </span>
    </label>;
  }
  else {
    field = <FormGroup row>
      <Label sm={labelWidth}>{label}</Label>
      <Col sm={inputWidth}>
        <Input {...input} placeholder={label} type={type}>
          {children}
        </Input>
      </Col>
    </FormGroup>;
  }
  return field;
};

class LevelView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      toggles: {
        sensors: true,
        blueprint: true,
        zones: true,
        use3d: false
      },
      zones: [],
      sensors: [],
      level: null,
      loaded: false,
      intervals: []
    };
  }

  componentWillUnmount() {
    this.state.intervals.forEach(i => clearInterval(i))
  }

  _toggleLayer(layerName, active) {
    this.setState({
      toggles: {
        ...this.state.toggles,
        [layerName]: active
      }
    });
  }

  componentDidMount() {
    this._loadDataForLevel(this.props.level);
  }

  _updateSensor(sensorId, event) {
    let newZones = this.state.zones.map(zone => {
      let sensors = zone.sensors.map(sensor => {
        if (sensor.id === sensorId) {
          return {
            ...sensor,
            data: event.data,
            updated: true
          }
        }
        return sensor;
      });
      return {
        ...zone,
        sensors
      };
    });
    this.setState({
      ...this.state,
      zones: newZones
    });
  }

  async _loadDataForLevel(level) {
    API.zones.getZones({level: level.id}).then((zones) => {
      this.setState({
        zones
      });
      this.state.zones.forEach(zone => {
        zone.sensors.forEach(sensor => {
          let loadSensor = async () => {
            let events = await API.sensors.getLatestEventsForSensor(sensor.id)
            if (events.length) {
              let latestEvent = events[0]
              this._updateSensor(sensor.id, latestEvent)
            }
            this.setState({
              loaded: true
            })
          }
          this.setState({
            intervals: [
              ...this.state.intervals,
              setInterval(() => loadSensor(), 3000)
            ]
          })
          loadSensor()
        })
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this._loadDataForLevel(nextProps.level);
  }

  render() {
    let toggles = this.state.toggles;
    let currentLevel = this.props.level;
    let use3d = toggles.use3d;

    let zones = this.state.zones;
    let sensorList = <SensorList
      onSensorClick={sensor => {
        this.props.showEventHistory(sensor.id)
      }}
      zones={this.state.zones} level={this.props.level}/>;
    let blueprint = null;

    if (currentLevel) {
      if (use3d) {
        blueprint = <ThreeLevelView zones={this.state.zones} level={this.props.level} />;
      }
      else {
        let svg = <img src={currentLevel.blueprint} alt=""
                       style={{width: '100%', visibility: toggles.blueprint ? 'visible' : 'hidden'}}
                       className="blueprint__drawing"/>;
        let zoneElements = zones.map((zone, i) => {
          let sensorElements = zone.sensors.map((sensor, i) => {
            let renderedSensor = null;
            switch (sensor.type) {
              case 'water':
                renderedSensor = require('./sensors/Water.js').default;
                break;
              case 'motion':
                renderedSensor = require('./sensors/Motion.js').default;
                break;
              case 'smoke':
                renderedSensor = require('./sensors/Smoke.js').default;
                break;
              case 'door':
                renderedSensor = require('./sensors/Door.js').default;
                break;
              case 'temperature':
                renderedSensor = require('./sensors/Temperature.js').default;
                break;
              case 'humidity':
                renderedSensor = require('./sensors/Humidity.js').default;
                break;
              default:
                throw new Error('Unsupported sensor type: ' + sensor.type);
            }

            let y = i * 55;

            return <div style={{position: 'absolute', top: y + 'px', left: '0%'}} key={i} className="sensor">
              {renderedSensor(sensor)}
            </div>;
          });

          return <div style={{
            position: 'absolute',
            top: zone.y + '%',
            left: zone.x + '%',
            width: zone.width + '%',
            height: zone.height + '%',
            lineHeight: zone.height + '%',
            color: tinycolor(zone.color).isDark() ? '#fff' : '#000'
          }} key={i} className="zone">
            <div className="zone__area"
                 style={{
                   background: zone.color
                 }}
            />
            <div className="zone__name">{zone.name}</div>
            <div className="zone__sensors">
              {toggles.sensors ? sensorElements : null}
            </div>
          </div>;
        });

        blueprint = <div className="blueprint">
          {svg}
          {toggles.zones ? zoneElements : null}
        </div>;
      }
    }

    if (!this.state.loaded) {
      return <div style={{margin: '3em 0', textAlign: 'center'}}>
        <CircularProgress size={150} thickness={10} />
      </div>;
    }

    return <div style={{position: 'relative'}}>
      {this.props.historyActive ?
        <EventHistory events={this.props.events} onClose={this.props.closeEventHistory} />
        : null}
      <Row>
        <Col md={12} lg={3}>
          {sensorList}
        </Col>
        <Col md={12} lg={9}>
          <div className="blueprint-controls" style={{marginTop: '1em'}}>
            <Form inline>
              {renderField({
                type: 'checkbox',
                label: 'schemat budynku',
                input: {checked: toggles.blueprint, onChange: e => this._toggleLayer('blueprint', e.target.checked)}
              })}
              {renderField({
                type: 'checkbox',
                label: 'pomieszczenia',
                input: {checked: toggles.zones, onChange: e => this._toggleLayer('zones', e.target.checked)}
              })}
              {renderField({
                type: 'checkbox',
                label: 'sensory',
                input: {checked: toggles.sensors, onChange: e => this._toggleLayer('sensors', e.target.checked)}
              })}
              {renderField({
                type: 'checkbox',
                label: 'widok 3D',
                input: {checked: toggles.use3d, onChange: e => this._toggleLayer('use3d', e.target.checked)}
              })}
            </Form>
          </div>
          {blueprint}
        </Col>
      </Row>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    historyActive: state.eventHistory.modalActive,
    historyEvents: state.eventHistory.events
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    showEventHistory, closeEventHistory
  }};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelView);
