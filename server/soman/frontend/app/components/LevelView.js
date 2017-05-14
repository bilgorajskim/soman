import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Row, Col, Card, CardTitle, CardBlock, Button, Form, FormGroup, Label, Input, ButtonGroup} from 'reactstrap';
import tinycolor from 'tinycolor2';
import {pusher} from './../pusher.js';
import API from './../../api/index.js';
import SensorList from './SensorList.js';
import ThreeLevelView from './ThreeLevelView.js';

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
        zones: true
      },
      zones: [],
      sensors: [],
      level: null
    };
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
    setInterval(async () => {
      let latestEvents = await API.sensors.getLatestEvents()
      latestEvents.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      let newZones = this.state.zones.map(zone => {
        let sensors = zone.sensors.map(sensor => {
          let event = latestEvents.find(event => event.sensor_id === sensor.id);
          if (event) {
            return {
              ...sensor,
              event
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
    }, 3000);
    window.logState = () => {
      console.log(this.state);
    };
    this._loadDataForLevel(this.props.level);
  }

  _loadDataForLevel(level) {
    API.zones.getZones({level: level.id}).then((zones) => {
      this.setState({
        zones
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps);
    this._loadDataForLevel(nextProps.level);
  }

  render() {
    let toggles = this.state.toggles;
    let currentLevel = this.props.level;
    let use3d = this.props.use3d;

    let zones = this.state.zones;
    let sensorList = <SensorList
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
              case 'water_level':
                renderedSensor = require('./sensors/WaterLevel.js').default;
                break;
              case 'motion':
                renderedSensor = require('./sensors/Motion.js').default;
                break;
              case 'light':
                renderedSensor = require('./sensors/Light.js').default;
                break;
              case 'smoke':
                renderedSensor = require('./sensors/Smoke.js').default;
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

    return <div>
      <Row>
        <Col md={12} lg={3}>
          <CardTitle>Czujniki</CardTitle>
          {sensorList}
        </Col>
        <Col md={12} lg={9}>
          <div className="blueprint-controls">
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
            </Form>
          </div>
          {blueprint}
        </Col>
      </Row>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelView);
