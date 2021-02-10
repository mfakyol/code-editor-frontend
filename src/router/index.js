import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


//public
import Home from "../components/views/public/Home/Home";
import MainPublic from "../components/layouts/MainPublic/MainPublic";
import Login from "../components/views/public/Login/Login";
import Signup from "../components/views/public/Signup/Signup";
import Header from "../components/views/public/Header/Header";
import Footer from "../components/views/public/Footer/Footer";

//Private
import MainPrivate from "../components/layouts/MainPrivate/MainPrivate";
import PrivateHeader from '../components/views/private/Header/Header'
import PrivateSidebar from '../components/views/private/Sidebar/Sidebar'
import NewCode from "../components/views/private/NewCode/NewCode";
import CodePage from "../components/views/private/CodePage/CodePage";
import CodeHome from "../components/views/private/CodeHome/CodeHome";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/code/:path?" /* <----- admin/:path? */>
          <MainPrivate>
            <PrivateHeader/>
            <PrivateSidebar/>
            <NewCode/>
            <Switch>
              <Route path="/code" exact component={CodeHome} />
              <Route path="/code/:codeId" exact component={CodePage} />
            </Switch>
          </MainPrivate>
        </Route>
        <Route>
          <Switch path="/">
            <MainPublic>
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={null} />
                <Route path="/contact" exact component={null} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/login" exact component={Login} />
              </Switch>
              <Footer />
            </MainPublic>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
};
