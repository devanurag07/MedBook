import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SmartTable from '../../ui/smart-table'
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { setBData } from '../../redux/actions';
import { connect } from 'react-redux';
import { postCall } from '../../helpers/axiosUtils'

class Users extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            columns: [{
                dataField: 'username',
                label: 'Name',
                type: 'text',
                styles: {
                    width: '80%',
                }
            },
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
                label: 'Users',
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
            param.rowData.parentcategory = param.rowData.parentcategory ? param.rowData.parentcategory.id : ''
            this.setState(state => ({
                isModalOpen: !state.isModalOpen,
                formValues: param.rowData
            }));
        }
    }
    render() {
        let optionTemplate = this.props.parentCategoryLookup.map(v => (
            <option value={v.id} key={v.id}>{v.name}</option>
        ));
        return (
            <React.Fragment>
                <div className="row mt-2">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="">
                                    Users
                                {/* <button onClick={this.toggle} className="btn btn-primary btn-sm float-end" type="button">Add</button> */}
                                </h4>
                                <SmartTable ref={instance => { this.smartTable = instance; }} fetchUrl="api/users/" dataItem={this.props.category} actionHandler={this.actionHandler} recordPerPage={5} cols={this.state.columns} />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <AvForm onValidSubmit={this.submitHandler} model={this.state.formValues}>
                        <ModalHeader toggle={this.toggle}>{this.state.formValues.id ? 'Edit Categories' : 'Add Categories'}</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <AvInput type="text" name="name" className="form-control" required placeholder="Please enter category name" />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    {/* <AvField type="select" name="parentcategory" label="Role" value={this.state.roles} required >
                                        <option value="">Please select parent category</option>
                                        {optionTemplate}
                                    </AvField> */}
                                    <AvInput type="select" name="parentcategory" className="form-control" placeholder="Last Name">
                                        <option value="">Please select parent category</option>
                                        {optionTemplate}
                                    </AvInput>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                            <Button color="primary" type="submit">Save</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.Course.category,
        parentCategoryLookup: state.Course.dropdownData
    }
}
export default connect(mapStateToProps, { setBData })(Users);