//import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './helpers/axiosInterceptors';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { getUserToken } from './helpers/authUtils';
import { postCall } from './helpers/axiosUtils';
import { BASE_URL } from './helpers/constants';
import './App.scss';
//import './app.css';
import { Cookies } from "react-cookie";

// app inital context
function initalRender(data) {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={configureStore()}>
        <App userData={data} />
      </Provider>
    </React.Fragment>,
    document.getElementById('root')
  );
}
function deleteAllCookies() {
  return new Promise((resolve, reject) => {
    let cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    resolve(true)
  })

}

let token = getUserToken();
if (token) {
  let data = `{"token":"${token}"}`;
  postCall(`${BASE_URL}api-token-refresh/`, data).then(r => {
    initalRender(r.data.user)
  }).catch(error => {
    deleteAllCookies().then(r => {
      initalRender(null)
    });
  })
}
else {
  initalRender(null);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
