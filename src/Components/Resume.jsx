import React from 'react'
import { Container } from 'react-bootstrap'

export const Resume = () => {
  return (
      <section id="resume" className="resume section-bg">
        {/* <!-- ======= Resume Section ======= --> */}
    <Container>
      <div className="container">

        <div className="section-title">
          <h2>Resume</h2>
          <p>Talented frontend web developer adept at contributing to a higher collaborative work environment,
              finding solution and determining customer satisfaction. Designed and developed web application across multiple APIs,
               third-party integrations and database. Passionate and hardworking with penchant for building frontend projects that
                factor in unique demand for accessibility, reachability and security.</p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <h3 className="resume-title">Summary</h3>
            <div className="resume-item pb-0">
              <h4>Alom Wisdom (Wishot)</h4>
              <p><em>Innovative and deadline-driven Web developer with 2+ years of experience in developing and optimizing web application for maximum speed and scalability. Co-operating with
                  other back-end developers and product managers in solving web problems.</em></p>
              <p>
              <ul>
                <li>Enugu Nigeria</li>
                <li>(+234) 810-544-4154</li>
                <li>wishotstudio@gmail.com</li>
              </ul>
              </p>
            </div>

            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Web development</h4>
              <h5>2018 - 2021</h5>
              <p><em>Digital Dreams Academy, Enugu, Nigeria </em></p>
              <p><b> Relevant Coursework:</b> Working with programming language(s) and it's framework, database management system ,
                  building APIs,designind and modifying static web page, identifying and fixing bugs, deployment and management.  </p>
            </div>
            <div className="resume-item">
              <h4> Science &amp; Computer basics</h4>
              <h5>2012 - 2018</h5>
              <p><em>National Grammar School, Enugu, Nigeria</em></p>
              <p> Worked on variety of assignments and leading in a group projects, completed research under proper supervision
                  and in collaboration with teachers.</p>
            </div>
          </div>
          <div className="col-lg-6">
            <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>Freelancer</h4>
              <h5>2021 - Present</h5>
              <p>
              <ul>
                <li>Worked on 3 different projects under pressure to meet the customer deadline.</li>
                <li>Collaborating with some back-end and front-end developers on database & chosen architecture, using tools like
                    <b> Bash, Git & automated tests.</b></li>
                <li>Built APIs used by front-end developers to build projects.</li>
                <li>Creating and deploying interactive and mobile friendly application using <b>HTML, CSS, JAVASCRIPT OR REACT library.</b></li>
                <li> Analyzing the client side performance of a webpage to improve the consumer experience</li>
                <li>Able to identity problems and solved/debugged the issues with limited time .</li>

              </ul>
              </p>
            </div>
            <div className="resume-item">
              <h4>web development Tutor </h4>
              <h5>2020 - 2022</h5>
            {/* <p><em>Stepping Stone Advertising, New York, NY</em></p> */}
              <p>
              <ul>
                <li>tutored several developers on Css, Javascript and python(flask), online classes inclusive</li>
                <li>Fostered student commitment to lifelong learning by showing them the importance of self improvement </li>
                <li>Recommended and consulted with web development enthusiast on the most appropriate language to learn</li>
                <li>Worked with student to build a telegram airdrop bot, which the receiver will perform some task before gaining a spot</li>
              </ul>
              </p>
            </div>
          </div>
        </div>

      </div>
    </Container>
    {/* <!-- End Resume Section --> */}
    </section>
  )
}
