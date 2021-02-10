import Axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./style.module.css";
import config from "../../../../config";

export default function CodeMode(props) {
  const [codes, setCodes] = useState([]);
  useEffect(() => {
    async function getCodes() {
      await Axios.get(`${config.apiDomain}/code/codes`, {
        params: { token: JSON.parse(localStorage.getItem("token")) },
      })
        .then((res) => res.data)
        .then(({ status, codes, message }) => {
          console.log(message);
          if (status) {
            setCodes(codes);
          }
        });
    }
    getCodes();
  }, []);

  function setTempLateTitle(mode) {
    switch (mode) {
      case "":
        return "html";
      case "xml":
        return "html";
      case "javascript":
        return "js";
      case "typescript":
        return "Typescript";
      default:
        return mode;
    }
  }

  function setStyleTitle(mode) {
    switch (mode) {
      case "":
        return "css";
      default:
        return mode;
    }
  }

  function setScriptTitle(mode, preprocessor) {
    console.log(mode, preprocessor);
    switch (mode) {
      case "":
        return "javascript";
      case "javascript":
        if (preprocessor === "babel") return "javascript (babel)";
        return "javascript";
      default:
        return mode;
    }
  }

  return (
    <div className={classes["bg"]}>
      <div className={classes["cards"]}>
        {codes.map((code) => (
          <div key={code._id} className={classes["card"]}>
            <h3 title={code.title} className={classes["card-title"]}>
              {code.title}
            </h3>
            <div className={classes["card-body"]}>
              <p className={classes["code-type"]}>
                <i className="fab fa-html5"></i>
                <span>{setTempLateTitle(code.templateMode)}</span>
              </p>

              <p className={classes["code-type"]}>
                <i className="fab fa-css3-alt"></i>
                <span>{setStyleTitle(code.styleMode)}</span>
              </p>
              <p className={classes["code-type"]}>
                <i className="fab fa-js-square"></i>
                <span>
                  {setScriptTitle(code.scriptMode, code.scriptPreprocessor)}
                </span>
              </p>

              <p className={classes["created"]}>
                Created Date: {new Date(code.createdDate).toLocaleDateString()}{" "}
                {new Date(code.createdDate).toLocaleTimeString()}
              </p>
              <p className={classes["last-modified"]}>
                Modified Date:{" "}
                {new Date(code.lastModifiedDate).toLocaleDateString()}{" "}
                {new Date(code.lastModifiedDate).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
