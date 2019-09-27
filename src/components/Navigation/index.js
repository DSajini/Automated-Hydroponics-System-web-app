import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

import ReactBootstrap, {Navbar, NavDropdown, Nav, Form, FormControl, Button} from 'react-bootstrap';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationNonAuth = () => (
  


<Navbar bg="dark" variant="dark">
<Navbar.Brand href="#home">Autoponics</Navbar.Brand>
<Nav className="mr-auto">
  
  <Nav.Link href="/signin">Sign In</Nav.Link>
</Nav>
  
 

</Navbar>

);



const NavigationAuth = () => (
  
<Navbar bg="dark" variant="dark">
<Navbar.Brand align="center" href="#home">Smartponics</Navbar.Brand>
<Nav className="mr-auto">
  
  
  
</Nav>
 
 

</Navbar>

);

export default Navigation;
