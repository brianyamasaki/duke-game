import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        Tiles
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/game">Game</NavItem>
        <NavItem href="/about-us">About</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;