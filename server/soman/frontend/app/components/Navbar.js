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
        <nav className="navbar navbar-toggleable-md navbar-light client-area__navbar">
          <Container>
            <NavbarToggler onClick={this.toggleNavbar}/>
            <NavbarBrand href="/" className="ml-2">
              SOMAN
            </NavbarBrand>
            <Collapse className="navbar-collapse" isOpen={!this.state.collapsed}>
              <ul className="navbar-nav mr-auto">
                <NavLink to={`/dashboard`} className="nav-link">
                  Przegląd
                </NavLink>
                <NavLink to={`/menu`} className="nav-link">
                  Jadłospis
                </NavLink>
                <NavLink to={`/notes`} className="nav-link">
                  Ogłoszenia
                </NavLink>
                <NavLink to={`/sensors`} className="nav-link">
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
