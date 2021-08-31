import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions'

class ProfileDropdown extends Component {
    constructor(props) {
        super(props);

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }
    onLogout(event) {
        event.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    /*:: toggleDropdown: () => void */
    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
        //console.log(this.state.dropdownOpen);
    }

    render() {
        const profilePic = this.props.profilePic || null;
        //console.log(this.state.dropdownOpen);
        return (
            <React.Fragment>
                <li className="nav-item dropdown">
                    <button className="btn btn-link nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light dropdown-toggle" href="#" id="navbarProfileDropdown" role="button" data-toggle="dropdown">
                        <img src={profilePic} className="rounded-circle" alt="user" />
                        <span className="pro-user-name ml-1">{this.props.username}{/*   <i className="fa fa-chevron-down"></i>  */}</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarProfileDropdown">
                        {/* <div className="dropdown-header noti-title">
                            <h6 className="text-overflow m-0">Welcome !</h6>
                        </div> */}
                        {this.props.menuItems.map((item, i) => {
                            return <React.Fragment key={i + "-profile-menu"}>
                                {item.hasDivider ? <DropdownItem divider /> : null}
                                {item.redirectTo &&
                                    <Link to={item.redirectTo} className="dropdown-item notify-item">
                                        <i className={`${item.icon} mr-1`}></i>
                                        <span>{item.label}</span>
                                    </Link>
                                }
                                {!item.redirectTo &&
                                    <a className="dropdown-item notify-item" href="#" onClick={this.onLogout.bind(this)}>
                                        <i className={`${item.icon} mr-1`}></i>
                                        <span>{item.label}</span>
                                    </a>
                                }
                            </React.Fragment>
                        })}
                    </div>
                </li>
            </React.Fragment>


        );
    }
}
const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};
export default connect(mapStateToProps, { logoutUser })(ProfileDropdown);