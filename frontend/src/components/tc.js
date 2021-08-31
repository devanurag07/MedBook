import React, { Component } from 'react';
import Particles from 'react-particles-js';
class TC extends Component {
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
                                <h1>Terms and Conditions</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="page-content">
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <p className="mb-3">Impulsion Technologies Private Limited, on behalf of itself and its affiliates/group companies under the brand "Mymedbook" (“Mymedbook”), is the author and publisher of the internet resource www.Mymedbook.com and the mobile application ‘Practo’ (together, “Website”). Mymedbook owns and operates the services provided through the Website.</p>
                                    <h4 className="text-primary">1. NATURE AND APPLICABILITY OF TERMS</h4>
                                    <p className="mb-3">Please carefully go through these terms and conditions (“Terms”) and the privacy policy available at https://www.mymedbook.com/privacy (“Privacy Policy”) before you decide to access the Website or avail the services made available on the Website by Mymedbook. These Terms and the Privacy Policy together constitute a legal agreement (“Agreement”) between you and Practo in connection with your visit to the Website and your use of the Services (as defined below)</p>
                                    <h4 className="text-primary mt-5">The Agreement applies to you whether you are </h4>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">A medical practitioner or health care provider (whether an individual professional or an organization) or similar institution wishing to be listed, or already listed, on the Website, including designated, authorized associates of such practitioners or institutions (“Practitioner(s)”, “you” or “User”);</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">A patient, his/her representatives or affiliates, searching for Practitioners through the Website (“End-User”, “you” or “User”)</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">Otherwise a user of the Website (“you” or “User”).
This Agreement applies to those services made available by Mymedbook on the Website, which are offered free of charge to the Users (“Services”), including the following
</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">For Practitioners: Listing of Practitioners and their profiles and contact details, to be made available to the other Users and visitors to the Website</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">For other Users: Facility to (i) create and maintain ‘Health Accounts’, (ii) search for Practitioners by name, specialty, and geographical area, or any other criteria that may be developed and made available by Mymedbook, and (iii) to make appointments with Practitioners</p>
                                    </div>
                                    <p className="mb-3">The Services may change from time to time, at the sole discretion of Practo, and the Agreement will apply to your visit to and your use of the Website to avail the Service, as well as to all information provided by you on the Website at any given point in time</p>
                                    <p className="mb-3">This Agreement defines the terms and conditions under which you are allowed to use the Website and describes the manner in which we shall treat your account while you are registered as a member with us. If you have any questions about any part of the Agreement, feel free to contact us at support@mymedbook.com</p>
                                    <p className="mb-3">By accessing the Website to use the Services, you irrevocably accept all the conditions stipulated in this Agreement, the Subscription Terms of Service and Privacy Policy, as available on the Website, and agree to abide by them. This Agreement supersedes all previous oral and written terms and conditions (if any) communicated to you relating to your use of the Website to avail the Services. By availing any Service, you signify your acceptance of the terms of this Agreement.</p>
                                    <p className="mb-3">We reserve the right to modify or terminate any portion of the Agreement for any reason and at any time, and such modifications shall be informed to you in writing You should read the Agreement at regular intervals. Your use of the Website following any such modification constitutes your agreement to follow and be bound by the Agreement so modified</p>
                                    <p className="mb-3">You acknowledge that you will be bound by this Agreement for availing any of the Services offered by us. If you do not agree with any part of the Agreement, please do not use the Website or avail any Services</p>
                                    <p className="mb-3">Your access to use of the Website and the Services will be solely at the discretion of Mymedbook</p>
                                    <p className="mb-3">The Agreement is published in compliance of, and is governed by the provisions of Indian law, including but not limited to</p>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The Indian Contract Act, 1872</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The (Indian) Information Technology Act, 2000, and the rules, regulations, guidelines and clarifications framed there under, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “SPI Rules”), and the (Indian) Information Technology (Intermediaries Guidelines) Rules, 2011 (the “IG Rules”)
</p>
                                    </div>
                                    <h4 className="text-primary mt-5"> CONDITIONS OF USE</h4>
                                    <p className="mb-3">You must be 18 years of age or older to register, use the Services, or visit or use the Website in any manner. By registering, visiting and using the Website or accepting this Agreement, you represent and warrant to Mymedbook that you are 18 years of age or older, and that you have the right, authority and capacity to use the Website and the Services available through the Website, and agree to and abide by this Agreement.</p>
                                    <h4 className="text-primary mt-5">TERMS OF USE APPLICABLE TO ALL USERS OTHER THAN PRACTITIONERS</h4>
                                    <p className="mb-3">The terms in this Clause 3 are applicable only to Users other than Practitioners.</p>
                                    <h5 className="text-primary mt-5">END-USER ACCOUNT AND DATA PRIVACY</h5>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The terms “personal information” and “sensitive personal data or information” are defined under the SPI Rules, and are reproduced in the Privacy Policy</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">Mymedbook may by its Services, collect information relating to the devices through which you access the Website, and anonymous data of your usage. The collected information will be used only for improving the quality of Mymedbook services and to build new services</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The Website allows Mymedbook to have access to registered Users’ personal email or phone number, for communication purpose so as to provide you a better way of booking appointments and for obtaining feedback in relation to the Practitioners and their practice</p>
                                    </div>
                                    <h5 className="text-primary mt-5">The Privacy Policy sets out, inter-alia</h5>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The type of information collected from Users, including sensitive personal data or information</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The purpose, means and modes of usage of such information</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">How and to whom Mymedbook will disclose such information and other information mandated by the SPI Rules
</p>
                                    </div>
                                    <h4 className="text-primary mt-5">The User is expected to read and understand the Privacy Policy, so as to ensure that he or she has the knowledge of, inter-alia</h4>
                                    <div className="d-flex align-items-center">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The fact that certain information is being collected</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The purpose for which the information is being collected</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The intended recipients of the information</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The nature of collection and retention of the information and v.	the name and address of the agency that is collecting the information and the agency that will retain the information.</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge-primary-soft rounded p-1">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <p className="mb-0 ms-3">The various rights available to such Users in respect of such information</p>
                                    </div>
                                    <p className="mb-5">Mymedbook shall not be responsible in any manner for the authenticity of the personal information or sensitive personal data or information supplied by the User to Mymedbook or to any other person acting on behalf of Mymedbook.</p>
                                    <p className="mb-5">The User is responsible for maintaining the confidentiality of the User’s account access information and password, if the User is registered on the Website. The User shall be responsible for all usage of the User’s account and password, whether or not authorized by the User. The User shall immediately notify Mymedbook of any actual or suspected unauthorized use of the User’s account or password. Although Mymedbook will not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of Mymedbook or such other parties as the case may be, due to any unauthorized use of your account.</p>
                                    <p className="mb-5">If a User provides any information that is untrue, inaccurate, not current or incomplete (or becomes untrue, inaccurate, not current or incomplete), or Mymedbook has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, Mymedbook has the right to discontinue the Services to the User at its sole discretion</p>
                                    <p className="">Mymedbook may use such information collected from the Users from time to time for the purposes of debugging customer support related issues</p>
                                </div>
                            </div>
                        </div>
                    </section></div>
            </React.Fragment>
        );
    }
}

export default TC;