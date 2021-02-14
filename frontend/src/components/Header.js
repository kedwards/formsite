import React from "react";
import defineAbilitiesFor from "../utils/can";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../redux/actions/user";

import logo from "../images/DLLogo450.png";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const ability = defineAbilitiesFor(userInfo);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const hrStyle = { border: "10px solid #0099CC" };

  return (
    <header>
      <Navbar bg='light' expand='lg' collapseonselect='true' className='mb-1'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={logo}
                width='113'
                height='30'
                className='d-inline-block align-top'
                alt='Dynalife Medical Labs'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/form'>
                    <NavDropdown.Item>Forms</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FontAwesomeIcon icon='user' /> {""}
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo &&
                (userInfo.isAdmin ||
                  userInfo.isManager ||
                  userInfo.isOhs ||
                  userInfo.isSysAdmin) && (
                  <NavDropdown
                    title={
                      userInfo.isAdmin
                        ? "Admin"
                        : userInfo.isManager
                        ? "Manager"
                        : userInfo.isOhs
                        ? "OHS"
                        : null
                    }
                    id='adminmenu'
                  >
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>My Team</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/formlist'>
                      <NavDropdown.Item>Forms</NavDropdown.Item>
                    </LinkContainer>
                    {ability.can("read", "Dashboard") && (
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                    )}
                  </NavDropdown>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={hrStyle} />
    </header>
  );
};
export default Header;
