import React from 'react'
import Slider from 'react-slick'
import image1 from "../assets/me.jpg"
import image2 from "../assets/aka-testi.jpg"
import image3 from "../assets/hero-bg.jpg"
import image4 from "../assets/daniel.jpg"
import image5 from "../assets/testi.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRightAlt } from '@fortawesome/free-solid-svg-icons';

export const Testimonials = () => {
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
    {/* <!-- ======= Testimonials Section ======= --> */}
        <section id="testimonials" className="testimonials section-bg">
        <div className="container">

            <div className="section-title">
                <h2>Testimonials</h2>
                <p>These are <b>testimonies </b> from some satisfied clients and developers I have worked with .</p>
            </div>
            <Slider {...settings}>
                <div className="testimonial-item">
                    <p>
                    <i className='quote-icon-left'><FontAwesomeIcon icon={faQuoteLeft}/></i>
                    He always deals with time and very understanding when working with him, he's intelligent and love learning new stuffs.
                    <i className=" quote-icon-right"><FontAwesomeIcon icon={faQuoteRightAlt}/></i>
                    </p>
                    <img src={image1} class="testimonial-img" alt=""/>
                    <h3>Cakahal Johnson</h3>
                    <h4>Fullstack Dev.</h4>
                </div> 
                {/*<!-- End testimonial item --> */}
                <div class="testimonial-item">
                    <p>
                    <i className='quote-icon-left'><FontAwesomeIcon icon={faQuoteLeft}/></i>
                    Have worked with him on a private project(s) and I must say he has a good communication skills and delivers early.
                    <i className=" quote-icon-right"><FontAwesomeIcon icon={faQuoteRightAlt}/></i>
                    </p>
                    <img src={image4} class="testimonial-img" alt="testimonial Image 2"/>
                    <h3>Daniel onyia</h3>
                   <h4>Frontend Dev.</h4>
                </div> 
                {/*<!-- End testimonial item --> */}
                <div class="testimonial-item">
                    <p>
                    <i className='quote-icon-left'><FontAwesomeIcon icon={faQuoteLeft}/></i>
                    Built a telegram airdrop bot for me and I must say he's good at what he does, still making use of the telegram airdrop bot.
                    <i className=" quote-icon-right"><FontAwesomeIcon icon={faQuoteRightAlt}/></i>
                    </p>
                    <img src={image3} class="testimonial-img" alt="testimonial Image 2"/>
                    <h3>Chibuike Ozume</h3>
                    <h4>Crypto Trader</h4>
                </div>
                 {/*<!-- End testimonial item --> */}
                <div class="testimonial-item">
                    <p>
                    <i className='quote-icon-left'><FontAwesomeIcon icon={faQuoteLeft}/></i>
                    He's my teacher/tutor, he always brakes things to the level of my understanding, I really love how he teach and helps me <i className=" quote-icon-right"><FontAwesomeIcon icon={faQuoteRightAlt}/></i>
                    </p>
                    <img src={image5} class="testimonial-img" alt="testimonial Image 2"/>
                    <h3>Anugo Ogenyi</h3>
                    <h4>Student</h4>
                </div>
                 {/*<!-- End testimonial item --> */}
                 {/*<!-- End testimonial item --> */}
                <div class="testimonial-item">
                    <p>
                    <i className='quote-icon-left'><FontAwesomeIcon icon={faQuoteLeft}/></i>
                    He has a good debugging skill and have been maintaining my family website for a while, the site is up and running
                    <i className=" quote-icon-right"><FontAwesomeIcon icon={faQuoteRightAlt}/></i>
                    </p>
                    <img src={image2} class="testimonial-img" alt="testimonial Image 2"/>
                    <h3>Alom Christain</h3>
                    <h4>Client</h4>
                </div>
                 {/*<!-- End testimonial item --> */}
            </Slider>
        </div>
        </section>
    </div>
  )
}
