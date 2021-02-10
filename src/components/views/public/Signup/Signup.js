import React, { useState } from "react";
import classes from "./style.module.css";
import config from "../../../../config";
import Axios from "axios";

export default function Signup() {
  const [info, setInfo] = useState("");
  const [infoType, setInfoType] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState();

  function submitForm(e) {
    e.preventDefault();
    if (email === "" || fullName === "" || password === "") {
      setInfoType(false);
      setInfo("Please fill all fileds.");
      return;
    }
    setWaiting(true);
    Axios.post(`${config.apiDomain}/auth`, { email, fullName, password })
      .then((res) => res.data)
      .then(({ status, message }) => {
        setWaiting(false);
        if (!status) {
          setInfoType(false);
          setInfo(message);
          return;
        }
        setInfoType(true);
        setInfo(message);
      })
      .catch((e) => {
        setWaiting(false);
        setInfoType(false);
        setInfo("Server error.");
      });
  }

  return (
    <div className={classes["signup"]}>
      <form onSubmit={submitForm} className={classes["signup-form"]}>
        <h2>Sign Up</h2>
        <hr />
        <p
          style={{ display: info ? "block" : "none" }}
          className={`${infoType ? classes["success"] : classes["danger"]}`}
        >
          <span>{info}</span>
          <i onClick={() => setInfo("")} className="fas fa-times"></i>
        </p>
        <p>Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <p>FullName</p>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
        />
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button disabled={waiting} type="submit">
          {" "}
          {waiting ? (
            <i className={`fas fa-spinner ${classes["spinner"]}`}></i>
          ) : (
            "Signup"
          )}
        </button>
      </form>
    </div>
  );
}
