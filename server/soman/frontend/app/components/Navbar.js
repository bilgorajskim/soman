import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Collapse, Container, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let {auth} = this.props;
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded client-area__navbar">
          <Container>
            <NavbarToggler onClick={this.toggleNavbar}/>
            <NavbarBrand href="/" className="ml-2">
              <img src="/static/images/favicon.ico" alt=""/>
            </NavbarBrand>
            <Collapse className="navbar-collapse" isOpen={!this.state.collapsed}>
              <ul className="navbar-nav mr-auto">
                <NavLink exact to={`/dashboard`} className="nav-link" activeClassName="active">
                  Przegląd
                </NavLink>
                <NavLink exact to={`/menu`} className="nav-link" activeClassName="active">
                  Jadłospis
                </NavLink>
                <NavLink exact to={`/notes`} className="nav-link" activeClassName="active">
                  Ogłoszenia
                </NavLink>
                <NavLink to={`/sensors`} className="nav-link" activeClassName="active">
                  Czujniki
                </NavLink>
              </ul>
              {auth ? <form className="form-inline">
                <button className="btn btn-secondary" type="submit" onClick={(event) => {
                  event.preventDefault();
                  document.getElementById('logout-form').submit();
                }
                }>
                  Wyloguj się
                </button>
              </form> : <a href="/accounts/login" className="btn btn-secondary">
                  Zaloguj się
                </a>}
            </Collapse>
          </Container>
        </nav>
      </div>
    );
  }
}

Navbar = connect(state => {
  return {
    auth: state.account.authenticated
  };
}, {})(Navbar);

export default Navbar;
