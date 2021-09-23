import React from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import { isUserAuthenticated, getLoggedInUser } from "./helpers/authUtils";
// lazy load all the views
const Home = React.lazy(() => import("./components/home/home"));
const PrescriptionPdf = React.lazy(() =>
  import("./components/admin/prescriptionPdf")
);

const Login = React.lazy(() => import("./components/login/login"));
const Logout = React.lazy(() => import("./components/logout/logout"));
const AboutUs = React.lazy(() => import("./components/aboutus"));
const FAQ = React.lazy(() => import("./components/faq"));
const TC = React.lazy(() => import("./components/tc"));
const NS = React.lazy(() => import("./components/support"));
const PAP = React.lazy(() => import("./components/pp"));
const NotFound = React.lazy(() => import("./components/notfound"));
const ContactUs = React.lazy(() => import("./components/contactus"));
const Register = React.lazy(() => import("./components/signup/signup"));
const Admin = React.lazy(() => import("./components/admin/admin"));
const ResetPassword = React.lazy(() => import("./components/reset-password"));
const NonAuthRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isAuthTokenValid = isUserAuthenticated();

      if (
        isAuthTokenValid &&
        (props.location.pathname === "/signup" ||
          props.location.pathname === "/login")
      ) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }
      return <Component {...props} />;
    }}
  />
);

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
const PrivateRoute = ({ component: Component, roles, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isAuthTokenValid = isUserAuthenticated();
      if (!isAuthTokenValid) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      if (isAuthTokenValid) {
        if (
          userInfo &&
          userInfo.role_name === "Doctors" &&
          props.location.pathname !== "/app/subscription" &&
          new Date(userInfo.subscription_active_at) < new Date()
        ) {
          return (
            <Redirect
              to={{
                pathname: "/app/subscription",
                state: { from: props.location },
              }}
            />
          );
        }
        /* else if(userInfo && userInfo.role_name === 'Doctors' && !userInfo.document_verified && props.location.pathname !== '/app/dashboard'){
        return <Redirect to={{ pathname: '/app/dashboard', state: { from: props.location } }} />
      } */
      }
      if (
        isAuthTokenValid &&
        (props.location.pathname === "/signup" ||
          props.location.pathname === "/login")
      ) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }
      return <Component {...props} />;
    }}
  />
);

const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    route: NonAuthRoute,
  },
  { path: "/logout", name: "Logout", component: Logout, route: Route },
  {
    path: "/signup",
    exact: true,
    name: "signup",
    component: Register,
    route: NonAuthRoute,
  },
  {
    path: "/support",
    exact: true,
    name: "signup",
    component: NS,
    route: NonAuthRoute,
  },
  {
    path: "/reset-password",
    exact: true,
    name: "reset-password",
    component: ResetPassword,
    route: NonAuthRoute,
  },
  {
    path: "/about-us",
    layout: "nonAuth",
    exact: true,
    name: "AboutUS",
    component: AboutUs,
    route: Route,
  },
  {
    path: "/faq",
    layout: "nonAuth",
    exact: true,
    name: "FAQ",
    component: FAQ,
    route: Route,
  },
  {
    path: "/term-of-service",
    layout: "nonAuth",
    exact: true,
    name: "TC",
    component: TC,
    route: Route,
  },
  {
    path: "/privacy-policy",
    layout: "nonAuth",
    exact: true,
    name: "PAP",
    component: PAP,
    route: Route,
  },
  {
    path: "/contact-us",
    layout: "nonAuth",
    exact: true,
    name: "ContactUs",
    component: ContactUs,
    route: Route,
  },
  {
    path: "/",
    exact: true,
    name: "home",
    layout: "nonAuth",
    component: Home,
    route: Route,
  },
  { path: "/app", name: "Admin", component: Admin, route: PrivateRoute },
  {
    path: "/pdf",
    name: "Pdf",
    component: PrescriptionPdf,
    route: PrivateRoute,
  },
  {
    path: "notfound",
    name: "notfound",
    exact: true,
    component: NotFound,
    layout: "nonAuth",
    route: Route,
  },
];

export { routes, PrivateRoute };
