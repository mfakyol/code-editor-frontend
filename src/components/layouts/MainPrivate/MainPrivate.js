import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import config from "../../../config";
import classes from "./style.module.css";

function MainPrivate(props) {
  let history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) history.push("/");

  const [codes, setCodes] = useState([]);

  const [children] = useState(props.children);
  const [user, setUser] = useState(undefined);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [newProjectIsOpen, setNewProjectIsOpen] = useState(false);

  useEffect(() => {
    async function getUserData() {
      await Axios.get(`${config.apiDomain}/auth/getUser`, {
        params: { token: JSON.parse(localStorage.getItem("token")) },
      })
        .then((res) => res.data)
        .then(({ status, user, message }) => {
          if (status) {
            setUser(user);
            setCodes(user.codes);
          }
        });
    }
    getUserData();
  }, []);

  return user ? (
    <div className={classes["main-private"]}>
      {children.map((c, index) => {
        return React.cloneElement(c, {
          user,
          key: index,
          sidebarIsOpen,
          setSidebarIsOpen,
          newProjectIsOpen,
          setNewProjectIsOpen,
          codes,
          setCodes,
        });
      })}
    </div>
  ) : (
    "loading..."
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    //onExamplefunction: () => dispatch(examplefunction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPrivate);
