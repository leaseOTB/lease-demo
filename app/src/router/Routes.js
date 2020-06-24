import React from "react";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";

import LeaseSearch from "../views/LeaseSearch";
import LeaseNew from "../views/LeaseNew.js";
import LeasePending from "../views/LeasePending";
import LeasePage from "../views/LeasePage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LeaseSearch />
        </Route>
        <Route exact path="/send">
          <LeaseNew />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
