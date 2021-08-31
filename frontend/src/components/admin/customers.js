import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SmartTable from '../../ui/smart-table'
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { setBData } from '../../redux/actions';
import { connect } from 'react-redux';
import { postCall } from '../../helpers/axiosUtils'
import { BASE_URL } from '../../helpers/constants'
import { toast } from 'react-toastify';

class Customers extends Component {
    defaultParam = {
        customer: true
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.showCustomerToggle = this.showCustomerToggle.bind(this)
        this.state = {
            columns: [
                {
                    dataField: 'full_name',
                    label: 'Name',
                    type: 'text',
                    styles: {
                        width: '40%',
                    }
                },
                {
                    dataField: 'email',
                    label: 'Email',
                    type: 'text',
                    styles: {
                        width: '33%',
                    }
                },
                {
                    dataField: 'mobile',
                    label: 'Mobile',
                    type: 'text',
                    styles: {
                        width: '15%',
                    }
                },
                {
                    dataField: 'action',
                    styles: {
                        width: '6%',
                    },
                    label: 'Actions',
                    actions: [
                        { label: 'Edit', className: "btn btn-primary btn-sm", icon: true, iconClass: "fa fa-pencil-square-o" },
                    ],
                    type: 'action'
                }
            ],
            isModalOpen: false,
            formValues: {
                name: '',
                parentcategory: '',
            }
        }
        this.props.setBData([
            {
                label: 'App',
                link: '',
                active: false
            },
            {
                label: 'Dashboard',
                link: '',
                active: false
            },
            {
                label: 'Customers',
                link: '',
                active: true
            }
        ]);
    }
    UNSAFE_componentWillMount() {
        //this.props.fetchCategoryData();
        //this.props.fetchParentCategoryData();
    }
    toggle(event) {
        event.preventDefault();
        /* this.setState(state => ({
            isModalOpen: !state.isModalOpen
        })); */
        //this.smartTable.fetchRecords(0,1);
    }
    submitHandler = (event, values) => {
        event.preventDefault();
        values['id'] = ''
        this.props.createCategory(values, this.props.history);
        this.setState(state => ({
            isModalOpen: !state.isModalOpen
        }));
    }
    actionHandler = (param) => {
        if (param.label === 'Edit') {
            this.setState(state => ({
                isCustomerModalOpen: !state.isCustomerModalOpen,
                customerFormValues: param.rowData
            }));
        }
        else if (param.label === 'Approve') {
            postCall(BASE_URL + `api/users/activate-customer/`, { id: param.rowData.id }).then(r => {
                toast("Customer Activated !");
            }).catch(er => {

            })
        }
    }
    showCustomerToggle(event) {
        event.preventDefault();
        this.setState(state => ({
            isCustomerModalOpen: !state.isCustomerModalOpen
        }))
    }
    inputChangedHandler = (controlName, event) => {
        if (controlName === 'mobile') {
            postCall(BASE_URL + `api/common/check-mobile-exist/`, { email: event.target.value, user_id: this.state.customerFormValues.id }).then(r => {
                this.setState({ mobileExist: false });
            }).catch(er => {
                this.setState({ mobileExist: true });
            })
        }
        else {
            postCall(BASE_URL + `api/common/check-email-exist/`, { email: event.target.value, user_id: this.state.customerFormValues.id }).then(r => {
                this.setState({ emailExist: false });
            }).catch(er => {
                this.setState({ emailExist: true });
            })
        }

    }
    addCustomerHandler = (event, values) => {
        event.preventDefault();
        values['id'] = this.state.customerFormValues.id
        postCall(BASE_URL + `api/users/update-customer/`, values).then(r => {
            this.smartTable.fetchRecords(0, this.recordPerPage);
            this.setState(state => ({
                isCustomerModalOpen: !state.isCustomerModalOpen
            }));
        }).catch(er => {

        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="row p-3 mt-2">
                    <div className="col">
                        <h4 className="">
                            Customers
                            {/* <button onClick={this.toggle} className="btn btn-primary btn-sm float-end" type="button">Add</button> */}
                        </h4>
                        <SmartTable ref={instance => { this.smartTable = instance; }} fetchUrl="api/users/" defaultParam={this.defaultParam} actionHandler={this.actionHandler} recordPerPage={5} cols={this.state.columns} />

                        <Modal isOpen={this.state.isCustomerModalOpen} toggle={this.showCustomerToggle}>
                            <AvForm onValidSubmit={this.addCustomerHandler} model={this.state.customerFormValues}>
                                <ModalHeader toggle={this.showCustomerToggle}>Edit Customer</ModalHeader>
                                <ModalBody>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <AvInput bsSize="sm" type="text" name="first_name" required className="form-control sm" placeholder="Please enter the name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <AvInput bsSize="sm" type="text" onChange={this.inputChangedHandler.bind(this, 'email')} name="email" className="form-control sm" placeholder="Please enter the email" />
                                                {this.state.emailExist && <p className="text-danger">Email already exist</p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <AvInput bsSize="sm" type="text" name="mobile" required validate={{ pattern: { value: /^\d{10}$/ } }} onChange={this.inputChangedHandler.bind(this, 'mobile')} className="form-control sm" required placeholder="Please enter the mobile" />
                                                {this.state.mobileExist && <p className="text-danger">Mobile already exist</p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <AvInput bsSize="sm" type="textarea" name="address_line1" className="form-control" placeholder="Please enter the address" />
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" disabled={this.state.mobileExist || this.state.emailExist} onClick={this.showCustomerToggle}>Close</Button>
                                    <Button color="primary" type="submit">Add</Button>
                                </ModalFooter>
                            </AvForm>
                        </Modal>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.Auth.user,
    }
}
export default connect(mapStateToProps, { setBData })(Customers);