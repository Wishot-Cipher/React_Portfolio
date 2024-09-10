import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/login.css"; // Add a custom CSS file for any additional styling

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
            <Link to={"/register"}><h2>Login</h2></Link>
            <ol>
              <li><Link to={"/"}>Home</Link></li>
              <li>Login</li>
            </ol>
          </div>
        </div>
      </section>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={6} md={8}>
            <div className="text-center">
              <h2 className="login-heading">Welcome Back!</h2>
              <p className="text-muted mb-4">Login to your account</p>
            </div>
            <Form onSubmit={handleSubmit} className="login-form shadow p-4">
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  className="form-control mt-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  className="form-control mt-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary btn-block mt-3 w-100">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Button variant="secondary" className="w-100" onClick={handleLogOut}>
                {loggedIn ? "Log Out" : "Not Logged In"}
              </Button>
            </div>
            <div className="text-center mt-3">
              <Button onClick={signInWithGoogle} className="btn btn-outline-primary w-100">
                <i className="fab fa-google"></i> Login with Google
              </Button>
            </div>
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-muted">Forgot Password?</Link>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};
