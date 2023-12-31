import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

 export const Details = () => {
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
              <li>
                <Link to={"/"}> Home </Link>
              </li>
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
                  <div class="swiper-wrapper align-items-center sliderBody">
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
              <div class="col-lg-4 infoBody">
                <div class="portfolio-info">
                  <h3>Project information</h3>
                  <ul className=''>
                    <li className='listContainer'><strong>Category:</strong> <p> {project.category} </p></li>
                    <li className='listContainer'><strong>Client:</strong> <p>{project.client}</p></li>
                    <li className='listContainer'><strong>Project date:</strong> <p>{project.projectDate}</p></li>
                    <li className='listContainer'><strong>Project URL:</strong> <p><a href={project.projectURL}>View {project.name}</a></p></li>
                  </ul>
              </div>
                </div>
                <div class="portfolio-description">
                  <h2>Detail</h2>
                  <div> 
                    <b>Introduction:</b>
                    <p>{project.introBody}</p>
                  </div>
                  <div> 
                    <b>Conclusion:</b>
                    <p>{project.concludeBody}</p>
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


