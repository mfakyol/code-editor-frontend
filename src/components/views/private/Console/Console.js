import React from "react";
import classes from "./style.module.css";

export default function Console({ logs, consoleTab, setConsoleTab }) {
  function toggleConsole(e) {
    if (e.target.localName === "button") {
      setConsoleTab(!consoleTab);
    }
  }

  return (
    <button onClick={toggleConsole} className={classes["console-button"]}>
      Console
      <div
        style={{ display: consoleTab ? "block" : "none" }}
        className={classes["console"]}
      >
        <h3 className={classes["console-header"]}>Console</h3>
        <hr />
        <div className={classes["console-lines"]}>
          {logs.map((log, index) => (
            <div key={index} className={classes["console-line"]}>
              &gt;{" "}
              <time>
                {`${("0" + log.date.getHours()).slice(-2)}:${(
                  "0" + log.date.getMinutes()
                ).slice(-2)}:${("0" + log.date.getSeconds()).slice(-2)}:${(
                  "00" + log.date.getMilliseconds()
                ).slice(-3)}`}{" "}
                :{" "}
              </time>
              <span
                className={`${
                  log.type === "error"
                    ? classes["error"]
                    : log.type === "log"
                    ? classes["log"]
                    : log.type ==="save" ?  classes["save"] : classes["warn"]
                }`}
              >
                {log.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
