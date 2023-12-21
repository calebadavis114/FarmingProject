import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("user/signup/", {
        email: email,
        password: password,
        username: username,
        name: name,
      });
      console.log(response)

      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.token}`;
        navigate("home");
        window.location.reload();
      } else {
        // Display a user-friendly error message
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Display a user-friendly error message
      alert("Something went wrong. Please try again later.");
    } finally {
      // Clear input fields regardless of success or failure
      setEmail("");
      setPassword("");
      setUsername("");
      setName("");
    }
  };

  return (
    <Form onSubmit={(e) => signUp(e)}>
      <h4>Sign Up</h4>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
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
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="John Doe"
        />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUp;

