import React, { Component } from 'react';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { NavLink } from 'react-router-dom';
class Home extends Component {
    svgStyle = {
        height: '100%', width: '100%'
    }
    shapeStyle = {
        height: '200px', 'overflow': 'hidden'
    }
    strokeStyle = {
        stroke: 'none', fill: '#fff'
    }
    componentDidMount() {
        //this.owlcarousel();
        //this.counter()
    }
    render() {
        return (
            <React.Fragment>
                <section className="top-section">
                    <div className="container">
                        <div className="row align-items-center mt-4">
                            <div className="col-12 col-lg-5 col-lg-6 order-lg-1 mb-8 mb-lg-0">
                                <img src="/assets/images/4990224.png" className="img-fluid" alt="..." />
                            </div>
                            <div className="col-12 col-lg-7 col-xl-6">
                                {/* <h5 className="badge badge-primary-soft font-w-6">Ever Created For</h5> */}

                                <p className="lead text-primary title p-title"><strong>Mymedbook is one place to manage your patients.</strong></p>
                                <p className="sec-li text-muted">Save your patients from frustration, inaccurate wait times, and crowded lobbies. Create a free waitlist for your business with SMS notifications.</p>

                                <NavLink to="/signup" className="btn btn-primary shadow me-1">
                                    Get Started</NavLink>

                                {/*  <OwlCarousel nav loop items={8} margin={8} autoplay={true} className="owl-carousel mt-8 no-pb">
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/07.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/08.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/09.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/10.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/11.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/12.png" alt="" />
                                        </div>
                                    </div>
                                </OwlCarousel> */}
                                {/* <div className="owl-carousel mt-8 no-pb" data-dots="false" data-items="4" data-md-items="4" data-sm-items="3" data-xs-items="2" data-margin="30" data-autoplay="true">
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/07.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/08.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/09.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/10.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/11.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="clients-logo">
                                            <img className="img-fluid" src="/assets/images/client/12.png" alt="" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-content">
                    <section className="text-center p-0">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-6 col-lg-4 mb-8 mb-lg-0">
                                    <div className="px-4 py-7 rounded hover-translate" data-bg-color="rgba(19, 96, 239, 0.01)">
                                        <div>
                                            {/* <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f94f15" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg> */}
                                            <img className="active" src="/img/bulk-sms.svg" alt="logo" />
                                        </div>
                                        <h5 className="mt-4 mb-3">SMS notification</h5>
                                        <p className="mb-0">Your patients will automatically receive sms notification after added to queue.</p>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="px-4 py-7 rounded hover-translate">
                                        <div>
                                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1360ef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square">
                                                <polyline points="9 11 12 14 22 4"></polyline>
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                            </svg>
                                        </div>
                                        <h5 className="mt-4 mb-3">Prescription</h5>
                                        <p className="mb-0">Easily send prescription through sms.</p>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6 mt-6 mt-sm-0">
                                    <div className="px-4 py-7 rounded hover-translate">
                                        <div>
                                            {/* <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1360ef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-wifi">
                                                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                                                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                                                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                                                <line x1="12" y1="20" x2="12" y2="20"></line>
                                            </svg> */}
                                            <img className="img-fluid" src="/assets/images/icon/02.svg" alt="" />
                                        </div>
                                        <h5 className="mt-4 mb-3">Patients health records</h5>
                                        <p className="mb-0">Patients can manage all their health records.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section>
                        <div className="container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-12 col-lg-6 mb-6 mb-lg-0">
                                    <img src="/assets/images/about/03.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="col-12 col-lg-6 col-xl-5">
                                    <div> <span className="badge badge-primary-soft p-2">
                                        <i className="la la-exclamation ic-3x rotation"></i>
                                    </span>
                                        <h2 className="mt-3">We're A Creative Software Landing Page</h2>
                                        <p className="lead">We use the latest technologies it voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-start">
                                        <div className="mb-3 me-4">
                                            <div className="d-flex align-items-center">
                                                <div className="badge-primary-soft rounded p-1">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="mb-0 ms-3">Fully Responsive</p>
                                            </div>
                                        </div>
                                        <div className="mb-3 me-4">
                                            <div className="d-flex align-items-center">
                                                <div className="badge-primary-soft rounded p-1">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="mb-0 ms-3">Based On Bootstrap 4</p>
                                            </div>
                                        </div>
                                        <div className="mb-3 me-4">
                                            <div className="d-flex align-items-center">
                                                <div className="badge-primary-soft rounded p-1">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="mb-0 ms-3">Built with Sass</p>
                                            </div>
                                        </div>
                                        <div className="mb-3 me-4">
                                            <div className="d-flex align-items-center">
                                                <div className="badge-primary-soft rounded p-1">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="mb-0 ms-3">SVG Icon</p>
                                            </div>
                                        </div>
                                    </div> <a href="#" className="btn btn-outline-primary mt-5">
                                        Learn More
              </a>
                                </div>
                            </div>
                        </div>
                    </section> */}
                    <section className="custom-pt-1 custom-pb-2 bg-dark position-relative" data-bg-img="/assets/images/bg/02.png">
                        <div className="container">
                            <div className="row align-items-end">
                                <div className="col-lg-4 col-md-6 mb-8 mb-lg-0 text-white">
                                    <div> <span className="badge badge-primary-soft p-2">
                                        <i className="la la-cubes ic-3x rotation"></i>
                                    </span>
                                        <h2 className="mt-3 mb-0">Why choose Mymedbook?</h2>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="bg-primary-soft rounded p-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="me-3">
                                                <img className="img-fluid" src="/assets/images/icon/01.svg" alt="" />
                                            </div>
                                            <h5 className="m-0 text-light">Reduce wait time</h5>
                                        </div>
                                        <p className="mb-0">Mymedbook will reduce wait time and service time by 50%.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mt-6 mt-md-0">
                                    <div className="bg-primary-soft rounded p-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="me-3">
                                            {/* <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f94f15" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg> */}
                                            <img className="img-fluid" src="/assets/images/icon/02.svg" alt="" />
                                            </div>
                                            <h5 className="m-0 text-light">Customer satisfaction</h5>
                                        </div>
                                        <p className="mb-0">Increases Customer Satisfaction by 30%.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mt-6">
                                    <div className="bg-primary-soft rounded p-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="me-3">
                                                <img className="img-fluid" src="/assets/images/icon/03.svg" alt="" />
                                            </div>
                                            <h5 className="m-0 text-light">Customer journey</h5>
                                        </div>
                                        <p className="mb-0">Ensures seamless customer journey & experience.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mt-6">
                                    <div className="bg-primary-soft rounded p-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="me-3">
                                                <img className="img-fluid" src="/assets/images/icon/04.svg" alt="" />
                                            </div>
                                            <h5 className="m-0 text-light">Performance</h5>
                                        </div>
                                        <p className="mb-0">Optimizes Staff Performance & Productivity.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mt-6">
                                    <div className="bg-primary-soft rounded p-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="me-3">
                                                <img className="img-fluid" src="/assets/images/icon/05.svg" alt="" />
                                            </div>
                                            <h5 className="m-0 text-light">24/7 Support</h5>
                                        </div>
                                        <p className="mb-0">Get support on whatsapp 24*7.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shape-1" style={this.shapeStyle}>
                            <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={this.svgStyle}>
                                <path d="M0.00,49.98 C150.00,150.00 271.49,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={this.strokeStyle}></path>
                            </svg>
                        </div>
                        <div className="shape-1 bottom" style={this.shapeStyle}>
                            <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={this.svgStyle}>
                                <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={this.strokeStyle}></path>
                            </svg>
                        </div>
                    </section>
                    {/* <section className="pt-0">
                        <div className="container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-12 col-lg-6 order-lg-1 mb-6 mb-lg-0">
                                    <img src="/assets/images/about/02.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="col-12 col-lg-6 col-xl-5">
                                    <div> <span className="badge badge-primary-soft p-2">
                                        <i className="la la-exclamation ic-3x rotation"></i>
                                    </span>
                                        <h2 className="mt-3">Bootsland Focus on your success</h2>
                                        <p className="lead mb-5">We use the latest technologies it voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <img alt="Image" src="/assets/images/testimonial/01.jpg" className="shadow-primary img-fluid rounded-circle d-inline me-3" />
                                        <div>
                                            <h5>Kendra Law</h5>
                                            <span className="text-muted">Web Developer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                    <section className="position-relative">
                        <div className="shape-2 transform-md-rotate" style={this.shapeStyle}>
                            <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={this.svgStyle}>
                                <path d="M208.09,0.00 C152.70,67.10 262.02,75.98 200.80,150.00 L0.00,150.00 L0.00,0.00 Z" style={this.strokeStyle}></path>
                            </svg>
                        </div>
                        <div className="container-fluid z-index-1">
                            <div className="row align-items-center">
                                <div className="col-12 col-md-12 col-lg-4 mb-6 mb-lg-0">
                                    <div> <span className="badge badge-light-soft p-2">
                                        <i className="la la-users ic-3x rotation"></i>
                                    </span>
                                        <h2 className="mt-4 ">Our Clients</h2>
                                       {/*  <p className="lead mb-0 ">All types of businesses need access to development resources, so we give you the option to decide how much you need to use.</p> */}
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-8">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6">
                                            <div className="card p-4 shadow border-0 flex-sm-row">
                                                <div className="me-sm-5 mb-3 mb-sm-0">
                                                    <img alt="Image" src="/img/feedback-2.jpeg" className="d-ma shadow-primary img-fluid rounded-circle d-inline" />
                                                </div>
                                                <div className="card-body p-0">
                                                    <p>Prescription and Queue management works very well, and it has made administration very efficient and easy.</p>
                                                    <div>
                                                        <h5 className="text-primary d-inline">Dr Manohar, India</h5>
                                                        {/* <small className="text-muted font-italic">- Founder</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mt-5">
                                            <div className="card p-4 shadow border-0 flex-sm-row">
                                                <div className="me-sm-5 mb-3 mb-sm-0">
                                                    <img alt="Image" src="/img/feedback-1.jpeg" className=" d-ma shadow-primary img-fluid rounded-circle d-inline" />
                                                </div>
                                                <div className="card-body p-0">
                                                    <p>MyMedbook  has proven to be very useful and has really improved the services in my clinic. I highly appreciate. I highly recommend it.</p>
                                                    <div>
                                                        <h5 className="text-primary d-inline">Dr puspak, India</h5>
                                                        {/* <small className="text-muted font-italic">- Supervisor</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mt-5 mt-md-0">
                                            <div className="card p-4 shadow border-0 flex-sm-row">
                                                <div className="me-sm-5 mb-3 mb-sm-0">
                                                    <img alt="Image" src="/img/feedback-3.jpeg" className="d-ma shadow-primary img-fluid rounded-circle d-inline" />
                                                </div>
                                                <div className="card-body p-0">
                                                    <p>All the patients history is in one place which helps a lot. The team is very responsive, and I highly recommend Mymedbook.</p>
                                                    <div>
                                                        <h5 className="text-primary d-inline">Dr Latha, India</h5>
                                                        {/* <small className="text-muted font-italic">- Manager</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 mt-5">
                                            <div className="card p-4 shadow border-0 flex-sm-row">
                                                <div className="me-sm-5 mb-3 mb-sm-0">
                                                    <img alt="Image" src="/img/feedback-4.jpeg" className="d-ma shadow-primary img-fluid rounded-circle d-inline" />
                                                </div>
                                                <div className="card-body p-0">
                                                    <p>MyMedbook is very easy to use and automatically add prescription it saves lot of time for clinics.</p>
                                                    <div>
                                                        <h5 className="text-primary d-inline">Dr Mahesh, India</h5>
                                                        {/* <small className="text-muted font-italic">- Ceo</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section>
                        <div className="container">
                            <div className="row align-items-end mb-5">
                                <div className="col-12 col-md-12 col-lg-4">
                                    <div> <span className="badge badge-primary-soft p-2">
                                        <i className="la la-bold ic-3x rotation"></i>
                                    </span>
                                        <h2 className="mt-4 mb-0">From Our Blog List Latest Feed</h2>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6 ms-auto">
                                    <div>
                                        <p className="lead mb-0">All types of businesses need access to development resources, so we give you the option to decide how much you need to use.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-4 mb-6 mb-lg-0">
                                    <div className="card border-0 bg-transparent">
                                        <div className="position-absolute bg-white shadow-primary text-center p-2 rounded ms-3 mt-3">15
            <br />July</div>
                                        <img className="card-img-top shadow rounded" src="/assets/images/blog/01.png" alt="Image" />
                                        <div className="card-body pt-5"> <a className="d-inline-block text-muted mb-2" href="#">Sass</a>
                                            <h2 className="h5 font-weight-medium">
                                                <a className="link-title" href="blog-single.html">Bootsland Perfect Performance landing Page</a>
                                            </h2>
                                            <p>Businesses need access to development resources serspiciatis unde omnis iste natus error.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0 pt-0">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item pe-4"> <a href="#" className="text-muted"><i className="ti-comments me-1 text-primary"></i> 131</a>
                                                </li>
                                                <li className="list-inline-item pe-4"> <a href="#" className="text-muted"><i className="ti-eye me-1 text-primary"></i> 255</a>
                                                </li>
                                                <li className="list-inline-item"> <a href="#" className="text-muted"><i className="ti-comments me-1 text-primary"></i> 14</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mb-6 mb-lg-0">
                                    <div className="card border-0 bg-transparent">
                                        <div className="position-absolute bg-white shadow-primary text-center p-2 rounded ms-3 mt-3">15
            <br />July</div>
                                        <img className="card-img-top shadow rounded" src="/assets/images/blog/02.png" alt="Image" />
                                        <div className="card-body pt-5"> <a className="d-inline-block text-muted mb-2" href="#">Marketing</a>
                                            <h2 className="h5 font-weight-medium">
                                                <a className="link-title" href="blog-single.html">The most powerfull template that make you.</a>
                                            </h2>
                                            <p>Businesses need access to development resources serspiciatis unde omnis iste natus error.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0 pt-0">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item pe-4"> <a href="#" className="text-muted"><i className="ti-comments me-1 text-primary"></i> 131</a>
                                                </li>
                                                <li className="list-inline-item pe-4"> <a href="#" className="text-muted"><i className="ti-eye me-1 text-primary"></i> 255</a>
                                                </li>
                                                <li className="list-inline-item"> <a href="#" className="text-muted"><i className="ti-comments me-1 text-primary"></i> 14</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <div className="card border-0 bg-transparent">
                                        <div className="position-absolute bg-white shadow-primary text-center p-2 rounded ms-3 mt-3">15
            <br />July</div>
                                        <img className="card-img-top shadow rounded" src="/assets/images/blog/03.png" alt="Image" />
                                        <div className="card-body pt-5"> <a className="d-inline-block text-muted mb-2" href="#">Landing</a>
                                            <h2 className="h5 font-weight-medium">
                                                <a className="link-title" href="blog-single.html">A brand for a company is like a reputation person.</a>
                                            </h2>
                                            <p>Businesses need access to development resources serspiciatis unde omnis iste natus error.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0 pt-0">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item pe-4"> <a href="#" className="text-muted"><i className="ti-comments me-1 text-primary"></i> 131</a>
                                                </li>
                                                <li className="list-inline-item pe-4"> <a href="#" className="text-muted"><i className="ti-eye me-1 text-primary"></i> 255</a>
                                                </li>
                                                <li className="list-inline-item"> <a href="#" className="text-muted"><i className="ti-comments me-1 text-primary"></i> 14</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                    {/* <section>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-lg-4 mb-8 mb-lg-0">
                                            <div className="card border-0 hover-translate">
                                                <div className="card-body py-11 px-6">
                                                    <div className="text-center mb-5"> <span className="badge text-dark shadow">
                                                        <span className="h6 text-uppercase">Basic</span>
                                                    </span>
                                                    </div>
                                                    <div className="d-flex justify-content-center"> <span className="h2 mb-0 mt-2">$</span>
                                                        <span className="price display-2">29</span>
                                                        <span className="h2 align-self-end mb-1">/mo</span>
                                                    </div>
                                                    <p className="text-center text-muted mb-6 mb-md-8">Per user</p>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Responsive landing pages</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Free Custom Domain</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Flexible, simple license</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Monthly updates</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Outstanding Support</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Happy Customers</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="btn btn-block btn-primary mt-5">
                                                        Choose Packege
              </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4 mb-8 mb-lg-0">
                                            <div className="card shadow border-0">
                                                <div className="card-body py-11 px-6">
                                                    <div className="text-center mb-5"> <span className="badge text-dark shadow">
                                                        <span className="h6 text-uppercase">Standard</span>
                                                    </span>
                                                    </div>
                                                    <div className="d-flex justify-content-center"> <span className="h2 mb-0 mt-2">$</span>
                                                        <span className="price display-2">59</span>
                                                        <span className="h2 align-self-end mb-1">/mo</span>
                                                    </div>
                                                    <p className="text-center text-muted mb-6 mb-md-8">Per user</p>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Responsive landing pages</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Free Custom Domain</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Flexible, simple license</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Monthly updates</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Outstanding Support</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Happy Customers</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="btn btn-block btn-primary mt-5">
                                                        Choose Package
              </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="card border-0 hover-translate">
                                                <div className="card-body py-11 px-6">
                                                    <div className="text-center mb-5"> <span className="badge text-dark shadow">
                                                        <span className="h6 text-uppercase">Extended</span>
                                                    </span>
                                                    </div>
                                                    <div className="d-flex justify-content-center"> <span className="h2 mb-0 mt-2">$</span>
                                                        <span className="price display-2">89</span>
                                                        <span className="h2 align-self-end mb-1">/mo</span>
                                                    </div>
                                                    <p className="text-center text-muted mb-6 mb-md-8">Per user</p>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Responsive landing pages</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Free Custom Domain</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Flexible, simple license</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Monthly updates</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Outstanding Support</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start justify-content-between">
                                                        <p>Happy Customers</p>
                                                        <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="btn btn-block btn-primary mt-5">
                                                        Choose Package
              </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}

                    <section>
                        <div className="container">
                            <div className="row align-items-end justify-content-between">
                                <div className="col-12 col-md-12 col-lg-12 mb-3 mb-md-0">
                                    <div> <span className="badge badge-primary-soft p-2 font-w-6">
                                        Price Table
                                    </span>
                                        <h2 className="mt-3 font-w-5">Fair and affordable prices for all.</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="tab-content mt-8" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="nav-tab-1">
                                            <div className="row align-items-center">
                                                <div className="col-12 col-lg-4 mb-8 mb-lg-0">
                                                    <div className="card border-0 shadow">
                                                        <div className="card-body py-8 px-6">
                                                            <div className="text-center mb-5"> <span className="badge text-dark shadow">
                                                                <span className="h6 text-uppercase">Basic</span>
                                                            </span>
                                                            </div>
                                                            <div className="mb-5">
                                                                <img className="img-fluid" src="/assets/images/svg/01.svg" alt="" />
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>6 months</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>Monthly updates</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>Outstanding Support</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>SMS notification</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mt-5"> <span className="h3 mb-0 mt-2"><i className="fa fa-inr"></i></span>
                                                                <span className="price display-3 text-primary font-w-6">499</span>
                                                            </div>
                                                            <p className="text-center text-muted">Per Monthly</p>
                                                            <NavLink to="/signup" className="btn btn-block btn-primary mt-5">
                                                                Buy Now</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-4">
                                                    <div className="card border-0 shadow">
                                                        <div className="card-body py-8 px-6">
                                                            <div className="text-center mb-5"> <span className="badge text-dark shadow">
                                                                <span className="h6 text-uppercase">Standard</span>
                                                            </span>
                                                            </div>
                                                            <div className="mb-5">
                                                                <img className="img-fluid" src="/assets/images/svg/02.svg" alt="" />
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>12 months</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>Monthly updates</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>Outstanding Support</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>SMS notification</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mt-5"> <span className="h3 mb-0 mt-2"><i className="fa fa-inr"></i></span>
                                                                <span className="price display-3 text-primary font-w-6">449</span>
                                                            </div>
                                                            <p className="text-center text-muted">Per Monthly</p>
                                                            <NavLink to="/signup" className="btn btn-block btn-primary mt-5">
                                                                Buy Now</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-4">
                                                    <div className="card border-0 shadow">
                                                        <div className="card-body py-8 px-6">
                                                            <div className="text-center mb-5"> <span className="badge text-dark shadow">
                                                                <span className="h6 text-uppercase">Extended</span>
                                                            </span>
                                                            </div>
                                                            <div className="mb-5">
                                                                <img className="img-fluid" src="/assets/images/svg/02.svg" alt="" />
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>24 months</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>Monthly updates</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>Outstanding Support</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <p>SMS notification</p>
                                                                <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mt-5"> <span className="h3 mb-0 mt-2"><i className="fa fa-inr"></i></span>
                                                                <span className="price display-3 text-primary font-w-6">399</span>
                                                            </div>
                                                            <p className="text-center text-muted">Per Monthly</p>
                                                            <NavLink to="/signup" className="btn btn-block btn-primary mt-5">
                                                                Buy Now</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment >
        );
    }
}

export default Home;