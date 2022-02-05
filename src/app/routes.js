import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import About from "./view/pages/aboutPage";
import LoginPage from "./view/pages/loginPage";
import DashboardPage from "./view/pages/DashboardPage";
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/about" component={About} />

        <Route path="/" component={DashboardPage} />
      </Switch>
    </div>
  );
};

export default Routes;
