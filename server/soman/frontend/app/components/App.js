import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import NotesApp from './NotesApp';

class App extends PureComponent {
  render() {
    return <NotesApp/>;
  }

  componentDidMount() {
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
)(App);
