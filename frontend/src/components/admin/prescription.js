import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SmartTable from '../../ui/smart-table'
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { setBData } from '../../redux/actions';
import { connect } from 'react-redux';
import '../../assets/scss/style.scss';
import { postCall, putCall, deleteCall, getCall } from '../../helpers/axiosUtils'
import { BASE_URL } from '../../helpers/constants'
import { QUEUE_STATUS } from '../../helpers/appUtils'

class Prescription extends Component {
    recordPerPage = 5;
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.deleteToggle = this.deleteToggle.bind(this)
        this.state = {
            columns: [
                {
                    dataField: 'name',
                    label: 'Medicine name',
                    type: 'text',
                    styles: {
                        width: '40%',
                    }
                },
                {
                    dataField: 'drug_to_taken',
                    label: 'Quantity per day',
                    type: 'text',
                    styles: {
                        width: '20%',
                    }
                },
                {
                    dataField: 'note',
                    label: 'Directions for intake',
                    type: 'text',
                    styles: {
                        width: '33%',
                    }
                },
                {
                    dataField: 'null',
                    styles: {
                        width: '7%',
                    },
                    label: 'Actions',
                    actions: [{ label: 'Delete', className: "btn btn-danger btn-sm me-2", icon: true, iconClass: "fa fa-trash" }, { label: 'Edit', className: "btn btn-primary btn-sm", icon: true, iconClass: "fa fa-pencil-square-o" }],
                    type: 'action'
                }
            ],
            isModalOpen: false,
            isDeleteModalOpen: false,
            formValues: {
                name: '',
                drug_to_taken: '',
                note: '',
                id: null
            },
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
                label: 'Prescription',
                link: '',
                active: true
            }
        ]);
    }
    UNSAFE_componentWillMount() {
        //this.props.fetchCategoryData();
        //this.props.fetchParentCategoryData();
        //this.getCustomerLookup();
    }
    toggle(event) {
        event.preventDefault();
        this.setState(state => ({
            isModalOpen: !state.isModalOpen,
            formValues: {
                customer: '',
                prescription: '',
                note: '',
                id: null
            }
        }));
    }
    deleteToggle(event) {
        event.preventDefault();
        this.setState(state => ({
            isDeleteModalOpen: !state.isDeleteModalOpen
        }))
    }
    deleteHandler = (event, values) => {
        event.preventDefault();
        let selectedId = this.state.formValues.id;
        if (selectedId) {
            deleteCall(BASE_URL + `api/queue/${selectedId}/`).then(r => {
                this.setState(state => ({
                    isDeleteModalOpen: !state.isDeleteModalOpen
                }));
                this.smartTable.fetchRecords(0, this.recordPerPage);
            }).catch(er => {

            })
        }
    }
    submitHandler = (event, values) => {
        event.preventDefault();
        let selectedId = this.state.formValues.id;
        if (selectedId) {
            putCall(BASE_URL + `api/prescription-info/${selectedId}/`, values).then(r => {
                this.setState(state => ({
                    isModalOpen: !state.isModalOpen
                }));
                this.smartTable.fetchRecords(0, this.recordPerPage);
            }).catch(er => {

            })
        }
        else {
            postCall(BASE_URL + 'api/prescription-info/', values).then(r => {
                this.setState(state => ({
                    isModalOpen: !state.isModalOpen
                }));
                this.smartTable.fetchRecords(0, this.recordPerPage);
            }).catch(er => {

            })
        }
    }
    actionHandler = (param) => {
        if (param.label === 'Edit') {
            this.setState(state => ({
                isModalOpen: !state.isModalOpen,
                formValues: param.rowData,
            }));
        }
        else {
            this.setState(state => ({
                isDeleteModalOpen: !state.isDeleteModalOpen,
                formValues: param.rowData
            }));
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="row mt-2 p-3">
                    <div className="col">
                    <h4 className="">
                                    Prescription
                                <button onClick={this.toggle} className="btn btn-primary btn-sm float-end" type="button">Add</button>
                                </h4>
                                <SmartTable ref={instance => { this.smartTable = instance; }} fetchUrl="api/prescription-info/" actionHandler={this.actionHandler} recordPerPage={this.recordPerPage} cols={this.state.columns} />
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} size="lg" toggle={this.toggle}>
                    <AvForm onValidSubmit={this.submitHandler} model={this.state.formValues}>
                        <ModalHeader toggle={this.toggle}>{this.state.formValues.id ? 'Edit Prescription' : 'Add Prescription'}</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="required">Medicine name</label>
                                        <AvInput bsSize="sm" type="text" name="name" className="form-control sm" placeholder="Medicine name" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="required">Quantity per day</label>
                                        <AvInput bsSize="sm" type="text" name="drug_to_taken" className="form-control sm" placeholder="Quantity per day" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Directions for intake</label>
                                        <AvInput bsSize="sm" type="textarea" name="note" className="form-control" placeholder="Please enter directions for intake" />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                            <Button color="primary" type="submit">Save</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.deleteToggle}>
                    <AvForm onValidSubmit={this.deleteHandler} model={this.state.formValues}>
                        <ModalHeader toggle={this.deleteToggle}>Delete Queue</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="text-center">Are you sure?<br />You want to delete this queue!</h3>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.deleteToggle}>Close</Button>
                            <Button color="danger" type="submit">Delete</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    const { user } = state.Auth;
    return { user };
}
export default connect(mapStateToProps, { setBData })(Prescription);