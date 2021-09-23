import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import { createQueue } from "../../redux/actions";
import { connect } from "react-redux";
import {
  postCall,
  putCall,
  deleteCall,
  getCall,
} from "../../helpers/axiosUtils";
import { BASE_URL } from "../../helpers/constants";
import { QUEUE_STATUS } from "../../helpers/appUtils";

import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import { setBData } from "../../redux/actions";

import { toast } from "react-toastify";

export class addQueue extends Component {
  constructor(props) {
    super(props);

    this.searchCustomer = this.searchCustomer.bind(this);
    this.state = {
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
        label: "AddQueue",
        link: "",
        active: true,
      },
    ]);
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

  submitHandler = (event, values) => {
    console.log(values);

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
  render() {
    return (
      <div>
        <AvForm
          onValidSubmit={this.submitHandler}
          model={this.state.formValues}
        >
          <div className="header">
            {this.state.formValues.id ? "Edit Queue" : "Add Queue"}
          </div>
          <div className="addQueueBody">
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
                        onChange={this.inputChangedHandler.bind(this, "email")}
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
                        onChange={this.inputChangedHandler.bind(this, "mobile")}
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
          </div>

          <div className="addQueueFooter">
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
          </div>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.Queue.queue,
  };
};
export default connect(mapStateToProps, { setBData, createQueue })(addQueue);
