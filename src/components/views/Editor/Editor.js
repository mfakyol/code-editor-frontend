import React from "react";
import classes from './style.module.css'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled } from "react-codemirror2";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag.js";

export default function Editor(props) {
  const { title, mode, onBeforeChange, preProcessor, editorPrefix, value } = props;

  return (
    <div className={`${classes[`${editorPrefix}-editor`]} ${classes["editor"]}`}>
      <div className={classes["header"]}><h3 className={classes["editor-title"]}>{title}</h3> </div>
     <hr/>
      <Controlled
        onBeforeChange={(editor, data, value) => onBeforeChange(value)}
        value={value}
        className="code-mirror-wrapper"
        options={{
          theme: "material-darker",
          lineNumbers: true,
          mode: mode,
          lint: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
        }}
      />
    </div>
  );
}
