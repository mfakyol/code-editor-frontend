import React, { useState, useEffect, useRef } from "react";
import Editor from "../Editor/Editor";
import Output from "../Output/Output";
import classes from "./style.module.css";
import sendCodeToCompile from "../../../../compilers/sendCodeToCompile";
import CodeEditorSettings from "../CodeEditorSettings/CodeEditorSettings";
import Axios from "axios";
import config from "../../../../config";
import Console from "../Console/Console";

export default function CodeEditor(p) {
  const cEditor = useRef(null);
  const editors = useRef(null);

  const [height, setHeight] = useState(null);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [menuTab, setMenuTab] = useState(0);
  const [consoleTab, setConsoleTab] = useState(false);

  const [logs, setLogs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const [tags, setTags] = useState(p.tags);
  const [srcDoc, setSrcDoc] = useState("");

  const [template, setTemplate] = useState(p.template);
  const [style, setStyle] = useState(p.style);
  const [script, setScript] = useState(p.script);

  const [templateMode, setTemplateMode] = useState(p.templateMode || "xml"); //xml
  const [styleMode, setStyleMode] = useState(p.styleMode || "css"); //css
  const [scriptMode, setScriptMode] = useState(p.scriptMode || "javascript"); //javascript

  const [templatePreprocessor, setTemplatePreprocessor] = useState(
    p.templatePreprocessor
  );
  const [stylePreprocessor, setStylePreprocessor] = useState(
    p.stylePreprocessor
  );
  const [scriptPreprocessor, setScriptPreprocessor] = useState(
    p.scriptPreprocessor
  );

  async function compile(mode, preProcessor, code) {
    const { compiledCode, err } = await sendCodeToCompile(
      mode,
      preProcessor,
      code
    );
    if (err) {
      setLogs((prevState) => [
        ...prevState,
        { date: new Date(Date.now()), content: err, type: "error" },
      ]);
    }
    return compiledCode;
  }

  useEffect(() => {
    const handleEvent = (e) => {
      if (e.data.type) {
        let log = {
          type: e.data.type,
          date: new Date(Date.now()),
          content: e.data.arg,
        };
        setLogs((prevState) => [...prevState, log]);
      }
      // ...
    };
    window.addEventListener("message", handleEvent, false);

    return function cleanup() {
      window.removeEventListener("message", handleEvent);
    };
  });

  useEffect(() => {
    // write compile func for all types
    const timeout = setTimeout(async () => {
      setSrcDoc(`
         <html>
           <head>
            ${tags.join("")}
            <script>
             console.log = function(val){window.parent.postMessage({type:"log", arg:[...arguments].join(' ')},"*")}
             console.error = function(val){window.parent.postMessage({type:"error", arg:[...arguments].join(' ')},"*")}
             console.warn = function(val){window.parent.postMessage({type:"warn", arg:[...arguments].join(' ')},"*")}
             </script>
           </head>
           <body>${await compile(
             templateMode,
             templatePreprocessor,
             template
           )}</body>
           <style>${await compile(styleMode, stylePreprocessor, style)}</style>
           <script>${await compile(
             scriptMode,
             scriptPreprocessor,
             script
           )}</script>
         </html>`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    tags,
    templateMode,
    scriptMode,
    styleMode,
    template,
    style,
    script,
    templatePreprocessor,
    stylePreprocessor,
    scriptPreprocessor,
  ]);

  function save() {
    const code = {
      id: p._id,
      template,
      templateMode,
      templatePreprocessor,
      style,
      styleMode,
      stylePreprocessor,
      script,
      scriptMode,
      scriptPreprocessor,
      tags,
      lastModifiedDate: Date.now(),
    };
    setIsSaving(true);
    Axios.put(`${config.apiDomain}/code`, code, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.data)
      .then(({ status }) => {
        let log = {
          type: "save",
          date: new Date(Date.now()),
          content: "Project Saved.",
        };
        if (status) {
          log.content = "Project Saved.";
        }
        setLogs((prevState) => [...prevState, log]);
        setIsSaving(false);
      });
  }

  function dragStart(e) {
    document.addEventListener("mouseover", drag, true);
  }

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mouseover", drag, true);
  });

  function dragEnd(e) {
    document.removeEventListener("mouseover", drag, true);
  }

  function drag(e) {
    if (e.pageY > 200) {
      if (e.pageY > window.innerHeight - 100) {
        editors.current.style.height = window.innerHeight - 160 + "px";
        setHeight(window.innerHeight - 160);
      } else {
        editors.current.style.height = e.pageY - 60 + "px";
        setHeight(e.pageY - 60);
      }
    }
  }

  window.addEventListener("resize", () => {
    if (window.innerHeight - 160 < height) {
      
      setHeight(window.innerHeight - 160);
    }
  });

  return (
    <div className={classes["code-editor"]} ref={cEditor}>
      <CodeEditorSettings
        menuTab={menuTab}
        setMenuTab={setMenuTab}
        tags={tags}
        setTags={setTags}
        settingsIsOpen={settingsIsOpen}
        setSettingsIsOpen={setSettingsIsOpen}
        styleMode={styleMode}
        scriptMode={scriptMode}
        setTemplateMode={setTemplateMode}
        setStyleMode={setStyleMode}
        setScriptMode={setScriptMode}
        setTemplatePreprocessor={setTemplatePreprocessor}
        setStylePreprocessor={setStylePreprocessor}
        setScriptPreprocessor={setScriptPreprocessor}
        templatePreprocessor={templatePreprocessor}
        stylePreprocessor={stylePreprocessor}
        scriptPreprocessor={scriptPreprocessor}
      />
      <div ref={editors} id="editors" className={classes["editors"]}>
        <Editor
          setMenuTab={setMenuTab}
          setSettingsIsOpen={setSettingsIsOpen}
          mode={templateMode}
          editorPrefix="html"
          value={template}
          onBeforeChange={setTemplate}
          preProcessor={templatePreprocessor}
          editorIndex={0}
        />
        <Editor
          setMenuTab={setMenuTab}
          setSettingsIsOpen={setSettingsIsOpen}
          mode={styleMode}
          editorPrefix="css"
          value={style}
          onBeforeChange={setStyle}
          preProcessor={stylePreprocessor}
          editorIndex={1}
        />
        <Editor
          setMenuTab={setMenuTab}
          setSettingsIsOpen={setSettingsIsOpen}
          mode={scriptMode}
          editorPrefix="js"
          value={script}
          onBeforeChange={setScript}
          preProcessor={scriptPreprocessor}
          editorIndex={2}
        />
        <div className={classes["break"]}></div>
      </div>
      <div
        onMouseDown={dragStart}
        onMouseUp={dragEnd}
        className={classes["resizer"]}
      >
        <i className="fas fa-grip-lines"></i>
      </div>
      <Output srcDoc={srcDoc} />
      <div className={classes["bottom-bar"]}>
        <button onClick={save} className={classes["save-button"]}>
          <span style={{ display: isSaving ? "none" : "inline" }}>Save</span>{" "}
          <i
            style={{ display: isSaving ? "inline-block" : "none" }}
            className="fas fa-spinner"
          ></i>
        </button>
        <Console
          logs={logs}
          consoleTab={consoleTab}
          setConsoleTab={setConsoleTab}
        />
      </div>
    </div>
  );
}
