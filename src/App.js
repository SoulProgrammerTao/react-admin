import React from 'react';
import Index from "./views/index/Index";
import Login from "./views/login/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Index}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
