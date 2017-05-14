import React, {PureComponent} from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
  // etc.
} from 'react-router-dom';
import {connect} from "react-redux";
import {Alert} from 'reactstrap';
import Navbar from "./Navbar.js";
import Notes from "./Notes.js";
import Sensors from "./Sensors.js";
import Dashboard from "./views/Dashboard.js";
import Menu from "./views/Menu.js";

class NotesApp extends PureComponent {
  render() {
    let {notification} = this.props;
    return <Router basename="/panel/">
      <div className="client-area">
        <Navbar/>
        {notification.message ? <Alert color={notification.type} style={{marginTop: '0.75rem'}}>
            {notification.message}
          </Alert> : null}
        <div>
          <Route exact path="/" component={() => {
              return <Redirect to="/dashboard" />;
          }
          }/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/menu" component={Menu}/>
          <Route exact path="/notes" component={Notes}/>
          <Route exact path="/sensors" component={Sensors}/>
        </div>
      </div>
    </Router>;
  }
}

NotesApp = connect(
  (state) => {
    return {
      notification: state.ui.notification
    }
  }
)(NotesApp);

export default NotesApp;
