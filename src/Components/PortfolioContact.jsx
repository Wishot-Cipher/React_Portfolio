import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationPin, faMobilePhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export const PortfolioContact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false); // Loading state

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    emailjs
      .sendForm('service_u00b3tn', 'template_047gtf8', form.current, 'HpuZKIZp4jW55MT8K')
      .then((result) => {
        console.log(result.text);
        toast.success('Email sent successfully!', { autoClose: 3000 });
        setLoading(false); // Set loading to false when submission is complete
      })
      .catch((error) => {
        console.log(error.text);
        toast.error('Failed to send email!', { autoClose: 3000 });
        setLoading(false); // Set loading to false in case of error
      });

    e.target.reset();
  };

  return (
    <div>
      {/* Contact Section */}
      <section id="contact" className="contact section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Contact</h2>
            <p>
              For more information about us or when in need of our services, please do good to send us an email using
              the form below. Am also open to work be it remotely or non-remotely.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="contact-about">
                <h3>Wishot</h3>
                <p>
                  Click on the link below to access our social media handles and connect with us.
                </p>
                <div className="social-links">
                  <a href="https://mobile.twitter.com/wishotstudio" className="twitter">
                    <i><FontAwesomeIcon icon={faTwitter} /></i>
                  </a>
                  <a href="https://www.facebook.com/wisdom.alom.3" className="facebook">
                    <i><FontAwesomeIcon icon={faFacebookF} /></i>
                  </a>
                  <a href="https://github.com/Wishot-Cipher" className="instagram">
                    <i><FontAwesomeIcon icon={faGithub} /></i>
                  </a>
                  <a href="https://www.linkedin.com/in/wisdom-alom-3a2033242" className="linkedin">
                    <i><FontAwesomeIcon icon={faLinkedin} /></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <div className="info">
                <div className="d-flex align-items-center">
                  <i><FontAwesomeIcon icon={faLocationPin} /></i>
                  <p>Enugu State<br />Nigeria</p>
                </div>

                <div className="d-flex align-items-center mt-4">
                  <i><FontAwesomeIcon icon={faEnvelope} /></i>
                  <p>wishotstudio@gmail.com</p>
                </div>

                <div className="d-flex align-items-center mt-4">
                  <i><FontAwesomeIcon icon={faMobilePhone} /></i>
                  <p>+234 8105 444 154</p>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-8">
              <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="form-group mt-3">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                </div>
                <div className="form-group mt-3">
                  <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};
