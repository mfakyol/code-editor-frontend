import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "../components/layouts/Main";
import CodeEditor from "../components/views/CodeEditor/CodeEditor";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="" /* <----- admin/:path? */>  
          <Main>
            <Switch>
              <Route path="/" exact component={CodeEditor} />
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  );
};
