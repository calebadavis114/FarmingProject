import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { api } from './utilities';
import RegisterPage from './pages/RegisterPage';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function App() {
  const [farmCrops, setFarmCrops] = useState([])
  const [farmAnimals, setFarmAnimals] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [tok, setToken] = useState ();
  const [inFarm, setInFarm] = useState(false)

const logOut = async() =>{
   let response = await api.post('user/logout/')
   if(response.status === 204){
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
   }
}

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        let token = localStorage.getItem('token');
        if (token) {
          console.log(token)
          api.defaults.headers.common['Authorization'] = `Token ${token}`;
          let response = await api.get('user/');
          setUser(response.data);
          setToken(token)
          console.log(user)
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        setUser(null)
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
    return (
      <>
      {user ? (
        <div>
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
        <h3>Welcome {user.username || 'Guest'}</h3>
        <Outlet context={{ user, setUser, farmCrops, setFarmCrops, farmAnimals, setFarmAnimals, tok, setToken, inFarm, setInFarm }} />
        </div>) :(
          <RegisterPage />
        )}
      </>
    );
}

export default App;


