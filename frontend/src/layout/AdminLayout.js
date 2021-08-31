import React, { Component, Suspense } from "react";
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import '../assets/scss/app.scss';
import profilePic from '../assets/images/user-11.jpg';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { NavLink } from 'react-router-dom';
// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("./Topbar"));
const Sidebar = React.lazy(() => import("./Sidebar"));
const Footer = React.lazy(() => import("./Footer"));
const loading = () => <div className="text-center"></div>;

const RightSidebarContent = (props) => {
    return <div className="user-box">
        <div className="user-img">
            <img src={profilePic} alt="user-img" title="Nik Patel"
                className="rounded-circle img-fluid" />
            <a href="/" className="user-edit"><i className="mdi mdi-pencil"></i></a>
        </div>

        <h5>{props.user && <a href="/">{props.user.username}</a>}</h5>
        <p className="text-muted mb-0"><small>Founder</small></p>
    </div>
}

class AdminLayout extends Component {

    constructor(props) {
        super(props);

        this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isCondensed: false
        }
    }

    signOut(e) {
        e.preventDefault();
        this.props.history.push("/login");
    }

    /**
     * toggle Menu
     */
    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({ isCondensed: !this.state.isCondensed });
    }

    /**
     * Toggle right side bar
     */
    toggleRightSidebar = () => {
        document.body.classList.toggle("right-bar-enabled");
    }

    render() {
        // get the child view which we would like to render
        //require("../assets/scss/app.scss");
        const children = this.props.children || null;
        return (
            <div className="app">
                <header className="app-header">
                    <div id="app-sidepanel" className="app-sidepanel">
                        <div id="sidepanel-drop" className="sidepanel-drop"></div>
                        <div className="sidepanel-inner d-flex flex-column">
                            <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none">&times;</a>
                            <div className="app-branding ms-4">
                                <NavLink to="/" className="app-logo">
                                    <img className="logo-icon" src="/img/logo.png" alt="logo" /></NavLink>
                                <div className="lead text-primary logo-title">My <span className="sub-title">MedBook</span></div>
                            </div>
                            <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1 mt-30">
                                <ul className="app-menu list-unstyled accordion" id="menu-accordion">
                                    <li className="nav-item ms-4">
                                        <NavLink to="/app/dashboard" className="nav-link ps-1" activeClassName="active" aria-expanded="true">
                                            <img src="/img/dashboard.svg" className="in-active" alt="logo" /><img className="active" src="/img/dashboard-active.svg" alt="logo" /><span className="ms-2">Dashboard</span>
                                        </NavLink >
                                    </li>
                                    {this.props.user && this.props.user.role_name == 'Doctors' && this.props.user.document_verified && <React.Fragment>
                                        <li className="nav-item ms-4">
                                            <NavLink to="/app/queue" className="nav-link ps-1" activeClassName="active" aria-expanded="true">
                                                <img src="/img/queue.svg" className="in-active" alt="logo" /><img className="active" src="/img/queue-active.svg" alt="logo" /><span className="ms-2">Queue</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item ms-4">
                                            <NavLink to="/app/customer" className="nav-link ps-1" activeClassName="active" aria-expanded="true">
                                                <img src="/img/customers.svg" className="in-active" alt="logo" /><img className="active" src="/img/customers-active.svg" alt="logo" /><span className="ms-2">Customers</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item ms-4">
                                            <NavLink to="/app/prescriptions" className="nav-link ps-1" activeClassName="active" aria-expanded="true">
                                                <img src="/img/prescription.svg" className="in-active" alt="logo" /><img className="active" src="/img/prescription-active.svg" alt="logo" /><span className="ms-2">Prescriptions</span>
                                            </NavLink>
                                        </li>

                                    </React.Fragment>

                                    }
                                    {this.props.user && this.props.user.is_superuser && <React.Fragment>

                                        <li className="nav-item ms-4" >
                                            <NavLink to="/app/document-verification" className="nav-link ps-1" activeClassName="active" aria-expanded="true">
                                                <img src="/img/checked.svg" className="in-active" alt="logo" /><img className="active" src="/img/checked-active.svg" alt="logo" /><span className="ms-2">Verification</span>
                                            </NavLink>
                                        </li>
                                    </React.Fragment>
                                    }
                                    <li className="nav-item ms-4">
                                        <NavLink to="/app/support" className="nav-link ps-1" activeClassName="active" aria-expanded="true">
                                            <img src="/img/customer-service.svg" className="in-active" alt="logo" /><img className="active" src="/img/customer-service-active.svg" alt="logo" /><span className="ms-2">Support</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className="app-wrapper">
                    {/* <Suspense fallback={loading()}>
                        <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu} />
                        <Sidebar isCondensed={this.state.isCondensed} {...this.props} />
                    </Suspense> */}
                    <div className="content-page">
                        <div className="content mt-4 me-4">
                            <Container fluid className="ms-2 bd me-2">
                                <div className="app-header-inner">
                                    <div className="app-header-content">
                                        <div className="row ps-3 pe-3 pt-2 pb-2">
                                            {/* <div className="col-auto">
                                                <a id="sidepanel-toggler" className="sidepanel-toggler d-inline-block d-xl-none" href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img"><title>Menu</title><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
                                                </a>
                                            </div> */}
                                            <div className="col mt-mb-auto">
                                                <div className="app-utility-item">
                                                    Welcome {this.props.user.full_name}
                                                </div>
                                            </div>
                                            <div className="app-utilities col-auto">
                                                {/* <div className="app-utility-item app-user-dropdown dropdown">
                                                    <a className="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false"><img src="/img/user.png" alt="user profile" /></a>
                                                    <ul className="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                                                        <li>
                                                            <NavLink className="dropdown-item" to="/app/profile" >
                                                                Profile
                                                            </NavLink>
                                                        </li>
                                                        <li><NavLink className="dropdown-item" to="/app/membership" >
                                                            Membership
                                                        </NavLink></li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><NavLink className="dropdown-item" to="/logout" >
                                                            Logout
                                                        </NavLink></li>
                                                    </ul>
                                                </div> */}                                                
                                                <div className="app-utility-item me-0">
                                                    <NavLink className="btn btn-light ms-2 d-none d-md-block text-primary" to="/app/membership" >
                                                        Membership
                                                    </NavLink>
                                                </div>
                                                <div className="app-utility-item me-0">
                                                    <NavLink className="btn btn-light ms-2 d-none d-md-block text-primary" to="/app/profile" >
                                                        Profile
                                                    </NavLink>
                                                </div>
                                                <div className="app-utility-item">
                                                    <NavLink to="/logout" className="btn btn-light ms-2 d-none d-md-block text-primary">Logout<img className="logout ms-1" src="/img/logout.svg" alt="logo" /></NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Suspense fallback={loading()}>
                                    {children}
                                </Suspense>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.Auth.user
    }
}
export default connect(mapStateToProps, null)(AdminLayout);
