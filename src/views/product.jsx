import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import ProHome from "./proHome";
import ProEdit from "./proEdit";
class product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product/edit" component={ProEdit}/>
        <Route path="/product" component={ProHome}/>
        <Redirect to="/product"/>
      </Switch>
    );
  }
}

export default product;