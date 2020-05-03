import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { DashBoard } from "./components/dashboard";
import { RegisterUser } from "./components/registration";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={RegisterUser} />
      <Route path="/welcome" component={DashBoard} />
    </Switch>
  </BrowserRouter>
);

export default App;
