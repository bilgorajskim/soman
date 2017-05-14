import React from 'react';
import {Treebeard} from 'react-treebeard';
import {merge} from 'lodash/object';

const styles = {
  tree: {
    base: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 10px',
        display: 'block',
        borderRadius: '10px'
      },
      activeLink: {
        background: '#0275d8',
        color: 'white'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#222',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: 'blue'
      }
    }
  }
};

export default class SensorList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: this._buildTree(props.level, props.zones, true)
    };
    this.onToggle = this.onToggle.bind(this);

  }

  _buildTree(level, zones, resetSelection = false) {
    let tree = {};
    tree = {
      name: level.name,
      children: zones.map(zone => makeChild(zone))
    };
    if (resetSelection)
    {
      tree.toggled = false;
    }

    function makeChild(zone) {
      let child = {
        name: zone.name,
        children: zone.sensors.map(sensor => {
        return {
          name: sensor.name
        }
        })
      };
      if (resetSelection)
      {
        child.toggled = false;
      }
      return child;
    }

    return tree;
  }

  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  componentWillReceiveProps(props) {
    this.setState({
    data: merge(this.state.data, this._buildTree(props.level, props.zones, false))
    });
  }

  render(){
    const decorators = {
      Loading: (props) => {
        return (
          <div style={props.style}>
            loading...
          </div>
        );
      },
      Toggle: (props) => {
        return (
          <div style={props.style}>
            <svg height={props.height} width={props.width}>
            </svg>
          </div>
        );
      },
      Header: (props) => {
        return (
          <div style={props.style}>
            {props.node.name}
          </div>
        );
      },
      Container: (props) => {
        return (
          <div onClick={this.props.onClick}>
            {props.decorators.Toggle}
            {props.decorators.Header}
          </div>
        );
      }
    };
    return (
      <Treebeard
        data={this.state.data}
        onToggle={this.onToggle}
        style={styles}
      />
    );
  }
}
