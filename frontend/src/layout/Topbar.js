import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import profilePic from '../assets/images/user-11.jpg';


const Notifications = [{
  id: 1,
  text: 'Caleb Flakelar commented on Admin',
  subText: '1 min ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'primary'
},
{
  id: 2,
  text: 'New user registered.',
  subText: '5 min ago',
  icon: 'mdi mdi-account-plus',
  bgColor: 'info'
},
{
  id: 3,
  text: 'Cristina Pride',
  subText: 'Hi, How are you? What about our next meeting',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'success'
},
{
  id: 4,
  text: 'Caleb Flakelar commented on Admin',
  subText: '2 days ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'danger'
},
{
  id: 5,
  text: 'Caleb Flakelar commented on Admin',
  subText: '1 min ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'primary'
},
{
  id: 6,
  text: 'New user registered.',
  subText: '5 min ago',
  icon: 'mdi mdi-account-plus',
  bgColor: 'info'
},
{
  id: 7,
  text: 'Cristina Pride',
  subText: 'Hi, How are you? What about our next meeting',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'success'
},
{
  id: 8,
  text: 'Caleb Flakelar commented on Admin',
  subText: '2 days ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'danger'
}];

const ProfileMenus = [
  {
    label: 'Logout',
    icon: 'fa fa-sign-out',
    redirectTo: "/logout",
    hasDivider: true
  }]


class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <React.Fragment>
        {/* <div className="navbar-custom">
          <ul className="list-unstyled topnav-menu float-end mb-0">
            <li>
              <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus} username={this.props.user ? this.props.user.username : ''} />
            </li>
          </ul>

          <div className="logo-box">
            <Link to="/" className="logo">
              <span className="logo-lg">
                My<span className="text-primary fw-bold">MedBook</span>
              </span>
              <span className="logo-sm">
                <img src="/images/transperent-small.png" alt="" height="54" />
              </span>
            </Link>
          </div>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light" onClick={this.props.menuToggle}>
                <i className="fa fa-bars"></i>
              </button>
            </li>
          </ul>
        </div> */}
        <header className="site-header">
          <div >
            <div className="container">
              <div className="row">
                <div className="col">
                  <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
                    <a className="navbar-brand logo text-dark h2 mb-0">
                      <span className="logo-lg ms-3 me-2">My <span className="text-white fw-bold">MedBook</span></span>
                      <span className="logo-sm ms-3 me-2">
                        <span className="text-white fw-bold">MB</span>
                      </span>
                    </a>
                    <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                      <li>
                        <button className="button-menu-mobile waves-effect waves-light" onClick={this.props.menuToggle}>
                          <i className="fa fa-bars"></i>
                        </button>
                      </li>
                    </ul>

                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown white">
                          <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><span className="text-white">Welcome</span> <span className="text-white">{this.props.user ? this.props.user.full_name : ''}</span></a>
                          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                            <li>
                              <NavLink className="dropdown-item" to="/app/profile" >
                                Profile
                              </NavLink>
                            </li>
                            <li>
                              <NavLink className="dropdown-item" to="/app/membership" >
                              Membership
                              </NavLink>
                            </li>                            
                          </ul>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link text-white" to="/logout" >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};
export default connect(mapStateToProps)(Topbar);

