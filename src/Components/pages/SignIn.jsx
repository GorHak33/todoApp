import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { signIn } from "../../Redux/SignInOutSlice/signInOutSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      dispatch(signIn(formData));
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Sign In</h2>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Sign In
        </Button>
      </Form>
      <p>
        Click to <Link to={"/registration"}>register</Link>
      </p>
    </Container>
  );
};

export default SignInPage;
