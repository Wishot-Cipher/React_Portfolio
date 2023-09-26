import React, { useEffect, useState } from "react";
import notFound from "../assets/notFound.jpeg"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { auth, db, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const PostProject = () => {
  const [projectList, setProjectList] = useState([]);
  const [user] = useAuthState(auth);
  const [newProject, setNewProject] = useState({
    title: "",
    introBody: "",
    concludeBody: "",
    section: "app",
    name: "",
    images: [],
    category: "",
    client: "",
    projectDate: "",
    projectURL: "",
  });

  const navigate = useNavigate();

  const projectCollectionRef = collection(db, "portfolioProjects");

  const getProjectList = async () => {
    try {
      const data = await getDocs(projectCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjectList(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const uploadTasks = newProject.images.map((image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        return uploadTask;
      });

      const uploadPromises = uploadTasks.map(
        (uploadTask) =>
          new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Calculate the upload progress percentage
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // Update the progress bar element
                const progressBar = document.getElementById("progressBar");
                progressBar.style.width = `${progress}%`;
                progressBar.innerHTML = `${progress}%`;

                // Add some cool Bootstrap styles to the progress bar
                progressBar.classList.add("progress-bar-striped");
                progressBar.classList.add("bg-success");
              },
              (error) => {
                console.error(error);
                reject(error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  resolve(downloadURL);
                } catch (error) {
                  console.error(error);
                  reject(error);
                }
              }
            );
          })
      );

      const downloadURLs = await Promise.all(uploadPromises);

      const newProjectData = {
        ...newProject,
        images: downloadURLs,
        createdAt: serverTimestamp(),
      };

      await addDoc(projectCollectionRef, newProjectData);
      navigate("/");
      getProjectList();

      // Clear the input fields
      setNewProject({
        title: "",
        introBody: "",
        concludeBody: "",
        section: "app",
        name: "",
        images: [],
        category: "",
        client: "",
        projectDate: "",
        projectURL: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProject((prevState) => ({ ...prevState, images: files }));
  };

  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <>
      <div>
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Portfolio Details</h2>
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Portfolio Details</li>
              </ol>
            </div>
          </div>
        </section>

        {user && (
          <Container>
            <Row className="justify-content-md-center">
              <Col lg={8} md={7}>
                <h1>Post Recent Project</h1>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    name="ProjectBody"
                    rows={8}
                    placeholder="Project Introduction.."
                    className="mt-3"
                    value={newProject.introBody}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        introBody: e.target.value,
                      }))
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    as="textarea"
                    name="ProjectBody"
                    rows={8}
                    placeholder="Project Conclusion.."
                    className="mt-3"
                    value={newProject.concludeBody}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        concludeBody: e.target.value,
                      }))
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Project Header"
                    required
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                    className="mt-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Project Name"
                    required
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    className="mt-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    as="select"
                    name="section"
                    value={newProject.section}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        section: e.target.value,
                      }))
                    }
                    className="mt-3"
                  >
                    <option value="app">App</option>
                    <option value="api">Api</option>
                    <option value="others">Others</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                    className="mt-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Client"
                    value={newProject.client}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        client: e.target.value,
                      }))
                    }
                    className="mt-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Project Date"
                    value={newProject.projectDate}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        projectDate: e.target.value,
                      }))
                    }
                    className="mt-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Project URL"
                    value={newProject.projectURL}
                    onChange={(e) =>
                      setNewProject((prevState) => ({
                        ...prevState,
                        projectURL: e.target.value,
                      }))
                    }
                    className="mt-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="file"
                    required
                    onChange={handleImageChange}
                    className="mt-3"
                    multiple
                  />
                </Form.Group>

                <div className="progress mt-2">
                  <div
                    id="progressBar"
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "0%" }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                    className="mt-3"
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        )}
        {!user && (
          <Container>
            <div>
              <div className="min-vh-90 d-flex flex-column justify-content-center align-items-center">
                <div className="flex-grow d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={notFound}
                    alt="Page not found"
                    className="w-100 mw-80 h-auto"
                  />
                </div>
              </div>
            </div>
          </Container>
        )}
      </div>
    </>
  );
};
