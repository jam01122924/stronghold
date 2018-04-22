import React from 'react';
import './header.component.css';
import { Link } from 'react-router-dom'
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
              <NavItem eventKey={1} href="/"><Link to="/" className="header-link">Home</Link></NavItem>
              <NavItem eventKey={2} href="/trips"><Link to="/trips" className="header-link">trip</Link></NavItem>
              <NavDropdown eventKey={3} title="enter" id="entertainmentDropDown">
                <MenuItem eventKey={3.1} href="/entertainment/model">航模</MenuItem>
                <MenuItem eventKey={3.2} href="/entertainment/frisbee">飞碟</MenuItem>
                <MenuItem eventKey={3.3} href="/entertainment/food">美食</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.5} href="/entertainment/others">其他</MenuItem>
              </NavDropdown>
              <NavItem eventKey={4} href="/game"><Link to="/game" className="header-link">test</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
