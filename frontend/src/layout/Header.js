import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions';
import $ from 'jquery';
class Header extends Component {
    constructor(props) {
        super(props)
    }
    onLogout(event) {
        event.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    componentDidMount() {
        $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
            if (!$(this).next().hasClass('show')) {
                $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            var $subMenu = $(this).next(".dropdown-menu");
            $subMenu.toggleClass('show');

            $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                $('.dropdown-submenu .show').removeClass("show");
            });

            return false;
        });
    }
    render() {
        return (<React.Fragment>
            <header className="site-header">
                <div id="header-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <nav className="navbar navbar-expand-lg navbar-light">
                                    <NavLink className="navbar-brand logo text-dark h2 mb-0" to="/" >
                                        My<span className="text-primary fw-bold">MedBook</span>
                                    </NavLink>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav ms-auto">
                                            <li className="nav-item">
                                                <NavLink activeClassName="active" exact className="nav-link" to="/" >
                                                    Home
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeClassName="active" className="nav-link" to="/about-us" >
                                                    About Us
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeClassName="active" className="nav-link" to="/contact-us" >
                                                    Contact Us
                                                </NavLink>
                                            </li>
                                            {!this.props.user && <React.Fragment>
                                                <li className="nav-item">
                                                    <NavLink activeClassName="active" className="nav-link" to="/login" >
                                                        Login
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink activeClassName="active" className="nav-link" to="/signup" >
                                                    Sign up
                                                    </NavLink>
                                                </li>
                                            </React.Fragment>
                                            }
                                            {this.props.user && <React.Fragment>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/app/dashboard" >
                                                    Dashboard
                                                    </NavLink>
                                                </li>
                                            </React.Fragment>
                                            }</ul>
                                    </div>
                                    <NavLink to="/signup" className="btn btn-primary ms-8 d-none d-md-block">
                                        Buy Now</NavLink>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};
export default connect(mapStateToProps, { logoutUser })(Header);