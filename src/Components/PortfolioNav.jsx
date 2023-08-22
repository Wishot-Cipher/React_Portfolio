import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import logo1 from '../assets/WishotLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered} from '@fortawesome/free-solid-svg-icons';


export const PortfolioNav = () => {
  const [active, setActive] = useState(false);
  const [activeLiLink, setActiveLiLink] = useState('')
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setActive(false);
    }
  };
  
   const showMenu = () => {
    setActive(!active)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active]);

  return (
    <>
      {/* <Container fluid> */}
      <div className='header'>
        <div className='largeSc'>
            <div className='logo'>
              <img src={logo1} height={50} alt='logo' /><h2>Wishot</h2>
            </div>
          <div className='showmenu' onClick={showMenu}> 
            <FontAwesomeIcon icon={faBarsStaggered} />
          </div>
        </div>
        <nav className={active ? 'slider active' : 'slider'} ref={ref}>
          <div className='logoLx'>
          <img src={logo1} height={50} alt='logo' className='LogoImg' /><h2>Wishot</h2>
          </div>
          <ul>
            <li className='menu'> <div className="logo logoLi"><img src={logo1} height={40} alt="logo"/> <h2>Wishot</h2></div> </li>
              <ScrollLink
                // activeClass='activate'
                onSetActive={() => setActiveLiLink("hero")}
                to='hero'
                spy={true}
                smooth={true}
                offset={-20}
                duration={70}
                onClick={showMenu}
                className='scrollLink'
                style={{ color : 'white !important'}}
                >
                  <li className={activeLiLink === "hero" ? "activate" : ""}>
                   Home
                </li>
              </ScrollLink>
              <ScrollLink
                onSetActive={() => setActiveLiLink("about")}
                to='about'
                spy={true}
                smooth={true}
                offset={-20}
                duration={70}
                onClick={showMenu}
                className='scrollLink'
                >
                  <li  className={activeLiLink === "about" ? "activate" : ""}>
                    About
                 </li>
              </ScrollLink>
              <ScrollLink
                onSetActive={() => setActiveLiLink("resume")}
                to='resume'
                spy={true}
                smooth={true}
                offset={-20}
                duration={70}
                onClick={showMenu}
                className='scrollLink'
                >
                <li  className={activeLiLink === "resume" ? "activate" : ""}>
                    Resume
                 </li>
              </ScrollLink>
              <ScrollLink
                onSetActive={() => setActiveLiLink("services")}
                to='services'
                spy={true}
                smooth={true}
                offset={-20}
                duration={70}
                onClick={showMenu}
                className='scrollLink'
                >
                <li  className={activeLiLink === "services" ? "activate" : ""}>
                    Services
                 </li>
              </ScrollLink>
              <ScrollLink
                onSetActive={() => setActiveLiLink("portfolio")}
                to='portfolio'
                spy={true}
                smooth={true}
                offset={-20}
                duration={70}
                onClick={showMenu}
                className='scrollLink'
                >
                <li  className={activeLiLink === "portfolio" ? "activate" : ""}>
                    Portfolio
                 </li>
              </ScrollLink>
              <ScrollLink
                onSetActive={() => setActiveLiLink("contact")}
                to='contact'
                spy={true}
                smooth={true}
                offset={-20}
                duration={70}
                onClick={showMenu}
                className='scrollLink'
                >
                <li  className={activeLiLink === "contact" ? "activate" : ""}>
                   Contact
                 </li>
              </ScrollLink>
          </ul>
        </nav>
      </div>
      {/* </Container> */}
    </>
  );
};
