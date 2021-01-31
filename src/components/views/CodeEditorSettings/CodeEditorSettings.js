import React, { useState } from "react";
import classes from "./style.module.css";

export default function CodeEditorSettings(props) {
  const {
    tags,
    setTags,
    settingsIsOpen,
    setSettingsIsOpen,
    templateMode,
    setTemplateMode,
    styleMode,
    scriptMode,
    setStyleMode,
    setScriptMode,
    setStylePreprocessor,
    scriptPreprocessor,
    setScriptPreprocessor,
    menuTab,
    setMenuTab,
  } = props;

  const [tagInput, setTagInput] = useState("");

  function selectTemplate(e) {
    setTemplateMode(e.target.value);
  }

  function selectStyle(e) {
    switch (e.target.value) {
      default:
        setStyleMode(e.target.value);
        setStylePreprocessor("");
        break;
    }
  }

  function selectScript(e) {
    switch (e.target.value) {
      case "javascriptbabel":
        setScriptMode("javascript");
        setScriptPreprocessor("babel");
        break;
      case "typescript":
        setScriptMode("typescript");
        setScriptPreprocessor("");
        break;
      case "coffeescript":
        setScriptMode("coffeescript");
        setScriptPreprocessor("");
        break;
      default:
        setScriptMode(e.target.value);
        setScriptPreprocessor("");
        break;
    }
  }

  function removeTag(index, e) {
    setTags(tags.filter((tag, i) => i !== index));
  }

  function tagInputOnChange(e) {
    setTagInput(e.target.value);
  }

  function keyPress(e) {
    console.log(e.keyCode);
    if (e.keyCode === 13 && tagInput !== "") {
      setTagInput("");
      setTags([...tags, tagInput]);
    }
  }

  function changeTag(index, e) {
    setTags(tags.map((tag, i) => (i === index ? e.target.value : tag)));
  }

  function tagUp(index, e) {
    let t = [...tags];
    const temp = t[index];
    t[index] = t[index - 1];
    t[index - 1] = temp;
    setTags(t);
  }

  function tagDown(index, e) {
    let t = [...tags];
    const temp = t[index];
    t[index] = t[index + 1];
    t[index + 1] = temp;
    setTags(t);
  }

  function closeSettings(e) {
    if (e.target.id === "settings-background") {
      setSettingsIsOpen(false);
    }
  }

  return (
    <div
      id="settings-background"
      onClick={closeSettings}
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
          <div>
            <ul className={classes["settings-menu"]}>
              <li
                className={menuTab === 0 ? classes["active"] : null}
                onClick={() => setMenuTab(0)}
              >
                Template
              </li>
              <li
                className={menuTab === 1 ? classes["active"] : null}
                onClick={() => setMenuTab(1)}
              >
                Style
              </li>
              <li
                className={menuTab === 2 ? classes["active"] : null}
                onClick={() => setMenuTab(2)}
              >
                Script
              </li>
            </ul>
          </div>
          <div className={classes["settings-content"]}>
            <div
              style={{ display: menuTab === 0 ? "block" : "none" }}
              className={classes["template-settings"]}
            >
              <p className={classes["title"]}>Template Mode</p>
              <select
                defaultValue={templateMode}
                onChange={selectTemplate}
                className={classes["select"]}
              >
                <option value="xml">Html</option>
                <option value="pug">Pug</option>
                <option value="markdown">Markdown</option>
              </select>
              <p className={classes["title"]}>Html Tags</p>
              <div
                style={{ display: tags.length > 0 ? "block" : "none" }}
                className={classes["tags"]}
              >
                {tags.map((tag, index) => (
                  <div key={index} className={classes["tag"]}>
                    <input
                      type="text"
                      onChange={changeTag.bind(this, index)}
                      className={classes["tag-content"]}
                      title={tag}
                      value={tag}
                    />
                    <i
                      onClick={tagDown.bind(this, index)}
                      style={{
                        display:
                          index === tags.length - 1 ? "none" : "inline-block",
                      }}
                      className="fas fa-angle-double-down"
                    ></i>
                    <i
                      onClick={tagUp.bind(this, index)}
                      style={{ display: index === 0 ? "none" : "inline-block" }}
                      className="fas fa-angle-double-up"
                    ></i>
                    <i
                      onClick={removeTag.bind(this, index)}
                      className="fas fa-times"
                    ></i>
                  </div>
                ))}
              </div>
              <input
                onChange={tagInputOnChange}
                onKeyDown={keyPress.bind(this)}
                value={tagInput}
                className={classes["input"]}
                placeholder="You can add <title> <meta> <link> <script> tags from here... Press Enter to add."
                type="text"
                name="tagInput"
              />
            </div>
            <div
              style={{ display: menuTab === 1 ? "block" : "none" }}
              className={classes["style"]}
            >
              <p className={classes["title"]}>Style Mode</p>
              <select
                name=""
                defaultValue={styleMode}
                onChange={selectStyle}
                className={classes["select"]}
              >
                <option value="css">Css</option>
                <option value="sass">Sass</option>
                <option value="less">Less</option>
              </select>
            </div>
            <div
              style={{ display: menuTab === 2 ? "block" : "none" }}
              className={classes["style"]}
            >
              <p className={classes["title"]}>Script Mode</p>
              <select
                defaultValue={scriptMode + scriptPreprocessor}
                onChange={selectScript}
                className={classes["select"]}
              >
                <option value="javascript">Javascript</option>
                <option value="javascriptbabel">Javascript(Babel)</option>
                <option value="typescript">Typescript</option>
                <option value="coffeescript">CoffeeScript</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
