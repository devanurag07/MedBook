import React, { Component } from 'react';
import Particles from 'react-particles-js';
class PP extends Component {
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
                                <h1>Privacy & Policy</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="page-content"><section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <p>Impulsion Technologies Private Limited (“us”, “we”, or “Mymedbook”, which also includes its affiliates) is the author and publisher of the internet resource www.mymedbook.com (“Website”) on the world wide web as well as the software and applications provided by Mymedbook, including but not limited to the web application ‘Mymedbook’, and the software and applications of the brand names.</p>
                                <p>This privacy policy ("privacy policy") explains how we collect, use, share, disclose and protect personal information about the users of the services, including the practitioners (as defined in the terms of use, which may be accessed via the following weblink <a href="https://mymedbook.com/privacy" target="_blank">Privacy policy</a> (the “terms of use”)), the end-users (as defined in the terms of use), and the visitors of website (jointly and severally referred to as “you” or “users” in this privacy policy). we created this privacy policy to demonstrate our commitment to the protection of your privacy and your personal information. your use of and access to the services is subject to this privacy policy and our terms of use. any capitalized term used but not defined in this privacy policy shall have the meaning attributed to it in our terms of use.</p>
                                <p>by using the services or by otherwise giving us your information, you will be deemed to have read, understood and agreed to the practices and policies outlined in this privacy policy and agree to be bound by the privacy policy. you hereby consent to our collection, use and sharing, disclosure of your information as described in this privacy policy. we reserve the right to change, modify, add or delete portions of the terms of this privacy policy, at our sole discretion, at any time. if you do not agree with this privacy policy at any time, do not use any of the services or give us any of your information. if you use the services on behalf of someone else (such as your child) or an entity (such as your employer), you represent that you are authorised by such individual or entity to (i) accept this privacy policy on such individual’s or entity’s behalf, and (ii) consent on behalf of such individual or entity to our collection, use and disclosure of such individual’s or entity’s information as described in this privacy policy.</p>
                                <p>Generally some of the Services require us to know who you are so that we can best meet your needs. When you access the Services, or through any interaction with us via emails, telephone calls or other correspondence, we may ask you to voluntarily provide us with certain information that personally identifies you or could be used to personally identify you. You hereby consent to the collection of such information by Mymedbook. Without prejudice to the generality of the above, information collected by us from you may include (but is not limited to) the following</p>
                                {/* <h4 className="mt-5 text-primary">Personal Information</h4> */}
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Contact data (such as your email address and phone number)</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Demographic data (such as your gender, your date of birth and your pin code)</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Data regarding your usage of the services and history of the appointments made by or with you through the use of Services</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Insurance data (such as your insurance carrier and insurance plan)</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Other information that you voluntarily choose to provide to us (such as information shared by you with us through emails or letters</p>
                                </div>
                                <p className="mt-5">The information collected from you by Mymedbook may constitute ‘personal information’ or ‘sensitive personal data or information’ under the SPI Rules</p>
                                <h4 className="mt-5 text-primary">Personal Information,</h4>
                                <p>is defined under the SPI Rules to mean any information that relates to a natural person, which, either directly or indirectly, in combination with other information available or likely to be available to a body corporate, is capable of identifying such person.</p>
                                <h4 className="mt-5 text-primary">The SPI Rules further define “Sensitive Personal Data or Information” of a person to mean personal information about that person relating to.</h4>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Passwords</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Financial information such as bank accounts, credit and debit card details or other payment instrument details</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Physical, physiological and mental health condition</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Sexual orientation</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Medical records and history</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Biometric information</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="badge-primary-soft rounded p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <p className="mb-0 ms-3">Information received by body corporate under lawful contract or otherwise, visitor details as provided at the time of registration or thereafter and call data records
</p>
                                </div>
                                <p className="mt-5 mb-0">Mymedbook will be free to use, collect and disclose information that is freely available in the public domain without your consent.</p>
                            </div>
                        </div>
                    </div>
                </section></div>
            </React.Fragment>
        );
    }
}

export default PP;