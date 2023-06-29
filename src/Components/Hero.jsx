import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

export const Hero = () => {
  return (
    <div>
     {/* <!-- ======= Hero Section ======= --> */}
        <section id="hero" className="d-flex flex-column align-items-center justify-content-center">
            <h1>Hi, I'm Wisdom!</h1>
            <h2> I am a <b>Frontend</b> web Developer</h2>
            <a href="#about" className="btn-get-started scrollto"> <i className="bi bi-chevron-double-down"> <FontAwesomeIcon icon={faChevronCircleDown}/> </i></a>
        </section>
       {/* <!-- End Hero --> */}

    </div>
  )
}
