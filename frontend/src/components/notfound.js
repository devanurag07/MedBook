import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class NotFound extends Component {
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
            <React.Fragment><div className="page-content"><section className="fullscreen-banner p-0">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-12 text-center h-100 d-flex align-items-center">
                            <div className="w-100"><img className="img-fluid d-inline mb-5" src="/assets/images/404.png" alt="" />
                                <h2>Oops! Page Not Found</h2>
                                <div className="col-lg-6 col-md-10 mx-auto">
                                    <h6>You’re either misspelling the URL
or requesting a page that's no longer here.</h6>
                                    <NavLink className="btn btn-primary" to="/" >
                                        Back To Home Page
                                        </NavLink>
                                </div>
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

export default NotFound;