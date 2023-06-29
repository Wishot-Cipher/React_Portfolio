import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpDown, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



export const Footer = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleBackToTop = () => {
        if (window.scrollY > 100) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleBackToTop);
      return () => {
        window.removeEventListener('scroll', toggleBackToTop);
      };
    }, []);
  
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

  return (
    <div>
          <footer id="footer">
                <div className="container">
                <div className="copyright">
                    &copy; <Link to={"/posts"}><b> 2023 Wishot.</b>. </Link> All Rights Reserved <b><Link to={"/login"}> .. </Link></b>
                </div>
                </div>
      </footer>  {/* <!-- End  Footer --> */}

     <a href="#" className={`back-to-top d-flex align-items-center justify-content-center ${isActive ? 'active' : ''}`}  onClick={handleScrollToTop}> <i><FontAwesomeIcon icon={faUpLong}/></i></a>
    </div>
  )
}
