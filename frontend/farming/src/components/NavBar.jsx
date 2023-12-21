import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function NavBar(){
  const [user, setUser] = useState(null)
  const logOut = async() =>{
    let response = await api.post('user/logout/')
    if(response.status === 204){
     localStorage.removeItem('token')
     delete api.defaults.headers.common['Authorization']
     setUser(null)
    }
 }
 
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">Farming Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="animals/">Animals</Nav.Link>
              <Nav.Link as={Link} to="crops/">Crops</Nav.Link>
              <Nav.Link as={Link} to="farms/">Farms</Nav.Link>
            </Nav>
            <button onClick={() => logOut()}>LogOut</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};