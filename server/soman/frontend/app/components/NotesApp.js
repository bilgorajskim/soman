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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Footer from './Footer'

class NotesApp extends PureComponent {
  render() {
    let {notification} = this.props;
    return <MuiThemeProvider>
      <Router basename="/panel/">
        <div>
          <Navbar/>
          {notification.message ? <Alert color={notification.type} style={{marginTop: '0.75rem'}}>
            {notification.message}
          </Alert> : null}
          <Route exact path="/" component={() => {
              return <Redirect to="/dashboard" />;
          }
          }/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/menu" component={Menu}/>
          <Route path="/notes" component={Notes}/>
          <Route path="/sensors" component={Sensors}/>
          <Footer />
        </div>
      </Router>
    </MuiThemeProvider>
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
