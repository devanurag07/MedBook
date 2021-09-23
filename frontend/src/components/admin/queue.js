import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SmartTable from "../../ui/smart-table";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import { setBData } from "../../redux/actions";
import { createQueue } from "../../redux/actions";
import { connect } from "react-redux";
import "../../assets/scss/style.scss";
import {
  postCall,
  putCall,
  deleteCall,
  getCall,
} from "../../helpers/axiosUtils";
import { BASE_URL } from "../../helpers/constants";
import { QUEUE_STATUS } from "../../helpers/appUtils";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";
import { toast } from "react-toastify";
/*
 customer name, address, contact no, email, a field to enter prescription, extra note if necessary
*/

class Queue extends Component {
  recordPerPage = 5;
  source = null;
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);
    this.showCustomerToggle = this.showCustomerToggle.bind(this);
    this.searchCustomer = this.searchCustomer.bind(this);
    this.state = {
      columns: [
        {
          dataField: "customer_name",
          label: "Cus. Name",
          type: "text",
          styles: {
            width: "20%",
          },
        },
        {
          dataField: "email",
          label: "Email",
          type: "text",
          styles: {
            width: "20%",
          },
        },
        {
          dataField: "mobile",
          label: "Mobile",
          type: "text",
          styles: {
            width: "10%",
          },
        },
        {
          dataField: "note",
          label: "Note",
          type: "text",
          styles: {
            width: "33%",
          },
        },
        {
          dataField: "status",
          label: "Status",
          lookupData: QUEUE_STATUS,
          objectKey: "name",
          filterConfig: "select",
          filterLabel: "Filter by status",
          filterValue: "",
          type: "lookup_badge",
          styles: {
            width: "10%",
          },
        },
        {
          dataField: "subCategory",
          styles: {
            width: "7%",
          },
          label: "Actions",
          actions: [
            {
              label: "Delete",
              className: "btn btn-danger btn-sm me-2",
              icon: true,
              iconClass: "fa fa-trash",
            } /* { label: 'Edit', className: "btn btn-primary btn-sm", icon: true, iconClass: "fa fa-pencil-square-o" } */,
          ],
          type: "action",
        },
      ],
      isModalOpen: false,
      isDeleteModalOpen: false,
      formValues: {
        customer: "",
        prescription: "",
        note: "",
        id: null,
        first_name: "",
        email: "",
        mobile: "",
        address_line1: "",
      },
      customerFormValues: {
        first_name: "",
        email: "",
        mobile: "",
        address_line1: "",
      },
      customer: "",
      customerLookup: [],
      filteredCustomers: [],
    };
    this.props.setBData([
      {
        label: "App",
        link: "",
        active: false,
      },
      {
        label: "Dashboard",
        link: "",
        active: false,
      },
      {
        label: "Queue",
        link: "",
        active: true,
      },
    ]);
  }
  UNSAFE_componentWillMount() {
    //this.props.fetchCategoryData();
    //this.props.fetchParentCategoryData();
    //this.getCustomerLookup();
    //this.getPrescriptionLookup();
  }
  /***
   * get customer detsils
   */
  getCustomerLookup() {
    getCall(BASE_URL + `api/users/get-customers/`)
      .then((r) => {
        this.setState((state) => ({
          customerLookup: r.data,
        }));
      })
      .catch((er) => {});
  }
  inputChangedHandler = (controlName, event) => {
    if (controlName === "mobile") {
      postCall(BASE_URL + `api/common/check-customer-mobile-exist/`, {
        email: event.target.value,
      })
        .then((r) => {
          if (r.data["exist"]) {
            this.setState({ customerExist: true, mobileExist: false });
          } else {
            this.setState({ mobileExist: false, customerExist: false });
          }
        })
        .catch((er) => {
          this.setState({ mobileExist: true, customerExist: false });
        });
    } else {
      if (this.source) {
        this.source.cancel("Operation canceled due to new request.");
      }
      this.source = axios.CancelToken.source();
      postCall(
        BASE_URL + `api/common/check-customer-email-exist/`,
        { email: event.target.value },
        { cancelToken: this.source.token }
      )
        .then((r) => {
          if (r.data["exist"]) {
            this.setState({ customerExist: true, emailExist: false });
          } else {
            this.setState({ emailExist: false, customerExist: false });
          }
        })
        .catch((er) => {
          this.setState({ emailExist: true, customerExist: false });
        });
    }
  };
  toggle(event) {
    event.preventDefault();
    this.setState((state) => ({
      isModalOpen: !state.isModalOpen,
      isEditAction: false,
      formValues: {
        customer: "",
        note: "",
        id: null,
      },
    }));
  }
  deleteToggle(event) {
    event.preventDefault();
    this.setState((state) => ({
      isDeleteModalOpen: !state.isDeleteModalOpen,
    }));
  }
  showCustomerToggle(event) {
    event.preventDefault();
    this.setState((state) => ({
      isCustomerModalOpen: !state.isCustomerModalOpen,
    }));
  }

  addCustomerHandler = (event, values) => {
    event.preventDefault();
    values["username"] = values["email"];
    values["customer"] = true;
    postCall(BASE_URL + `api/users/`, values)
      .then((r) => {
        let user = r.data.user;
        let customerLookup = this.state.customerLookup;
        customerLookup.push({
          id: user.id,
          first_name: user.first_name,
        });
        this.setState((state) => ({
          isCustomerModalOpen: !state.isCustomerModalOpen,
          customerLookup: customerLookup,
          customer: user.id,
        }));
      })
      .catch((er) => {});
  };
  deleteHandler = (event, values) => {
    event.preventDefault();
    let selectedId = this.state.formValues.id;
    if (selectedId) {
      deleteCall(BASE_URL + `api/queue/${selectedId}/`)
        .then((r) => {
          this.setState((state) => ({
            isDeleteModalOpen: !state.isDeleteModalOpen,
          }));
          this.smartTable.fetchRecords(0, this.recordPerPage);
        })
        .catch((er) => {});
    }
  };

  submitHandler = (event, values) => {
    event.preventDefault();
    let selectedId = this.state.formValues.id;
    values["customer"] = this.state.customer ? this.state.customer.id : null;
    if (!values["customer"]) {
      if (!values["email"] && !values["mobile"]) {
        toast.error("Please add customer details");
        return;
      }
    }
    if (selectedId) {
      putCall(BASE_URL + `api/queue/${selectedId}/`, values)
        .then((r) => {
          this.setState((state) => ({
            isModalOpen: !state.isModalOpen,
          }));
          this.smartTable.fetchRecords(0, this.recordPerPage);
        })
        .catch((er) => {});
    } else {
      postCall(BASE_URL + "api/queue/", values)
        .then((r) => {
          this.setState((state) => ({
            isModalOpen: !state.isModalOpen,
          }));
          this.smartTable.fetchRecords(0, this.recordPerPage);
        })
        .catch((er) => {});
    }
  };

  actionHandler = (param) => {
    if (param.label === "Edit") {
      this.setState((state) => ({
        isModalOpen: !state.isModalOpen,
        formValues: param.rowData,
        customer: param.rowData.customer,
        isEditAction: true,
      }));
    } else {
      this.setState((state) => ({
        isDeleteModalOpen: !state.isDeleteModalOpen,
        formValues: param.rowData,
      }));
    }
  };
  autoCompleteChange(e) {
    this.setState({
      customer: e.value,
    });
  }
  searchCustomer(event) {
    if (!event.query.trim().length) {
      this.setState((state) => ({
        filteredCustomers: [],
      }));
    } else {
      getCall(BASE_URL + `api/users/get-customers/?searchText=${event.query}`)
        .then((r) => {
          this.setState((state) => ({
            filteredCustomers: r.data,
          }));
        })
        .catch((er) => {
          this.setState((state) => ({
            filteredCustomers: [],
          }));
        });
    }
  }
  notify = (msg) => toast(msg);
  render() {
    return (
      <React.Fragment>
        <div className="row mt-2 p-3">
          <div className="col">
            <h4 className="">
              Queue
              <button
                onClick={this.toggle}
                className="btn btn-primary btn-sm float-end"
                type="button"
              >
                Add
              </button>
            </h4>
            <SmartTable
              colFilter={true}
              ref={(instance) => {
                this.smartTable = instance;
              }}
              fetchUrl="api/queue/"
              dataItem={this.props.category}
              actionHandler={this.actionHandler}
              recordPerPage={this.recordPerPage}
              cols={this.state.columns}
            />
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} size="lg" toggle={this.toggle}>
          <AvForm
            onValidSubmit={this.submitHandler}
            model={this.state.formValues}
          >
            <ModalHeader toggle={this.toggle}>
              {this.state.formValues.id ? "Edit Queue" : "Add Queue"}
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-lg-12">
                  <p>Customer Details</p>
                  <div className="form-group">
                    <AutoComplete
                      placeholder="Search Customer"
                      value={this.state.customer}
                      appendTo="self"
                      inputClassName="autocomplete"
                      suggestions={this.state.filteredCustomers}
                      completeMethod={this.searchCustomer}
                      field="first_name"
                      onSelect={this.autoCompleteChange.bind(this)}
                    />
                  </div>
                </div>{" "}
                {!this.state.isEditAction && (
                  <React.Fragment>
                    <div className="separator">OR</div>
                    {this.state.customerExist && (
                      <div className="col-lg-12 mt-1">
                        <p>
                          Customer Already exist with below mobile/email, Please
                          use above search
                        </p>
                      </div>
                    )}
                    <div className="col-lg-6 mt-1">
                      <div className="form-group">
                        <AvInput
                          bsSize="sm"
                          type="text"
                          name="first_name"
                          className="form-control sm bs"
                          placeholder="Please enter the name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="form-group">
                        <AvInput
                          bsSize="sm"
                          type="text"
                          onChange={this.inputChangedHandler.bind(
                            this,
                            "email"
                          )}
                          name="email"
                          className="form-control sm bs"
                          placeholder="Please enter the email"
                        />
                        {this.state.emailExist && (
                          <p className="text-danger">Email already exist</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <AvInput
                          bsSize="sm"
                          type="text"
                          name="mobile"
                          onChange={this.inputChangedHandler.bind(
                            this,
                            "mobile"
                          )}
                          validate={{ pattern: { value: /^\d{10}$/ } }}
                          className="form-control sm bs"
                          placeholder="Please enter the mobile"
                        />
                        {this.state.mobileExist && (
                          <p className="text-danger">Mobile already exist</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <AvInput
                          bsSize="sm"
                          type="textarea"
                          name="address_line1"
                          className="form-control"
                          placeholder="Please enter the address"
                        />
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                )}
                <p>Queue Details</p>
                <div className="col-lg-12">
                  <div className="form-group">
                    <AvInput
                      bsSize="sm"
                      type="textarea"
                      name="note"
                      className="form-control"
                      placeholder="Please enter note"
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Close
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={this.state.mobileExist || this.state.emailExist}
              >
                Save
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.deleteToggle}>
          <AvForm
            onValidSubmit={this.deleteHandler}
            model={this.state.formValues}
          >
            <ModalHeader toggle={this.deleteToggle}>Delete Queue</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-12">
                  <h3 className="text-center">
                    Are you sure?
                    <br />
                    You want to delete this queue!
                  </h3>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.deleteToggle}>
                Close
              </Button>
              <Button color="danger" type="submit">
                Delete
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal
          isOpen={this.state.isCustomerModalOpen}
          toggle={this.showCustomerToggle}
        >
          <AvForm
            onValidSubmit={this.addCustomerHandler}
            model={this.state.customerFormValues}
          >
            <ModalHeader toggle={this.showCustomerToggle}>
              Add Customer
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <AvInput
                      bsSize="sm"
                      type="text"
                      name="first_name"
                      required
                      className="form-control sm"
                      placeholder="Please enter the name"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <AvInput
                      bsSize="sm"
                      type="text"
                      onChange={this.inputChangedHandler.bind(this)}
                      name="email"
                      className="form-control sm"
                      placeholder="Please enter the email"
                    />
                    {this.state.emailExist && (
                      <p className="text-danger">Email already exist</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <AvInput
                      bsSize="sm"
                      type="text"
                      name="mobile"
                      required
                      validate={{ pattern: { value: /^\d{10}$/ } }}
                      className="form-control sm"
                      required
                      placeholder="Please enter the mobile"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <AvInput
                      bsSize="sm"
                      type="textarea"
                      name="address_line1"
                      className="form-control"
                      placeholder="Please enter the address"
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.showCustomerToggle}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Add
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.Queue.queue,
  };
};
export default connect(mapStateToProps, { setBData, createQueue })(Queue);
