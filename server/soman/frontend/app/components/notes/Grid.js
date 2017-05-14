import React from 'react';
import _ from 'lodash';
import Note from './Note.js';

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  createElement = (el) => {
    return (
      <Note key={el.id} note={el} />
    );
  };

  render() {
    let {items} = this.props;
    console.info(items);

    return (
      <div className="grid">
        {items.map(this.createElement)}
      </div>
    );
  }
}

export default Grid;
