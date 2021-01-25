import React, { useState } from "react";
import classes from "./style.module.css";

export default function CodeEditorSettings(props) {
  const { settingsIsOpen, setSettingsIsOpen, template, setTemplateMode } = props;

  const [menuTab, setMenuTab] = useState(0)

  function selectOnChange(e) {
    setTemplateMode(e.target.value)
  }



  return (
    <div
      style={{ display: settingsIsOpen ? "block" : "none" }}
      className={classes["settings-background"]}
    >
      <div className={classes["settings"]}>
        <h3 className={classes["settings-header"]}>
          <span className={classes["settings-header-title"]}>
            <i className="fas fa-cogs"></i> Editor Settings
          </span>
          <i
            onClick={() => setSettingsIsOpen(false)}
            className="fas fa-times"
          ></i>
        </h3>
        <hr />
        <div className={classes["settings-body"]}>
            <div >
                <ul className={classes["settings-menu"]}>
                  <li >Template</li>
                  <li>Style</li>
                  <li>Script</li>
                </ul>
            </div>
            <div className={classes["settings-content"]}>
                <select name="" defaultValue={template} onChange={selectOnChange}  className={classes["select"]}>
                  <option value="xml">HTML</option>
                  <option value="pug">PUG</option>
                </select>
            </div>
        </div>
      </div>
    </div>
  );
}
