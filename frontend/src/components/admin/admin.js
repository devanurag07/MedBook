import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Queue from './queue';
import Dashboard from './dashboard';
import SendPrescription from './sendprescription'
import Subscription from './subscription'
import Customers from './customers'
import Profile from './profile';
import Users from './users';
import Prescription from './prescription'
import DocumentVerifications from './document-verifications'
import Support from './support'
import Membership from './membership'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const loading = () => <div></div>
class Admin extends Component {
    /**
* Returns the layout component based on different properties
* @param {*} props 
*/
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                {/* <Breadcrumb>
                    {this.props.bdata.map((bItem, i) =>
                        <BreadcrumbItem  key={i} active={(this.props.bdata.length -1) == i ? true : false}><a href="#" className="active">{bItem.label}</a></BreadcrumbItem>
                    )}
                </Breadcrumb> */}
                <Switch>
                    <Route exact path="/app" render={() => (<Redirect to="/app/dashboard" />)} />
                    <Route exact path="/app/dashboard" component={Dashboard} />
                    <Route exact path="/app/send-prescription/:id" component={SendPrescription} />
                    <Route exact path="/app/queue" component={Queue} />
                    <Route exact path="/app/profile" component={Profile} />
                    <Route exact path="/app/customer" component={Customers} />
                    <Route exact path="/app/users" component={Users} />
                    <Route exact path="/app/prescriptions" component={Prescription} />
                    <Route exact path="/app/subscription" component={Subscription} />
                    <Route exact path="/app/support" component={Support} />
                    <Route exact path="/app/membership" component={Membership} />                    
                    <Route exact path="/app/document-verification" component={DocumentVerifications} />
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.Auth.user,
        bdata: state.Auth.bdata
    }
}
//export default Admin;
export default connect(mapStateToProps)(Admin);