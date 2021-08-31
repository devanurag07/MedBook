import React, { Component } from 'react';
import { setBData } from '../../redux/actions';
import { connect } from 'react-redux';
import '../../assets/scss/pricing.scss';
import { postCall, putCall, deleteCall, getCall } from '../../helpers/axiosUtils'
import { BASE_URL } from '../../helpers/constants'
import logo from "../../assets/images/transperent.png";
import { loginUserSuccess } from '../../redux/actions';
import { toast } from 'react-toastify';
/*
 customer name, address, contact no, email, a field to enter prescription, extra note if necessary
*/

class Subscription extends Component {
    recordPerPage = 5;
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                customer_name: '',
                email: '',
                mobile: '',
                address: '',
                prescription: '',
                note: '',
                id: null
            }
        }
        this.props.setBData([
            {
                label: 'App',
                link: '',
                active: false
            },
            {
                label: 'Subscription',
                link: '',
                active: true
            }
        ]);
    }
    UNSAFE_componentWillMount() {
        //this.props.fetchCategoryData();
        //this.props.fetchParentCategoryData();
    }
    notify = () => toast("Payment success !");
    displayRazorpay(amount) {
        postCall(BASE_URL + `api/payment/payment-order/`, { amount: amount }).then(r => {
            let res = r.data
            let options = {
                key_id: 'rzp_test_ztkFQhmCLT9v2A',
                amount: res.amount,
                currency: "INR",
                name: "MyMedBook",
                description: "Subscription Request amount for " + 'My MedBook',
                image: { logo },
                order_id: res.id,
                handler: this.handlePaymentResponse.bind(this),
                prefill: {
                    name: this.props.user.full_name,
                    email: this.props.user.email,
                    contact: this.props.user.mobile,
                },
                notes: {
                    address: "note value"
                },
                theme: {
                    color: "#05A5AF"
                }
            };
            let rzp = new window.Razorpay(options);
            rzp.open();
        })
    }
    handlePaymentResponse = (res) => {
        //console.log(res)
        postCall(BASE_URL + `api/payment/payment-success/`, res).then(r => {
            this.props.loginUserSuccess(r.data);
            this.notify()
            this.props.history.push(`/app/dashboard`)
        })
    }
    submitHandler = (event, values) => {
        event.preventDefault();
        let selectedId = this.state.formValues.id;
        if (selectedId) {
            putCall(BASE_URL + `api/queue/${selectedId}/`, values).then(r => {
                this.setState(state => ({
                    isModalOpen: !state.isModalOpen
                }));
                this.smartTable.fetchRecords(0, this.recordPerPage);
            }).catch(er => {

            })
        }
        else {
            postCall(BASE_URL + 'api/queue/', values).then(r => {
                this.setState(state => ({
                    isModalOpen: !state.isModalOpen
                }));
                this.smartTable.fetchRecords(0, this.recordPerPage);
            }).catch(er => {

            })
        }
    }
    render() {
        return (
            <React.Fragment><div className="row mt-2 p-3">
                <div className="col-12">
                    <div className="tab-content mt-8" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="nav-tab-1">                            <div className="row align-items-center">
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
                                        <button className="btn btn-block btn-primary mt-5" onClick={this.displayRazorpay.bind(this, 2994)}>
                                            Buy Now</button>
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
                                        <button className="btn btn-block btn-primary mt-5" onClick={this.displayRazorpay.bind(this, 5388)}>
                                            Buy Now</button>
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
                                            <p>SMS notification.</p>
                                            <div className="ms-4"> <i className="la la-check text-primary fw-bold"></i>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-5"> <span className="h3 mb-0 mt-2"><i className="fa fa-inr"></i></span>
                                            <span className="price display-3 text-primary font-w-6">399</span>
                                        </div>
                                        <p className="text-center text-muted">Per Monthly</p>
                                        <button className="btn btn-block btn-primary mt-5" onClick={this.displayRazorpay.bind(this, 9576)}>
                                            Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div></React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.Queue.queue,
        user: state.Auth.user
    }
}
export default connect(mapStateToProps, { setBData, loginUserSuccess })(Subscription);