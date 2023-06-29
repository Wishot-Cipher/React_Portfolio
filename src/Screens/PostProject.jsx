
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { db, storage } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const FetchingDataTest = () => {
  const [projectList, setProjectList] = useState([]);
  // project form state
  const [newProject, setNewProject] = useState({
    title: '',
    body: '',
    section: 'app',
    name: '',
    images: [],
    category: '',
    client: '',
    projectDate: '',
    projectURL: '',
  });

  const navigate = useNavigate();

  const projectCollectionRef = collection(db, 'portfolioProjects');

  const getProjectList = async () => {
    try {
      const data = await getDocs(projectCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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

      const uploadPromises = uploadTasks.map((uploadTask) =>
        new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Calculate the upload progress percentage
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

              // Update the progress bar element
              const progressBar = document.getElementById('progressBar');
              progressBar.style.width = `${progress}%`;
              progressBar.innerHTML = `${progress}%`;

              // Add some cool Bootstrap styles to the progress bar
              progressBar.classList.add('progress-bar-striped');
              progressBar.classList.add('bg-success');
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
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
      };

      await addDoc(projectCollectionRef, newProjectData);
      navigate('/');
      getProjectList();

      // Clear the input fields
      setNewProject({
        title: '',
        body: '',
        section: 'app',
        name: '',
        images: [],
        category: '',
        client: '',
        projectDate: '',
        projectURL: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProject((prevState) => ({ ...prevState, images: files }));
  };

  return (
    <div>
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
          <Col lg={8} md={7}>
            <h1>Post Recent Project</h1>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="ProjectBody"
                rows={10}
                placeholder="Project Body"
                className="mt-3"
                value={newProject.body}
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, body: e.target.value }))}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Project Header"
                required
                value={newProject.title}
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, title: e.target.value }))}
                className="mt-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Project Name"
                required
                value={newProject.name}
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, name: e.target.value }))}
                className="mt-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="select"
                name="section"
                value={newProject.section}
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, section: e.target.value }))}
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
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, category: e.target.value }))}
                className="mt-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Client"
                value={newProject.client}
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, client: e.target.value }))}
                className="mt-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Project Date"
                value={newProject.projectDate}
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, projectDate: e.target.value }))}
                className="mt-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Project URL"
                value={newProject.projectURL}
                onChange={(e) => setNewProject((prevState) => ({ ...prevState, projectURL: e.target.value }))}
                className="mt-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control type="file" required onChange={handleImageChange} className="mt-3" multiple />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-3">
                Submit
              </Button>
            </div>
            <div className="progress">
              <div id="progressBar" className="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


