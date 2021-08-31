import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../assets/scss/login.scss";
import { connect } from "react-redux";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import { Alert } from "reactstrap";
import { postCall } from "../helpers/axiosUtils";
import { BASE_URL } from "../helpers/constants";
import Particles from "react-particles-js";
import { toast } from "react-toastify";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        first_name: "",
        email: "",
        mobile: "",
        password: "",
        otp: "",
      },
      emailExist: false,
    };
  }
  notify = (message) => toast(message);

  sendOTP(data) {
    postCall(BASE_URL + `api/common/reset-password-otp/`, data)
      .then((r) => {
        let res = r.data;
        this.setState({
          showOtp: true,
          user_id: res.user_id,
          mobile: data["mobile"],
          errorMessage: null,
        });
        this.notify("OTP sent to your mobile number");
      })
      .catch((er) => {
        this.setState({ errorMessage: "Please enter valid mobile/email" });
      });
  }
  verifyOTP(data) {
    postCall(BASE_URL + `api/common/verify-reset-password-otp/`, data)
      .then((r) => {
        this.setState({ showPassword: true, errorMessage: null });
      })
      .catch((er) => {
        this.setState({ errorMessage: "Please enter valid otp" });
      });
  }
  setNewPassword(data) {
    postCall(BASE_URL + `api/common/set-new-password/`, data)
      .then((r) => {
        this.notify("New Password updated!");
        this.props.history.push(`/login`);
      })
      .catch((er) => {
        this.setState({ errorMessage: "Failed to set password" });
      });
  }
  submitHandler = (event, values) => {
    event.preventDefault();
    if (values.otp) {
      values["mobile"] = this.state.mobile;
      this.verifyOTP(values);
    } else if (values.password) {
      values["user_id"] = this.state.user_id;
      this.setNewPassword(values);
    } else {
      this.setState({
        formValues: values,
      });
      this.sendOTP(values);
    }
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };
  render() {
    return (
      <React.Fragment>
        <section className="position-relative">
          <Particles
            id="particles-js"
            params={{
              particles: {
                number: {
                  value: 160,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: "#1360ef",
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#f94f15",
                  },
                  polygon: {
                    nb_sides: 5,
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100,
                  },
                },
                opacity: {
                  value: 1,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                    sync: false,
                  },
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 4,
                    size_min: 0.3,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: false,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600,
                  },
                },
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "bubble",
                  },
                  onclick: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 1,
                    },
                  },
                  bubble: {
                    distance: 250,
                    size: 0,
                    duration: 2,
                    opacity: 0,
                    speed: 3,
                  },
                  repulse: {
                    distance: 400,
                    duration: 0.4,
                  },
                  push: {
                    particles_nb: 4,
                  },
                  remove: {
                    particles_nb: 2,
                  },
                },
              },
              retina_detect: true,
            }}
          />
          <div className="container">
            <div className="row  text-center">
              <div className="col">
                <h1>Forgot Password</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="register">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-5">
                  <div>
                    <h2>Forgot your password?</h2>
                    <p>Enter your email/mobile to reset your password.</p>
                  </div>
                  {this.state.errorMessage && (
                    <Alert
                      color="danger"
                      isOpen={this.state.errorMessage ? true : false}
                    >
                      <div>{this.state.errorMessage}</div>
                    </Alert>
                  )}
                  <AvForm
                    onValidSubmit={this.submitHandler}
                    model={this.state.formValues}
                  >
                    {!this.state.showOtp && (
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <AvInput
                              type="text"
                              name="mobile"
                              className="form-control"
                              placeholder="Please enter email/mobile"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.showPassword && (
                      <div className="col-md-12">
                        <div className="form-group">
                          <AvInput
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            required
                          />
                        </div>
                      </div>
                    )}
                    {this.state.showOtp && !this.state.showPassword && (
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <AvInput
                              type="number"
                              name="otp"
                              className="form-control"
                              placeholder="Please enter otp"
                              required
                            />
                          </div>
                          <div className="form-text mb-2">
                            Please enter the otp that you received your
                            registered Mobile
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          value={
                            this.state.showPassword
                              ? "Set New Password"
                              : this.state.showOtp
                              ? "Verify OTP"
                              : "Send OTP"
                          }
                          className="btn btn-primary"
                        />
                        <span className="mt-4 d-block">
                          Have An Account ?{" "}
                          <NavLink to="/login">
                            <i>Sign In!</i>{" "}
                          </NavLink>
                        </span>
                      </div>
                    </div>
                  </AvForm>
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
  const { user, loading, registerError } = state.Auth;
  return { user, loading, registerError };
};
export default connect(mapStateToProps)(ResetPassword);
