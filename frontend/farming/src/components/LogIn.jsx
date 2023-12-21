import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const LogIn = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const logIn = async (e) => {
      e.preventDefault();
      try {
        let response = await api.post("user/login/", {
          username: username,
          password: password,
        });
        if (response.status === 200) {
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
          navigate("/home", {replace:true});
          window.location.reload();
        } else {
          setError("Invalid credentials");
        }
      } catch (error) {
        setError("Something went wrong");
      }
    };
  
    return (
      <Form onSubmit={(e) => logIn(e)}>
        <h4>Log In</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
        </Form.Group>
        <Button type="submit">Log In</Button>
      </Form>
    );
  };
  
  export default LogIn;
  