import React, { Component } from "react";
import Particles from "react-particles-js";

class AboutUs extends Component {
  svgStyle = {
    height: "100%",
    width: "100%",
  };
  shapeStyle = {
    height: "200px",
    overflow: "hidden",
  };
  strokeStyle = {
    stroke: "none",
    fill: "#fff",
  };

  render() {
    return (
      <React.Fragment>
        <section className="position-relative">
          <Particles
            id="particles-js"
            params={{
              particles: {
                number: {
                  value: 160,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: "#1360ef",
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#f94f15",
                  },
                  polygon: {
                    nb_sides: 5,
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100,
                  },
                },
                opacity: {
                  value: 1,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                    sync: false,
                  },
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 4,
                    size_min: 0.3,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: false,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600,
                  },
                },
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "bubble",
                  },
                  onclick: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 1,
                    },
                  },
                  bubble: {
                    distance: 250,
                    size: 0,
                    duration: 2,
                    opacity: 0,
                    speed: 3,
                  },
                  repulse: {
                    distance: 400,
                    duration: 0.4,
                  },
                  push: {
                    particles_nb: 4,
                  },
                  remove: {
                    particles_nb: 2,
                  },
                },
              },
              retina_detect: true,
            }}
          />
          <div className="container">
            <div className="row  text-center">
              <div className="col">
                <h1>About Us</h1>
                {/* <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center bg-transparent p-0 m-0">
                                        <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a>
                                        </li>
                                        <li className="breadcrumb-item">Pages</li>
                                        <li className="breadcrumb-item">Company</li>
                                        <li className="breadcrumb-item active text-primary" aria-current="page">About Us</li>
                                    </ol>
                                </nav> */}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="pb-11">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-12 col-lg-6 mb-6 mb-lg-0">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <img
                        src="/images/aboutus.png"
                        className="img-fluid rounded shadow-lg"
                        alt="..."
                      />
                    </div>
                    {/* <div className="col-6">
                                            <img src="/assets/images/about/11.jpg" className="img-fluid rounded shadow-lg mb-5" alt="..." />
                                            <img src="/assets/images/about/13.jpg" className="img-fluid rounded shadow-lg" alt="..." />
                                        </div> */}
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-5">
                  <div>
                    {" "}
                    <span className="badge badge-primary-soft p-2 font-w-6">
                      About Medbook
                    </span>
                    <p className="lead mt-3">
                      We are a group of passionate team, we believe in
                      empowering people with the most accurate, comprehensive,
                      and curated information to enable them to make better
                      healthcare decisions and store there valuable and
                      sensitive data for future health treatments which is hard
                      to track and understand and be made available for future
                      treatments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-12 mb-2">About our team</div>
                <div className="col-12 col-lg-12 col-xl-12">
                  <div className="accordion" id="accordion">
                    <div className="accordion-item mb-4">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button border mb-0 bg-transparent rounded text-dark"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Who are we?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse border-0 collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body text-muted">
                          India is a nation with more than 135Cr people with
                          less than 20L doctors. Each doctor works uniquely with
                          their patients. And for long term sustainable
                          practice, not only is the doctor-patient bond
                          important but it is important that doctors don’t get
                          overworked due to non-medical reasons like tracking,
                          redundant prescription and many more practices.
                        </div>
                        <div className="accordion-body text-muted">
                          We understand this need and behaves like an extension
                          of each of of them. Allowing technology to streamline
                          day-to-day issues like administration and finances, it
                          adapts to each and every doctor’s specific problems.
                          That too in a simple and doctor-friendly manner.
                        </div>
                        <div className="accordion-body text-muted">
                          Now, doctors can concentrate completely on their
                          practice while their extension, Doctors, manages their
                          practice for them.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button border mb-0 bg-transparent rounded text-dark collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Vision and Mission
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse border-0 collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body text-muted">
                          Our Vision is to see health care records on the
                          blockchain opensource which is not tied up with any
                          uniquely identifiable information of a person, yet
                          made easy to access for future treatments of a
                          particular individual based on the past medication he
                          has been taking.
                        </div>
                        <div className="accordion-body text-muted">
                          Mission is to identify most common type of health
                          diseases and the practices going on in the market and
                          help people understand the reason behind it and best
                          practices keeping everything opensource and secure at
                          the same time easy to access who can benefit with a
                          unique health stamp through the course of live even if
                          he is attending multiple doctors for various reasons
                          for various health issues.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button border mb-0 bg-transparent rounded text-dark collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Data privacy and security is our top priority
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse border-0 collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body text-muted">
                          Data privacy and security has always served as one of
                          the founding philosophies of Mymedbook, and we go to
                          great lengths to safeguard the confidentiality and
                          integrity of our user.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-4 col-lg-4 mb-8 mb-lg-0">
                  <div className="px-4 py-7 rounded hover-translate text-center bg-white shadow">
                    <div>
                      <img
                        className="img-fluid"
                        src="/assets/images/svg/01.svg"
                        alt=""
                      />
                    </div>
                    <h5 className="mt-4 mb-3">Customer journey</h5>
                    <p>Ensures seamless customer journey & experience.</p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-sm-6">
                  <div className="px-4 py-7 rounded hover-translate text-center bg-white shadow">
                    <div>
                      <img
                        className="img-fluid"
                        src="/assets/images/svg/02.svg"
                        alt=""
                      />
                    </div>
                    <h5 className="mt-4 mb-3">Performance</h5>
                    <p>Optimizes Staff Performance & Productivity.</p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-sm-6 mt-6 mt-sm-0">
                  <div className="px-4 py-7 rounded hover-translate text-center bg-white shadow">
                    <div>
                      <img
                        className="img-fluid"
                        src="/assets/images/svg/03.svg"
                        alt=""
                      />
                    </div>
                    <h5 className="mt-4 mb-3">24*7 support</h5>
                    <p>Get support on whatsapp 24*7.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default AboutUs;
