import React from "react";
import { Link } from "react-router-dom";
import classes from "./style.module.css";

export default function Sidebar({ sidebarIsOpen, setSidebarIsOpen, codes, setNewProjectIsOpen }) {
  return (
    <>
      <div
        onClick={() => setSidebarIsOpen(false)}
        style={{ display: sidebarIsOpen ? "block" : "none" }}
        className={classes["sidebar-bg"]}
      ></div>
      <aside
        style={{ transform: sidebarIsOpen ? "" : "translateX(-305px)" }}
        className={classes["sidebar"]}
      >
          <h2 className={classes["title"]}> My Projects <button onClick={() => setNewProjectIsOpen(true)} className={classes["new-project"]}>New Project</button></h2>
          <hr />
        <div className={classes["my-projects"]}>
          {codes.map((code) => {
            return (
              <Link
                className={classes["link"]}
                key={code._id}
                to={`/code/${code._id}`}
              >
                {code.title}
              </Link>
            );
          })}
        </div>
        <div className={classes["footer"]}>
            <span>{"<Code Editor/>"} © 2021</span>
        </div>
      </aside>
    </>
  );
}
