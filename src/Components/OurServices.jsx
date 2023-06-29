import React from 'react'
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from 'react-slick'
import { faChalkboardTeacher, faCode, faGlobeAfrica, faRobot} from '@fortawesome/free-solid-svg-icons'

export const OurServices = () => {
    const settings = {
        dots : true,
        isFinite: true,
        speed : 900,
        slidesToShow: 3,
        slidesToScroll : 1,
        autoplay : true,
        responsive: [
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 770,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
           ]
      };
  return (
    <div>
        <section id='services'  className="services section-bg">
        <Container>
            <div className="section-title">
            <h2>Services</h2>
            <p> The following are the services we render, fell free to drop a mail if you are in need of our services,
            we promise to deliver exactly what you need and what will be best for you also we are open to work with companies on their project(s).</p>
            </div>
            <div  className='ServiceCont'>
        <Slider {...settings}>
                <div className="card card1">
                   <h1>01</h1>
                   <div className="round"> <p><FontAwesomeIcon icon={faCode}/></p> </div>
                   <h4 className='title'><a href="#contact">Building Websites</a></h4>
                   <p>
                   We build morden and responsive websites tailored to your business needs, be it blog websites, e-commerce websites, investment websites etc..
                   </p>
                   {/* <h5>Read More</h5> */}
            </div>
            <div className="card card2">
                   <h1>02</h1>
                   <div className="round"> <p><FontAwesomeIcon icon={faChalkboardTeacher}/> </p> </div>
                   <h4 className="title"><a href="#contact">Tutoring</a></h4>
                   <p>
                   Expert tutoring in programming languages to help you build a strong foundation in coding. Subject offered: <b>Html, Css, JavaScript, Python,</b> etc.. 
                   </p>
            </div>
            <div className="card card3">
                   <h1>03</h1>
                   <div className="round"> <p> <FontAwesomeIcon icon={faGlobeAfrica}/> </p> </div>
                   <h4>Top Service Quality</h4>
                   <p>
                   Client satisfaction is at the core of everything we do. We prioritize clear communication, active listening, and a proper Knowledge of our clients' needs.
                   </p>
            </div>
            <div className="card card4">
                   <h1>04</h1>
                   <div className="round"> <p> <FontAwesomeIcon icon={faRobot}/> </p> </div>
                   <h4 className="title"><a href="#contact"> Telegram Airdrop bots</a></h4>
                   <p>
                    We designs Telegram Airdrop Bots with user-friendly interface to streamline your crytocurrency airdrop campaigns & also tracks participant engagement.
                   </p>
            </div>
         </Slider>
         </div> <br /> 
         </Container>
         </section>
    </div>
  )
}
