import React, { Component } from 'react';
import Particles from 'react-particles-js';

class ContactUs extends Component {
    componentDidMount() {
        /* jQuery("#particles-js").each(function () {
            particlesJS({
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
            });
        }) */
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
                                <h1>Contact Us</h1>
                                {/* <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center bg-transparent p-0 m-0">
                                        <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a>
                                        </li>
                                        <li className="breadcrumb-item">Pages</li>
                                        <li className="breadcrumb-item">Contacts</li>
                                        <li className="breadcrumb-item active text-primary" aria-current="page">Contact Us</li>
                                    </ol>
                                </nav> */}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-content">
                    <section>
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-lg-4 col-md-12">
                                    <div>
                                        <svg className="feather feather-map-pin" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#1360ef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        <h4 className="mt-5">Address:</h4>
                                        <span className="text-dark">Bengaluru, Karnataka, India</span>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div>
                                        <svg className="feather feather-mail" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#1360ef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        <h4 className="mt-5">Email Us</h4>
                                        <a href="mailto:impulsionindia@gmail.com"> impulsionindia@gmail.com</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div>
                                        <svg className="feather feather-phone-call" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#1360ef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        <h4 className="mt-5">Phone Number</h4>
                                        <a href="tel:+912345678900">+91 70197 69933</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <section>
                        <div className="container">
                            <div className="row justify-content-center mb-5 text-center">
                                <div className="col-12 col-lg-8">
                                    <div> <span className="badge badge-primary-soft p-2">
                                        <i className="la la-bold ic-3x rotation"></i>
                                    </span>
                                        <h2 className="mt-4 mb-0">Drop A Line</h2>
                                        <p className="lead mb-0">Get in touch and let us know how we can help. Fill out the form and we’ll be in touch as soon as possible.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center text-center">
                                <div className="col-12 col-lg-10">
                                    <form id="contact-form" className="row" method="post" action="php/contact.php">
                                        <div className="messages"></div>
                                        <div className="form-group col-md-6">
                                            <input id="form_name" type="text" name="name" className="form-control" placeholder="First Name" required="required" data-error="Name is required." />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input id="form_name1" type="text" name="name" className="form-control" placeholder="Last Name" required="required" data-error="Name is required." />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input id="form_email" type="email" name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input id="form_phone" type="tel" name="phone" className="form-control" placeholder="Phone" required="required" data-error="Phone is required" />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <select className="form-select form-control">
                                                <option>- Select Service</option>
                                                <option>Consulting</option>
                                                <option>Finance</option>
                                                <option>Marketing</option>
                                                <option>Avanced Analytics</option>
                                                <option>planning</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input id="form_subject" type="tel" name="subject" className="form-control" placeholder="Subject" required="required" data-error="Subject is required" />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <textarea id="form_message" name="message" className="form-control" placeholder="Message" rows="3" required="required" data-error="Please,leave us a message."></textarea>
                                            <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="col-md-12 text-center mt-4">
                                            <button className="btn btn-primary"><span>Send Messages</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </section> */}
                </div>
            </React.Fragment>
        );
    }
}

export default ContactUs;