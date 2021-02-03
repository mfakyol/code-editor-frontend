import React from "react";
import { Link } from "react-router-dom";
import classes from "./style.module.css";

export default function Footer() {
  return (
    <div className={classes["footer"]}>
      <div className={classes["footer-wrapper"]}>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        <a href="https://github.com/mfakyol">Github</a>
      </div>
      <p>© 2021 {"<Code Editor/>"}</p>
    </div>
  );
}
