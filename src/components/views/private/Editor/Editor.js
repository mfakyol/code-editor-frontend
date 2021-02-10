import React, { useState } from "react";
import classes from "./style.module.css";
import { Controlled } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/pug/pug";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/coffeescript/coffeescript";
import "codemirror/mode/css/css";
import "codemirror/mode/sass/sass";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag.js";

export default function Editor(props) {
  const {
    setSettingsIsOpen,
    setMenuTab,
    mode,
    onBeforeChange,
    editorPrefix,
    value,
    preProcessor,
    editorIndex,
  } = props;

  const [collapsed, setCollapsed] = useState(false);

  function setTemplateTitle(mode) {
    switch (mode) {
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

  function setEditorMode(mode) {
    switch (mode) {
      case "less":
        return "css"   
      default:
        return mode;
    }
  }
  

  function openSettings(tabNumber, e) {
    setMenuTab(tabNumber);
    setSettingsIsOpen(true);
  }

  return (
    <div
      style={{ flexGrow: collapsed ? ".5" : "1" }}
      className={`${classes[`${editorPrefix}-editor`]} ${classes["editor"]}`}
    >
      <div className={classes["editor-header"]}>
        <h3 className={classes["editor-title"]}>
          {setTemplateTitle(mode)}
          {preProcessor ? (
            <span className={classes["editor-preprocessor"]}>
              ({preProcessor})
            </span>
          ) : (
            ""
          )}
        </h3>
        <span className={classes["editor-header-options"]}>
          <i
            onClick={openSettings.bind(this, editorIndex)}
            className="fas fa-cogs"
          ></i>
          <i
            onClick={() => setCollapsed(true)}
            style={{ display: collapsed ? "none" : "inline" }}
            className="fas fa-compress-alt"
          ></i>
          <i
            onClick={() => setCollapsed(false)}
            style={{ display: collapsed ? "inline" : "none" }}
            className="fas fa-expand-alt"
          ></i>
        </span>
      </div>
      <hr />
      <Controlled
        onBeforeChange={(editor, data, value) => onBeforeChange(value)}
        value={value}
        className="code-mirror-wrapper"
        options={{
          theme: "material-darker",
          lineNumbers: true,
          mode: setEditorMode(mode),
          lint: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
        }}
      />
    </div>
  );
}
