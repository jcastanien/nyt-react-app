import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nyt from "./pages/Nyt";

import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";


const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Nyt} />
        <Route exact path="/nyt" component={Nyt} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

