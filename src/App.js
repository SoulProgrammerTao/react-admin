import React from 'react';
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
