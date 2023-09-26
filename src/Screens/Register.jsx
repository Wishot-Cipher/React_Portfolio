import React, { useState } from "react";
import { auth, googleAuthProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import image from "../assets/register.jpg";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        role: "user",
      });

      toast.success("Registration successful!");

      navigate("/");
    } catch (error) {
      toast.error("An error occurred. Please try again.");

      console.error(error);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Portfolio Details</h2>
            <ol>
              <li>
              <li>
                <Link to={"/"}> Home </Link></li>
              </li>
              <li>Portfolio Details</li>
            </ol>
          </div>
        </div>
      </section>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={6} md={8}>
            <div className="text-center">
              <h2>Sign Up</h2>
            </div>
            <Form onSubmit={handleSignUp}>
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
              <Form.Control
                type="password"
                className="form-control mt-3"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Form.Control
                type="text"
                className="form-control mt-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button type="submit" className="btn btn-primary mt-3">
                Sign Up
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Button onClick={signInWithGoogle} className="btn btn-primary">
                Sign In Using Google
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-right" />
    </>
  );
};
