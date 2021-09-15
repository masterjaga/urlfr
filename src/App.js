import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import Urlvisit from "./components/urlvisit/urlvisit";
import "./App.css";
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" component={Landing} />
            </Switch>
            <Urlvisit />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
