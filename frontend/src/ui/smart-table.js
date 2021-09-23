import React, { Component } from "react";
import { Table } from "reactstrap";
import ActionTemplate from "./actions";
import BadgeTemplate from "./badge";
import "./smartTable.scss";
import PaginationComponent from "react-reactstrap-pagination";
import { getCall } from "../helpers/axiosUtils";
import { BASE_URL } from "../helpers/constants";
import { Input as BootstrapInput, FormGroup, Label } from "reactstrap";
import Input from "./input";

class SmartTable extends Component {
  indexStyle = {
    width: "2%",
  };
  pageSizeOptions = [5, 10, 15, 20, 25];
  filterParams = {};
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1,
      pageSize: this.props.recordPerPage,
      rows: [],
      totalRecords: 0,
      cols: props.cols,
      filterParams: {},
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }
  fetchRecords(offset, end) {
    if (offset == 0 && this.state.selectedPage > 1) {
      this.page = 1;
    }
    if (!this.props.fetchUrl) {
      alert("Please specify the fetchUrl value");
    }

    // To cancel the previous request
    /* if (this.currentRequest) {
            this.currentRequest.unsubscribe();
        } */

    let url = this.constructURL(offset, end);
    this.dataLoading = true;
    this.currentRequest = getCall(url).then((r) => {
      //console.log(r)
      this.setPaginationDetails(r.data);
    });
  }
  constructURL(offset, end, filterParams) {
    let queryParams = {
      offset: offset ? offset : 0,
      limit: end ? end : 10,
      is_web: "True",
    };

    // Constructing url
    let url = BASE_URL + this.props.fetchUrl + "?";

    Object.keys(queryParams).forEach((param) => {
      url += `${encodeURIComponent(param)}=${encodeURIComponent(
        queryParams[param]
      )}&`;
    });
    if (this.props.defaultParam) {
      Object.keys(this.props.defaultParam).forEach((key) => {
        url += `${encodeURIComponent(key)}=${encodeURIComponent(
          this.props.defaultParam[key]
        )}&`;
      });
    }
    if (this.filterParams) {
      Object.keys(this.filterParams).forEach((key) => {
        url += `${encodeURIComponent(key)}=${encodeURIComponent(
          this.filterParams[key]
        )}&`;
      });
    }

    return url;
  }

  setPaginationDetails(data) {
    this.setState({
      rows: data.records,
      totalRecords: data.totalRecords,
    });
  }
  _switchPart(column, data) {
    switch (column.type) {
      case "action": {
        return (
          <ActionTemplate
            data={data}
            actionHandler={this.props.actionHandler}
            column={column}
          />
        );
        break;
      }
      case "lookup_badge": {
        let actualData = data[column.dataField];
        let item = column.lookupData.find((x) => x.id == actualData);
        let itemValue = item[column.objectKey];
        let badgeClassName =
          itemValue === "Open" ? "badge bg-danger" : "badge bg-success";
        return (
          <BadgeTemplate data={itemValue} badgeClassName={badgeClassName} />
        );
        break;
      }
      case "date":
        return new Date(data[column.dataField]).toLocaleString();
        break;
      case "lookup":
        let actualData = data[column.dataField];
        let item = column.lookupData.find((x) => x.id == actualData);
        return item[column.objectKey];
        break;
      case "file":
        let urlData = data[column.dataField];
        if (urlData) {
          return (
            <a href={urlData} target="_blank" download>
              Download
            </a>
          );
        } else {
          return "";
        }
        break;

      default:
        return data[column.dataField];
        break;
    }
  }
  _switchColFilterPart(column) {
    let elementConfig;
    switch (column.filterConfig) {
      case "select":
        elementConfig = {
          options: column.lookupData,
          filterLabel: column.filterLabel,
          optionKey: column.objectKey,
        };
        return (
          <Input
            elementType="select"
            elementClassName="form-select"
            elementConfig={elementConfig}
            value={column.filterValue}
            changed={(event) => this.inputChangedHandler(event, column, this)}
          />
        );
        break;
      default:
        return "";
        break;
    }
  }
  inputChangedHandler = (event, column, self) => {
    /* const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } ); */
    column.filterValue = event.target.value;
    let cols = self.state.cols;
    let index = cols.findIndex((col) => col.dataField == column.dataField);
    cols[index] = { ...column };
    self.setState({
      cols: cols,
    });
    if (column.filterValue !== "false") {
      this.filterParams[column.dataField] = column.filterValue;
    } else {
      delete this.filterParams[column.dataField];
    }
    //this.filterParams[column.dataField] = column.filterValue !=='false' ? column.filterValue : null
    this.fetchRecords(0, this.props.recordPerPage);
  };
  UNSAFE_componentWillMount() {
    this.fetchRecords(0, this.props.recordPerPage);
  }
  pageChanged(selectedPage) {
    console.log("selected", selectedPage);
    this.setState({ selectedPage: selectedPage });
    this.changePage(selectedPage);
  }
  /**
   * pageing action
   * @param {*} page
   */
  changePage(page, pageSize) {
    //setTimthis.page = page.page;
    let startVal =
      (page - 1) * parseInt(pageSize ? pageSize : this.state.pageSize);
    let endVal = startVal + parseInt(pageSize ? pageSize : this.state.pageSize);
    this.fetchRecords(startVal, endVal);
  }
  changeLimit(event) {
    let pageSize = parseInt(event.target.value);
    this.setState({ pageSize: pageSize });
    this.changePage(1, pageSize);
  }
  render() {
    console.log(this.props.cols);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12">
            <Table striped responsive>
              <thead>
                <tr
                  className={
                    this.props.rowPreCls
                      ? this.props.rowPreCls + "HeadRow"
                      : "HeadRow"
                  }
                >
                  {/* <th style={this.indexStyle}>#</th> */}
                  {this.props.cols.map((column, i) => (
                    <th key={i} style={column.styles}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.props.colFilter && (
                  <tr>
                    {this.state.cols.map((column, i) => (
                      <td key={i}>{this._switchColFilterPart(column)}</td>
                    ))}
                  </tr>
                )}
                {this.state.rows.map((rowItem, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      this.props.rowPreCls
                        ? this.props.rowPreCls + "BodyRow"
                        : "BodyRow"
                    }
                  >
                    {/* <td scope="row">{rowIndex + 1}</td> */}
                    {this.props.cols.map((column, i) => (
                      <td key={i}>
                        {/* {rowItem[column.dataField]} */}
                        {this._switchPart(column, rowItem)}
                      </td>
                    ))}
                  </tr>
                ))}
                {this.state.rows.length == 0 && (
                  <tr>
                    <td
                      className="text-center"
                      colSpan={this.props.cols.length + 1}
                    >
                      No records
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="form-group row">
              <label className="col-sm-4 col-form-label col-form-label-sm">
                Size
              </label>
              <div className="col-sm-8">
                <BootstrapInput
                  type="select"
                  className="sm-drop-down bs"
                  value={this.state.pageSize}
                  onChange={this.changeLimit.bind(this)}
                  name="pageSize"
                  bsSize="sm"
                >
                  {this.pageSizeOptions.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </BootstrapInput>
              </div>
            </div>
          </div>
          <div className="col-10">
            <PaginationComponent
              size="sm"
              totalItems={this.state.totalRecords}
              pageSize={this.state.pageSize}
              onSelect={this.pageChanged}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SmartTable;
