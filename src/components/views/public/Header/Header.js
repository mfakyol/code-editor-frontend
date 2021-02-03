import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./style.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 850) setIsMobile(false);
    else if (window.innerWidth < 850) setIsMobile(true);

    window.addEventListener("resize", (e) => {
      if (window.innerWidth > 850) setIsMobile(false);
      else if (window.innerWidth < 850) setIsMobile(true);
    });
  }, []);

  return (
    <header
      style={{ maxHeight: isOpen ? "1000px" : "71px" }}
      className={classes["header"]}
    >
      <nav className={classes["navbar"]}>
        <Link to="/" className={classes["logo"]}>
          {"<Code Editor/>"}
        </Link>
        <div
          style={{ display: isMobile ? "" : "none" }}
          onClick={() => setIsOpen(!isOpen)}
          className={classes["menu"]}
        >
          <span
            className={`${classes["menu-icon"]} ${
              isOpen ? classes["active"] : ""
            }`}
          ></span>
        </div>
        <div className={classes["nav-items"]}>
          <NavLink
            activeClassName={classes["active"]}
            to="/"
            className={classes["nav-item"]}
          >
            Home
          </NavLink>
          <NavLink to="about" className={classes["nav-item"]}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={classes["nav-item"]}>
            Contact Us
          </NavLink>
        </div>
        <div className={classes["auth"]}>
          <Link className={classes["login"]} to="/login">
            {"<Log In/>"}
          </Link>
          <Link className={classes["signup"]} to="/sigup">
            {"<Sign Up/>"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
