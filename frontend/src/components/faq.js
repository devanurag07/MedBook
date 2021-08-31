import React, { Component } from 'react';
import Particles from 'react-particles-js';
class FAQ extends Component {
    svgStyle = {
        height: '100%', width: '100%'
    }
    shapeStyle = {
        height: '200px', 'overflow': 'hidden'
    }
    strokeStyle = {
        stroke: 'none', fill: '#fff'
    }
    render() {
        return (
            <React.Fragment>
                <section className="position-relative">
                    <Particles id="particles-js" params={{
                        "particles": {
                            "number": {
                                "value": 160,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#1360ef"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#f94f15"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 1,
                                "random": true,
                                "anim": {
                                    "enable": true,
                                    "speed": 1,
                                    "opacity_min": 0,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 4,
                                    "size_min": 0.3,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": false,
                                "distance": 150,
                                "color": "#ffffff",
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 1,
                                "direction": "none",
                                "random": true,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 600
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "bubble"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "repulse"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 250,
                                    "size": 0,
                                    "duration": 2,
                                    "opacity": 0,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 400,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    }} />
                    <div className="container">
                        <div className="row  text-center">
                            <div className="col">
                                <h1>Frequently Asked Questions</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="page-content"><section>
                    <div className="container">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-12 col-lg-6 mb-8 mb-lg-0">
                                <img src="/images/7774.jpg" alt="Image" className="img-fluid" />
                            </div>
                            <div className="col-12 col-lg-6 col-xl-5">
                                <div className="accordion" id="accordion">
                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button border mb-0 bg-transparent rounded text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                What is mymedbook?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse border-0 collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
                                            <div className="accordion-body text-muted">Mymedbook is one place to manage all your patients.</div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button border mb-0 bg-transparent rounded text-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                is 60 days free trail available?
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse border-0 collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
                                            <div className="accordion-body text-muted">Yes.</div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button border mb-0 bg-transparent rounded text-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Does it send direct message when we add customers to queue?
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse border-0 collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
                                            <div className="accordion-body text-muted">Yes.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                    <section>
                        <div className="container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-12 col-lg-6 mb-8 mb-lg-0 order-lg-1">
                                    <img src="/images/10593.jpg" alt="Image" className="img-fluid" />
                                </div>
                                <div className="col-12 col-lg-6 col-xl-5">
                                    <div className="accordion" id="accordion2">
                                        <div className="accordion-item mb-4">
                                            <h2 className="accordion-header" id="headingFour">
                                                <button className="accordion-button border mb-0 bg-transparent rounded text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                                    Is there any additional charges for sending direct messages?
                                                </button>
                                            </h2>
                                            <div id="collapseFour" className="accordion-collapse border-0 collapse show" aria-labelledby="headingFour" data-bs-parent="#accordion2">
                                                <div className="accordion-body text-muted">No.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section></div>
            </React.Fragment>
        );
    }
}

export default FAQ;