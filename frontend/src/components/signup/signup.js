import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../helpers/utils';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { NavLink } from 'react-router-dom';
import '../../assets/scss/login.scss';
import { registerUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { Alert } from 'reactstrap';
import { postCall } from '../../helpers/axiosUtils'
import { BASE_URL } from '../../helpers/constants'
import Particles from 'react-particles-js';
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formValues: {
                first_name: '',
                email: '',
                mobile: '',
                password: '',
                otp: ''
            },
            emailExist: false

        }
    }
    inputChangedHandler = (controlName,event) => {
        if(controlName === 'mobile'){
            postCall(BASE_URL + `api/common/check-mobile-exist/`, { email: event.target.value }).then(r => {
                this.setState({ mobileExist: false });
            }).catch(er => {
                this.setState({ mobileExist: true });
            })
        }
        else {
            postCall(BASE_URL + `api/common/check-email-exist/`, { email: event.target.value }).then(r => {
                this.setState({ emailExist: false });
            }).catch(er => {
                this.setState({ emailExist: true });
            })
        }
        
    }

    sendOTP(data) {
        postCall(BASE_URL + `api/common/`, data).then(r => {
            this.setState({ showOtp: true });
        }).catch(er => {
            this.setState({ showOtp: false });
        })
    }
    submitHandler = (event, values) => {
        event.preventDefault();
        if (values.otp) {
            let form_data = this.state.formValues
            form_data['otp'] = values.otp
            this.props.registerUser(form_data, this.props.history);
        }
        else {
            this.setState({
                formValues: values
            })
            this.sendOTP(values)
        }
    }
    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return { isSignup: !prevState.isSignup };
        });
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
                                <h1>Sign Up</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-content">
                    <section className="register">
                        <div className="container">
                            <div className="row justify-content-center text-center">
                                <div className="col-lg-8 col-md-12">
                                    <div className="mb-6"> <span className="badge badge-primary-soft p-2">
                                        <i className="la la-exclamation ic-3x rotation"></i>
                                    </span>
                                        <h2 className="mt-3">Welcome To MyMedbook</h2>
                                        <p className="lead">Enter your details to sign up.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 col-md-10 ms-auto me-auto">
                                    <div className="register-form text-center">
                                        {this.props.registerError && <Alert color="danger" isOpen={this.props.registerError ? true : false}>
                                            <div>Please enter valid otp</div>
                                        </Alert>}
                                        <AvForm onValidSubmit={this.submitHandler} model={this.state.formValues}>
                                            {!this.state.showOtp &&
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <AvInput type="text" name="first_name" className="form-control" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <AvInput type="email" autoComplete="off" name="email" onChange={this.inputChangedHandler.bind(this, 'email')} className="form-control" validate={{ email: true }} placeholder="Email" required />
                                                        </div>
                                                        {this.state.emailExist && <p className="text-danger">Email already exist</p>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <AvInput type="number" name="mobile" autoComplete="off" onChange={this.inputChangedHandler.bind(this, 'mobile')} className="form-control" validate={{ pattern: { value: /^\d{10}$/ } }} placeholder="Mobile" required />
                                                        </div>
                                                        {this.state.mobileExist && <p className="text-danger">Mobile already exist</p>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <AvInput type="password" minLength="6" name="password" className="form-control" placeholder="Password" required />
                                                        </div>
                                                    </div>
                                                </div>}
                                            {this.state.showOtp &&
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <AvInput type="number" name="otp" className="form-control" placeholder="Please enter otp" required />
                                                        </div>
                                                        <div className="form-text mb-2">Please enter the otp that you received your registered Mobile</div>
                                                    </div>
                                                </div>
                                            }
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <input type="submit" disabled={this.state.mobileExist || this.state.emailExist} value={this.state.showOtp ? 'Verify OTP' : 'Create Account'} className="btn btn-primary" />
                                                    <span className="mt-4 d-block">Have An Account ? <NavLink to="/login" >
                                                        <i>Sign In!</i> </NavLink></span>
                                                </div>
                                            </div>
                                        </AvForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div></React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    const { user, loading, registerError } = state.Auth;
    return { user, loading, registerError };
};
export default connect(mapStateToProps, { registerUser })(Register);