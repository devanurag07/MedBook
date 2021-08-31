import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

class Footer extends Component {
    shapeStyle = {
        height: '150px', 'overflow': 'hidden'
    }
    svgStyle = {
        height: '100%', width: '100%'
    }
    strokeStyle = {
        stroke: 'none', fill: '#fff'
    }
    inputStyle = {
        height: '60px'
    }
    scrolltop() {
        var pxShow = 300,
            goTopButton = $(".scroll-top")
        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('scroll-visible');
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                if (!goTopButton.hasClass('scroll-visible')) goTopButton.addClass('scroll-visible')
            } else {
                goTopButton.removeClass('scroll-visible')
            }
        });
        $('.smoothscroll').on('click', function (e) {
            $('body,html').animate({
                scrollTop: 0
            }, 3000);
            return false;
        });
    };
    componentDidMount() {
        this.scrolltop();
    }
    render() {
        return (
            <React.Fragment>
                <footer className="py-11 bg-primary position-relative" data-bg-img="/assets/images/bg/03.png">
                    <div className="shape-1" style={this.shapeStyle}>
                        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={this.svgStyle} >
                            <path d="M0.00,49.98 C150.00,150.00 271.49,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={this.strokeStyle} ></path>
                        </svg>
                    </div>
                    <div className="container mt-7">
                        <div className="row">
                            <div className="col-12 col-lg-5 col-xl-4 me-auto mb-6 mb-lg-0">
                                <h5 className="mb-4 text-white">Mymedbook is one place to manage your patients.</h5>
                                <small className="text-light">Save your patients from frustration, inaccurate wait times, and crowded lobbies. Create a free waitlist for your business with SMS notifications.</small>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-7">
                                <div className="row">
                                    <div className="col-12 col-sm-4 navbar-dark">
                                        <h5 className="mb-4 text-white">Pages</h5>
                                        <ul className="navbar-nav list-unstyled mb-0">
                                            <li className="mb-3 nav-item">
                                                <NavLink className="nav-link" to="/about-us" >
                                                    About
                                                </NavLink>
                                            </li>
                                            <li className="mb-3 nav-item">
                                                <NavLink className="nav-link" to="/faq" >
                                                    Faq
                                                </NavLink>
                                            </li>
                                            {/* <li className="mb-3 nav-item"><a className="nav-link" href="#">Blogs</a>
                                            </li> */}
                                            <li className="nav-item"><NavLink className="nav-link" to="/contact-us" >
                                                Contact Us
                                            </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                                        <h5 className="mb-4 text-white">Others</h5>
                                        <ul className="navbar-nav list-unstyled mb-0">
                                            <li className="mb-3 nav-item">
                                                <NavLink className="nav-link" to="/login" >
                                                    Login
                                                </NavLink>
                                            </li>
                                            <li className="mb-3 nav-item">
                                                <NavLink className="nav-link" to="/signup" >
                                                    Signup
                                                </NavLink>
                                            </li>
                                            <li className="nav-item"><NavLink className="nav-link" to="/support" >
                                                Support
                                            </NavLink>
                                            </li>
                                            {/* <li className="mb-3 nav-item"><a className="nav-link" href="#">Account</a>
                                            </li>
                                            <li className="nav-item"><a className="nav-link" href="#">Careers</a>
                                            </li> */}
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                                        <h5 className="mb-4 text-white">Legal</h5>
                                        <ul className="navbar-nav list-unstyled mb-0">
                                            <li className="mb-3 nav-item">
                                                <NavLink className="nav-link" to="/term-of-service" >
                                                    Term Of Service
                                                </NavLink>
                                            </li>
                                            <li className="mb-3 nav-item">
                                                <NavLink className="nav-link" to="/privacy-policy" >
                                                    Privacy Policy
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-12 col-sm-6">
                                        <NavLink className="footer-logo text-white h2 mb-0" to="/" >
                                            My<span className="fw-bold">MedBook.</span>
                                        </NavLink>
                                    </div>
                                    <div className="col-12 col-sm-6 mt-6 mt-sm-0">
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item"><a target="_blank" className="text-light ic-2x" href="https://www.facebook.com/MyMedbook-109123404712496"><i className="la la-facebook"></i></a>
                                            </li>
                                            {/* <li className="list-inline-item"><a className="text-light ic-2x" href="#"><i className="la la-dribbble"></i></a>
                                            </li> */}
                                            <li className="list-inline-item"><a target="_blank" className="text-light ic-2x" href="https://www.instagram.com/mymedbook.in/"><i className="la la-instagram"></i></a>
                                            </li>
                                            {/* <li className="list-inline-item"><a className="text-light ic-2x" href="#"><i className="la la-twitter"></i></a>
                                            </li> */}
                                            <li className="list-inline-item"><a target="_blank" className="text-light ic-2x" href="https://www.linkedin.com/in/my-medbook-854913213/"><i className="la la-linkedin"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-white text-center mt-8">
                            <div className="col">
                                <hr className="mb-8 mr-2 pr-2" />Copyright 2021 Impulsion Technologies Pvt Ltd<u>   <a className="text-white" href="#">MyMedBook</a></u> | All Rights Reserved</div>
                        </div>
                    </div>
                </footer>
                <div className="scroll-top"><a className="smoothscroll" href="#top"><i className="las la-angle-up"></i></a></div>

            </React.Fragment>)
    }

}
export default Footer

