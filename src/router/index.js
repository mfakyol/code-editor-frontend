import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "../components/layouts/Main";
import MainPublic from "../components/layouts/MainPublic";
import PrivateHome from "../components/views/PrivateHome/PrivateHome";
import Home from "../components/views/public/Home/Home";
import Header from "../components/views/public/Header/Header";
import Footer from "../components/views/public/Footer/Footer";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/code/:path?" /* <----- admin/:path? */>
          <Main>
            <Switch>
              <Route path="/code" exact component={PrivateHome} />
            </Switch>
          </Main>
        </Route>

        <Route>
          <Switch path="/">
            <MainPublic>
              <Header/>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={PrivateHome} />
                <Route path="/contact" exact component={PrivateHome} />
                <Route path="/signup" exact component={PrivateHome} />
              </Switch>
              <Footer/>
            </MainPublic>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
};
