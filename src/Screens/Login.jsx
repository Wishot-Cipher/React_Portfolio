import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // User sign-in successful
      console.log("User signed in:", user);

      // Redirect to user details page
      navigate("/");
    } catch (error) {
      // Sign-in failed, display error message
      console.error("Sign-in error:", error);
      toast.error("Login failed. Please check your credentials.");
    }

    setEmail("");
    setPassword("");
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      // Logged out successfully
      setLoggedIn(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      // User signed in with Google
      setLoggedIn(true);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      toast.success("Login successful!");
    }
  }, [loggedIn]);

  return (
    <>
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Login</h2>
            <ol>
              <li><Link to={"/"}> Home </Link></li>
              <li>Login</li>
            </ol>
          </div>
        </div>
      </section>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={6} md={8}>
            <div className="text-center">
              <h2>Login</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="email"
                className="form-control mt-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                type="password"
                className="form-control mt-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="btn btn-primary mt-3">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Button variant="secondary" onClick={handleLogOut}>
                {loggedIn ? "Logged In" : "Logged Out"}
              </Button>
            </div>
            <div className="text-center mt-3">
              <Button onClick={signInWithGoogle} className="btn btn-primary">
                Login with Google
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};
