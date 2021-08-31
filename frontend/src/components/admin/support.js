import React, { Component } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SmartTable from '../../ui/smart-table'
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { setBData } from '../../redux/actions';
import { connect } from 'react-redux';
import '../../assets/scss/style.scss';
import { postCall, putCall, getCall } from '../../helpers/axiosUtils'
import { BASE_URL } from '../../helpers/constants'
import { toast } from 'react-toastify';
import { loginUserSuccess } from '../../redux/actions'

/*
 customer name, address, contact no, email, a field to enter prescription, extra note if necessary
*/

class Support extends Component {
    recordPerPage = 5;
    constructor(props) {
        super(props);
        this.state = {
            formValues: this.props.user
        }
        this.props.setBData([
            {
                label: 'App',
                link: '',
                active: false
            },
            {
                label: 'Profile',
                link: '',
                active: true
            }
        ]);
    }
    notify = () => toast("Profile updated !");
    UNSAFE_componentWillMount() {
        //this.props.fetchCategoryData();
        //this.props.fetchParentCategoryData();
        /* if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.getQueueDetails(this.props.match.params.id)
        } */
    }
    submitHandler = (event, values) => {
        event.preventDefault();
        postCall(BASE_URL + `api/users/update-profile/`, values).then(r => {
            this.props.loginUserSuccess(r.data);
            this.notify();
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="row p-3">
                    <div className="col">
                    {/* <h4 className="">Support</h4> */}
                                <div className="row">
                                    <div className="col-12 text-center mb-4 mt-4">Whatsapp us - 7019769933</div>
                                    <div className="col-12 text-center mb-4 mt-4">Email us- support@mymedbook.in</div>
                                </div>
                                {/* <AvForm onValidSubmit={this.submitHandler}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="required">Name</label>
                                                <AvInput bsSize="sm" type="text" name="first_name" className="form-control" value={this.props.user ? this.props.user.first_name : ''} required placeholder="Please enter name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="required">Email</label>
                                                <AvInput readOnly bsSize="sm" type="text" name="email" className="form-control" value={this.props.user ? this.props.user.email : ''} required placeholder="Please enter email" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="required">Mobile</label>
                                                <AvInput bsSize="sm" type="text" value={this.props.user ? this.props.user.mobile : ''} name="mobile" className="form-control" required placeholder="Please enter mobile" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <AvInput type="textarea" name="address_line1" value={this.props.user ? this.props.user.address_line1 : ''} className="form-control" placeholder="Please enter comment" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <Button color="primary" className="float-end" type="submit">Update</Button>
                                        </div>
                                    </div>
                                </AvForm> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    const { user } = state.Auth;
    return { user };
}
export default connect(mapStateToProps, { setBData, loginUserSuccess })(Support);