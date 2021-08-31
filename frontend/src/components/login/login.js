import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../helpers/utils';
import Input from '../../ui/input';
import Button from '../../ui/button';
import '../../assets/scss/login.scss';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions';
import { Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { isUserAuthenticated } from '../../helpers/authUtils';
import { Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';
import { AvForm, AvInput } from 'availity-reactstrap-validation';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    inputChangedHandler = (event: any, controlName: any) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({ controls: updatedControls });
    }
    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }
    submitHandler = (event, values) => {
        if (values.username && values.password) {
            event.preventDefault();
            this.props.loginUser(values.username, values.password, this.props.history);
        }
        //this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }
    switchAuthModeHandler = () => {
        this.setState((prevState: any) => {
            return { isSignup: !prevState.isSignup };
        });
    }
    render() {

        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}
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
                                <h1>Sign In
</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-content">
                    <section>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-7 col-12">
                                    <img className="img-fluid" src="/assets/images/login.png" alt="" />
                                </div>
                                <div className="col-lg-5 col-12 mt-5 mt-lg-0">
                                    <div>
                                        <h2 className="mb-3">Sign In</h2>
                                        {this.props.login_error && <Alert color="danger" isOpen={this.props.login_error ? true : false}>
                                            <div>Invalid Username/Password</div>
                                        </Alert>}
                                        <AvForm onValidSubmit={this.submitHandler}>
                                            <div className="messages"></div>
                                            <div className="form-group">
                                                <AvInput type="text" name="username" className="form-control" placeholder="Email/Mobile" value={this.state.username} required />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                            <div className="form-group">
                                                <AvInput type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} required />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                            <div className="form-group mt-4 mb-5">
                                                <div className="remember-checkbox d-flex align-items-center justify-content-between">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label mb-0" htmlFor="flexCheckDefault">
                                                            Remember Me
  </label>
                                                    </div>
                                                    <NavLink to="/reset-password" >
                                                        <b>Forgot Password?</b> </NavLink>
                                                </div>
                                            </div>
                                            <input type="submit" value="Login Now" className="btn btn-primary btn-block" />
                                        </AvForm>
                                        <div className="d-flex align-items-center text-center justify-content-center mt-4">
                                            <span className="text-muted me-1">Don't have an account?</span>

                                            <NavLink to="/signup" >
                                                <b>Sign Up</b> </NavLink>
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
const mapStateToProps = (state) => {
    const { user, loading, login_error } = state.Auth;
    return { user, loading, login_error };
};
export default connect(mapStateToProps, { loginUser })(Login);