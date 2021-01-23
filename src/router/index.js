import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "../components/layouts/Main";
import PrivateHome from "../components/views/PrivateHome/PrivateHome";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="" /* <----- admin/:path? */>  
          <Main>
            <Switch>
              <Route path="/" exact component={PrivateHome} />
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  );
};
