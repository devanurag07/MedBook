
import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from './routes';
import { isUserAuthenticated } from './helpers/authUtils';
import Loadable from 'react-loadable';
import { setLoadingData, loginUserSuccess } from './redux/actions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Lazy loading and code splitting - 
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div></div>

// All layouts/containers
const NonAuthLayout = Loadable({
  loader: () => import('./layout/NonAuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});
const AdminLayout = Loadable({
  loader: () => import('./layout/AdminLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});
/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent 
 */
const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
  return connect()(HOC);
}
class App extends Component {
  /**
 * Returns the layout component based on different properties
 * @param {*} props 
 */
  constructor(props) {
    super(props);
    this.props.loginUserSuccess(props.userData);
  }

  getLayout = (layout) => {
    return layout ? NonAuthLayout : (isUserAuthenticated() ? AdminLayout : NonAuthLayout);
  }
  render() {
    return (
      // rendering the router with layout
      <BrowserRouter>
        <React.Fragment>
          <ToastContainer />
          {routes.map((route, index) => {
            return (
              <route.route
                key={index}
                path={route.path}
                exact={route.exact}
                roles={route.roles}
                userInfo={this.props.user}
                component={withLayout((props) => {
                  const Layout = this.getLayout(route.layout);
                  return (
                    <Suspense fallback={loading()}>
                      <Layout {...props}>
                        <route.component {...props} />
                      </Layout>
                    </Suspense>
                  );
                })}
              />
            );
          })}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    isLoading: state.Auth.isLoading,
    user: state.Auth.user
  }
}
export default connect(mapStateToProps, { setLoadingData, loginUserSuccess })(App);
