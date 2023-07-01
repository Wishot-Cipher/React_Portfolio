import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../config/firebase';
import { collection, query, orderBy, startAfter, limit, getDocs } from 'firebase/firestore';
import { Filter } from './Filter';
import { Link } from 'react-router-dom';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/css';
import ClipLoader from 'react-spinners/ClipLoader';

export const PortfolioProjects = () => {
  const [project, setProject] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeSection, setActiveSection] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const projectCollectionRef = collection(db, 'portfolioProjects');

  const getProjectList = async () => {
    try {
      const q = query(projectCollectionRef, orderBy('createdAt', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProject(data);
      setIsLoading(false);
      updateFilteredData(data, currentPage, activeSection);
      setTotalPages(Math.ceil(data.length / 5));
    } catch (error) {
      console.error(error);
    }
  };

  const updateFilteredData = (data, page, section) => {
    const start = (page - 1) * 5;
    const end = start + 5;
    let filteredData = data;
    if (section !== 'all') {
      filteredData = data.filter((post) => post.section === section);
    }
    setFiltered(filteredData.slice(start, end));
    setTotalPages(Math.ceil(filteredData.length / 5));
    if (currentPage > Math.ceil(filteredData.length / 5)) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    getProjectList();
  }, []);

  useEffect(() => {
    updateFilteredData(project, currentPage, activeSection);
  }, [currentPage, activeSection]);

  const getFirstImage = (images) => {
    if (images && images.length > 0) {
      return images[0];
    }
    return null;
  };

  const override = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (section) => {
    setActiveSection(section);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* <!-- ======= Portfolio Section ======= --> */}
      <section id="portfolio" className="portfolio section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
            <p>
              These are some projects I have worked on using the languages listed above, click to see more details about
              a particular project.
            </p>
          </div>
          <Filter
            project={project}
            setFiltered={setFiltered}
            activeSection={activeSection}
            setActiveSection={handleFilterChange}
          />

          <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="row portfolio-container"
          >
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '20vh',
                }}
              >
                <ClipLoader size={40} color={'#123abc'} loading={true} />
              </div>
            ) : (
              <AnimatePresence>
                {filtered.map((post) => (
                  <motion.div
                    layout
                    key={post.id}
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="col-lg-4 col-md-6 portfolio-item filter-app"
                  >
                    <div className="portfolio-wrap">
                      <img src={getFirstImage(post.images)} className="img-fluid" alt="" />
                      <div className="portfolio-info">
                        <h4>{post.name}</h4>
                        <p>{post.title}</p>
                        <Link to={`/projects/${post.id}`}>
                          <i className="linkFont">
                            <FontAwesomeIcon icon={faLink} />
                          </i>
                        </Link>
                      </div>
                      <div className="portfolio-links">
                        <a href="../static/assets/img/portfolio/MyTodo.png" data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 1">
                          <i className="bx bx-plus"></i>
                        </a>
                        <a href="" title="More Details">
                          <i className="bx bx-link"></i>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
       <div className="d-flex justify-content-center mt-4">
      {totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={currentPage === 1 ? 'disabled' : ''}>
              <button onClick={() => handlePageChange(currentPage - 1)} className="page-link">
                Previous
              </button>
            </li>
            {Array.from(Array(totalPages), (_, index) => (
              <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`page-link ${currentPage === index + 1 ? 'active-page' : ''}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={currentPage === totalPages ? 'disabled' : ''}>
              <button onClick={() => handlePageChange(currentPage + 1)} className="page-link">
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
        </div>
      </section>
    </div>
  );
}