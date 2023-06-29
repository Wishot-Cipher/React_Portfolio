import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

export const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, 'portfolioProjects', projectId);
        const projectSnapshot = await getDoc(projectRef);

        if (projectSnapshot.exists()) {
          setProject({ id: projectSnapshot.id, ...projectSnapshot.data() });
        } else {
          console.log('Project not found');
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ClipLoader size={50} color={'#123abc'} loading={true} />
    </div>
    
    );
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  const deletePost = async (id) => {
    console.log('Deleting post:', id); // Check if the function is executed and the ID value
    const projectDoc = doc(db, 'portfolioProjects', id);
    console.log('Project document:', projectDoc); // Check if the document reference is valid
    await deleteDoc(projectDoc);
    navigate('/');
  };

  const settings = {
    dots: true,
    isFinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };


  return (
    <div>
      <main id="main">
        {/* <!-- ======= Breadcrumbs Section ======= --> */}
        <section class="breadcrumbs">
          <div class="container">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Portfolio Details</h2>
              <ol>
                <li><a href="{{url_for('home')}}">Home</a></li>
                <li>Portfolio Details</li>
              </ol>
            </div>
          </div>
        </section>
        {/* <!-- Breadcrumbs Section --> */}
        {/* <!-- ======= Portfolio Details Section ======= --> */}
        <section id="portfolio-details" class="portfolio-details">
          <div class="container">
            <div class="row gy-4">
              <div class="col-lg-8">
                <div class="portfolio-details-slider swiper">
                  <div class="swiper-wrapper align-items-center">
                    <Slider {...settings}>
                      {project.images.map((image, index) => (
                        <div key={index} class="swiper-slide">
                          <img src={image} alt={`project image ${index + 1}`} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div class="swiper-pagination"></div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="portfolio-info">
                  <h3>Project information</h3>
                  <ul>
                    <li><strong>Category</strong>: {project.category}</li>
                    <li><strong>Client</strong>: {project.client}</li>
                    <li><strong>Project date</strong>: {project.projectDate}</li>
                    <li><strong>Project URL</strong>: <a href={project.projectURL}>View {project.name}</a></li>
                  </ul>
                </div>
                <div class="portfolio-description">
                  <h2>Detail</h2>
                  <p>{project.body}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Portfolio Details Section --> */}
        <footer id="footer">
          <div className="container">
            <div className="copyright">
              &copy; <b onClick={() => deletePost(project.id)}> 2023 Wishot.</b>. All Rights Reserved..
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

