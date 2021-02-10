import Axios from "axios";
import React, { useState } from "react";
import classes from "./style.module.css";
import config from "../../../../config";
import { useHistory } from "react-router-dom";

export default function NewCode({
  newProjectIsOpen,
  setNewProjectIsOpen,
  setCodes,
  codes,
  setSidebarIsOpen,
}) {
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  let history = useHistory();

  function closeNewCode(e) {
    if (e.target.id === "new-code-bg") {
      setNewProjectIsOpen(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(
      `${config.apiDomain}/code`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
      .then((res) => res.data)
      .then(({ status, code, message }) => {
        if (!status) return setErr(message);
        setNewProjectIsOpen(false);
        setSidebarIsOpen(false);
        setCodes([...codes, code]);
        setTitle("");
        history.push(`/code/${code._id}`);
      })
      .catch((e) => setErr("Server Error."));
  }

  return (
    <div
      id="new-code-bg"
      onClick={closeNewCode}
      style={{ display: newProjectIsOpen ? "block" : "none" }}
      className={classes["bg"]}
    >
      <form onSubmit={submit} className={classes["form"]}>
        <h2 className={classes["form-title"]}>
          <span>New Project</span>
          <i
            onClick={() => setNewProjectIsOpen(false)}
            className="fas fa-times"
          ></i>
        </h2>
        <hr />
        <p>Project Name</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name=""
          id=""
        />
        <p
          className={classes["error"]}
          style={{ display: err ? "block" : "none" }}
        >
          <span> {err}</span>
          <i
            onClick={() => setErr("")}
            className="fas fa-times"
          ></i>
        </p>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
