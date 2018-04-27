import React from 'react';
import './header.component.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class Header extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="header-container">
        <Navbar inverse collapseOnSelect className="header-bar">
          <Navbar.Header>
            <Navbar.Brand className="header-brand">
              <a href="/">COMPANY LOGO</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/">Home</NavItem>
              <NavItem eventKey={2} href="/trips">trip</NavItem>
              <NavDropdown eventKey={3} title="enter" id="entertainmentDropDown">
                <MenuItem eventKey={3.1} href="/entertainment/model">航模</MenuItem>
                <MenuItem eventKey={3.2} href="/entertainment/frisbee">飞碟</MenuItem>
                <MenuItem eventKey={3.3} href="/entertainment/food">美食</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.5} href="/entertainment/others">其他</MenuItem>
              </NavDropdown>
              <NavItem eventKey={4} href="/game">test</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
