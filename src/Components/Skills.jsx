import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import html from "../../src/assets/html.png"
import cssImg from "../../src/assets/css.png"
import git from "../../src/assets/gitpng.png"
import react from "../../src/assets/react2.png"
import tailwind from "../../src/assets/tailwind.png"
import javascript from "../../src/assets/javascript.png"
import flask from "../../src/assets/flask.png"
import fastApi from "../../src/assets/fastApi.png"


export const Skills = () => {


  return (
    <section id="skills" className="skills section-bg">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
          <p>These are skills I possess and use in building my projects.</p>
        </div>

        <div className="row skills-content m-auto d-flex justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="p-2">
                <Button className="bg-light">
                  <img src={html} alt="HTML Icon" className="icon" />
                  {/* HTML5 */}
                </Button>
              </div>

              <div className="p-2">
                <Button className="bg-light">
                  <img src={cssImg} alt="CSS Icon" className="icon" />
                </Button>
              </div>

              <div className="p-2">
                <Button className="skills section-bg">
                  <img
                    src={tailwind}
                    alt="JavaScript Icon"
                    className="icon"
                  />
                </Button>
              </div>

              <div className="p-2">
                <Button className="skills section-bg">
                  <img src={react} alt="React Icon" className="icon" />
                </Button>
              </div>
              <div className="p-2">
                <Button className="skills section-bg">
                  <img src={javascript} alt="React Icon" className="icon" />
                </Button>
              </div>

              <div className="p-2">
                <Button className="skills section-bg">
                  <img src={git} alt="Git Icon" className="icon" />
                </Button>
              </div>

              <div className="p-2 pt-4">
                <Button className="skills section-bg">
                  <img
                    src={flask}
                    alt="Python Icon"
                    className="icon"
                  />
                </Button>
              </div>

              <div className="p-2 pt-4">
                <Button className="skills section-bg">
                  <img
                    src={fastApi}
                    alt="FastAPI Icon"
                    className="icon"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
