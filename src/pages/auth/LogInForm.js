import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/LogInSignUpForm.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";

function LogInForm() {
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = logInData;

  const history = useHistory();

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  /* 
    Handle submitted in the form data on logging in. Redirect to home page.
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/login/", logInData);
      history.push("/")
    } catch (err) {
    }
  };

  return (
    <Row className="text-center">
      <Col className="my-auto offset-md-2" md={8}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className="mb-4">Log in</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Your username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button 
                className={`my-3 ${appStyles.button}`}
                type="submit"
                onMouseDown={(e) => e.preventDefault()}
            >
              Log in!
            </Button>

            <Link className={styles.Link} to="/signup">
              Don't have an account? Click <span>here </span>to sign up.
            </Link>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default LogInForm;
