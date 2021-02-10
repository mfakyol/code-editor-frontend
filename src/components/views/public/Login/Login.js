import React, { useState } from "react";
import classes from "./style.module.css";
import config from "../../../../config";
import Axios from "axios";

export default function Login(props) {
  const [info, setInfo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitForm(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      return setInfo("Please fill all fields.");
    }
    Axios.get(`${config.apiDomain}/auth`, { params: { email, password } })
      .then((res) => res.data)
      .then(({ status, message, token }) => {
        if (!status) return setInfo(message);

        localStorage.setItem('token',JSON.stringify(token))
        props.history.push('/code')

      });
  }

  return (
    <div className={classes["login"]}>
      <form onSubmit={submitForm} className={classes["login-form"]}>
        <h2>Login</h2>
        <hr />
        <p
          style={{ display: info ? "block" : "none" }}
          className={classes["danger"]}
        >
          <span>{info}</span>{" "}
          <i onClick={() => setInfo("")} className="fas fa-times"></i>
        </p>
        <p>Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit"> Login</button>
      </form>
    </div>
  );
}
