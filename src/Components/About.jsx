import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faClock, faFaceSmile, faLaptopCode} from '@fortawesome/free-solid-svg-icons'


export const About = () => {
  return (
    <Container>
            {/* <!-- ======= About Section ======= --> */}
        <section id="about" className="about">
        <div className="container">

            <div className="row no-gutters">
            <div className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-lg-start"></div>
            <div className="col-xl-7 ps-0 ps-lg-5 pe-lg-1 d-flex align-items-stretch">
                <div className="content d-flex flex-column justify-content-center" style={{padding :10}}>
                <h3>Experience Summary</h3>
                <p>
                    This is a summary of some of my experience being a web developer, scroll down for more clarity.
                </p>
                <div className="row">
                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                      <i><FontAwesomeIcon icon={faFaceSmile}/></i>
                        <span data-purecounter-start="0" data-purecounter-end="7" data-purecounter-duration="1" className="purecounter">10</span>
                        <p><strong>Happy Clients</strong> who received our services with thanks .</p>
                    </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                        <i><FontAwesomeIcon icon={faLaptopCode}/></i>
                        <span data-purecounter-start="0" data-purecounter-end="9" data-purecounter-duration="1" className="purecounter">8</span>
                        <p><strong>Projects</strong> delivered to clients.</p>
                    </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                        <i><FontAwesomeIcon icon={faClock}/></i>
                        <span data-purecounter-start="0" data-purecounter-end="2" data-purecounter-duration="1" className="purecounter"  > 2<b>+</b></span>
                        <p><strong>Years of experience</strong>  working with the web.</p>
                    </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                        <i><FontAwesomeIcon icon={faAward}/></i>
                        <span data-purecounter-start="0" data-purecounter-end="2" data-purecounter-duration="1" className="purecounter">2</span> 
                        <p><strong>Awards</strong> gotten from project(s) done.</p>
                    </div>
                    </div>
                </div>
                </div>  {/*<!-- End .content--> */}
            </div>
            </div>
        </div>
        </section>
            {/* <!-- End About Section --> */}
  </Container>
  )
}
