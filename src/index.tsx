import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import App from "./App";
import store from "store/store";
import LoginPage from "pages/Login";
import { PrivateRoute } from "components/shared";

import "antd/dist/antd.css";


let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-right" />
          <Route path='/' exact render={() => <Redirect to='/login' />} />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/admin" component={App} exact />
          <PrivateRoute path="/admin" component={App} />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
