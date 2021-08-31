import React, { Component } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SmartTable from '../../ui/smart-table'
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { setBData } from '../../redux/actions';
import { createQueue } from '../../redux/actions'
import { connect } from 'react-redux';
import '../../assets/scss/style.scss';
import { postCall, putCall, getCall } from '../../helpers/axiosUtils'
import { BASE_URL } from '../../helpers/constants'
import { toast } from 'react-toastify';
import { AutoComplete } from 'primereact/autocomplete';

class SendPrescription extends Component {
    recordPerPage = 5;
    constructor(props) {
        super(props);
        this.searchCustomer = this.searchCustomer.bind(this)
        this.state = {
            drug_to_taken: '',
            medicine_name: '',
            formValues: {
                customer_name: '',
                mobile: '',
                prescription: '',
                note: '',
                clinic_name: '',
                id: null
            },
            prescriptionLookup: [],
            prescription: null,
            prescriptionsData: [
                {
                    drug_to_taken: '',
                    medicine_name: ''
                }
            ]
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
                label: 'Send Prescription',
                link: '',
                active: true
            }
        ]);
    }
    autoCompleteChange(e) {
        this.setState({
            prescription: e.value
        })
    }
    searchCustomer(event) {
        if (!event.query.trim().length) {
            this.setState(state => ({
                filteredCustomers: []
            }));
        }
        else {
            getCall(BASE_URL + `api/prescription-info/get-prescriptions/?searchText=${event.query}`).then(r => {
                this.setState(state => ({
                    filteredCustomers: r.data
                }));
            }).catch(er => {
                this.setState(state => ({
                    filteredCustomers: []
                }));
            })
        }
    }
    UNSAFE_componentWillMount() {
        //this.props.fetchCategoryData();
        //this.props.fetchParentCategoryData();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.getQueueDetails(this.props.match.params.id)
        }
        //this.getPrescriptionLookup();
    }
    getQueueDetails(queueId) {
        getCall(BASE_URL + `api/queue/${queueId}/`).then(r => {
            let response = r.data;
            if (response.status != 0) {
                this.props.history.push(`/app/dashboard`)
            }
            this.setState({
                queueData: response
            })
        })
    }
    notify = (msg) => toast(msg);
    submitHandler = (event, values) => {
        event.preventDefault();
        values['queue_id'] = this.state.queueData.id
        values['prescription'] = this.state.prescription ? this.state.prescription.map(p => p.id) : null
        values['prescriptionsData'] = this.state.prescriptionsData
        postCall(BASE_URL + `api/prescription/`, values).then(r => {
            this.notify("Prescription sent to customer!");
            this.props.history.push(`/app/dashboard`)
        }).catch(er => {
            this.notify('Failed to sent prescription')
        })
    }
    addNewPrescription() {
        let data = this.state.prescriptionsData
        let emptyRcords = data.filter(d => { return d.drug_to_taken === '' || d.medicine_name === '' })
        if (emptyRcords.length > 0) {
            this.notify('Please fill all required values')
        }
        else {
            data.push({
                drug_to_taken: '',
                medicine_name: ''
            })
            this.setState({ prescriptionsData: data });
        }
    }
    handleChange(controlName, rowIndex, event) {
        let data = this.state.prescriptionsData
        if (controlName === 'drug_to_taken') {
            data[rowIndex]['drug_to_taken'] = event.target.value
        }
        else {
            data[rowIndex]['medicine_name'] = event.target.value
        }
        this.setState({ prescriptionsData: data });
    }
    render() {
        return (
            <React.Fragment>
                <div className="row mt-2 p-3">
                    <div className="col">
                        <h4 className="">Send Prescription</h4>
                        <AvForm onValidSubmit={this.submitHandler}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="required">Customer name</label>
                                        <AvInput bsSize="sm" type="text" value={this.state.queueData ? this.state.queueData.customer_name : ''} name="customer_name" className="form-control bs" required placeholder="Please enter customer name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="required">Mobile</label>
                                        <AvInput bsSize="sm" type="text" value={this.state.queueData ? this.state.queueData.mobile : ''} name="mobile" className="form-control bs" required placeholder="Please enter mobile" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="required">Clinic name</label>
                                        <AvInput bsSize="sm" readOnly type="text" name="clinic_name" className="form-control bs" value={this.props.user && this.props.user.user && this.props.user.user.clinic_name ? this.props.user.user.clinic_name : ''} required placeholder="Please enter clinic name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="required">Date</label>
                                        <AvInput bsSize="sm" type="date" name="dateTime" className="form-control bs" required placeholder="Please enter mobile" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <AutoComplete multiple placeholder="Search Prescription" value={this.state.prescription} appendTo="self" inputClassName="autocomplete" suggestions={this.state.filteredCustomers} completeMethod={this.searchCustomer} field="name" onChange={(e) => this.setState({ prescription: e.value })} />
                                    </div>
                                </div>
                                <div className="separator">OR</div>
                                {this.state.prescriptionsData.map((column, rowIndex) =>
                                    <React.Fragment key={rowIndex}>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                {rowIndex == 0 && <label className="required">Medicine name</label>}
                                                <AvInput bsSize="sm" type="text" name="name" value={this.state.prescriptionsData[rowIndex].medicine_name} onChange={this.handleChange.bind(this, 'medicine_name', rowIndex)} className="form-control sm bs" placeholder="Medicine name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                {rowIndex == 0 && <label className="required">Quantity per day</label>}
                                                <AvInput bsSize="sm" type="text" name="drug_to_taken" value={this.state.prescriptionsData[rowIndex].drug_to_taken} onChange={this.handleChange.bind(this, 'drug_to_taken', rowIndex)} className="form-control sm bs" placeholder="Quantity per day" />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="col-lg-12 text-end">
                                    <button type="button" onClick={this.addNewPrescription.bind(this)} className="btn btn-link p-0" id="addNew">Add another prescription</button>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Comment</label>
                                        <AvInput type="textarea" name="note" className="form-control bs" placeholder="Please enter comment" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <Button color="secondary" onClick={() => this.props.history.push('/app/dashboard')}>Cancel</Button>
                                    <Button color="primary" className="float-end" type="submit">Send</Button>
                                </div>
                            </div>
                        </AvForm>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.Queue.queue,
        user:state.Auth
    }
}
export default connect(mapStateToProps, { setBData })(SendPrescription);