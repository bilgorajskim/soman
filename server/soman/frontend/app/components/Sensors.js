import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Row, Col, Card, CardTitle, CardBlock, Button, Form, FormGroup, Label, Input, ButtonGroup} from 'reactstrap';
import API from './../../api/index.js';
import LevelView from './LevelView.js';
import ThreeLevelView from './ThreeLevelView.js';

class Sensors extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      levels: [],
      currentLevel: null
    };
  }

  componentDidMount() {
    API.levels.getLevels().then((levels) => {
      console.info('loaded levels', levels);
      this.setState({
        levels
      });
      if (levels.length) {
        this._changeLevel(levels[0].id);
      }
    });
  }

  _changeLevel(levelId) {
    this.setState({
      currentLevel: levelId
    });
  }

  render() {
    let currentLevel = this.state.levels.find(l => this.state.currentLevel == l.id);

    let levelView = null;
    if (currentLevel) {
      levelView = <LevelView level={currentLevel} use3d={this.state.use3d} />;
    }

    return <div>
      <div style={{textAlign: 'center'}}>
        <ButtonGroup>
        {this.state.levels.map(level => (
          <Button key={level.id}
                  onClick={() => {
                    this.setState({currentLevel: level.id})
                  }}
                  color={this.state.currentLevel == level.id ? 'primary' : 'secondary'}>{level.name}</Button>
        ))}
        </ButtonGroup>
      </div>
      {levelView}
    </div>;
  }
}

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

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sensors);
