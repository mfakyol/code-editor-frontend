import React from "react";
import classes from "./style.module.css";

export default function Result({ srcDoc }) {
  return (
    <div className={classes["output"]}>
      <iframe
        title="output"
        sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
        frameBorder="0"
        width="100%"
        height="100%"
        srcDoc={srcDoc}
      />
    </div>
  );
}
