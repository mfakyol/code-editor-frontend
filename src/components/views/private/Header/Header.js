import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./style.module.css";

export default function Header({ user, setSidebarIsOpen, sidebarIsOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
 

  function logOut(e) {
    localStorage.removeItem("token");
    history.push("/");
  }

  return (
    <header className={classes["header"]}>
      <nav className={classes["navbar"]}>
        <div className={classes["left-side"]}>
          <div
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            className={classes["menu"]}
          >
            <span
              className={`${classes["menu-icon"]} ${
                sidebarIsOpen ? classes["active"] : ""
              }`}
            ></span>
          </div>
          <Link to="/code" className={classes["logo"]}>
            {"<Code Editor/>"}
          </Link>
        </div>
        <div className={classes["account"]}>
          <img
            onClick={() => setIsOpen(!isOpen)}
            alt=""
            src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          />
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className={classes["account-menu"]}
          >
            <span className={classes["email"]}>{user.email}</span>
            <hr />
            <Link to="/profile">Profile</Link>
            <hr />
            <span onClick={logOut}>Log Out</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
