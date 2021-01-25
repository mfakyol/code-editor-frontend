import React, { useState, useEffect } from "react";
import Editor from "../Editor/Editor";
import Output from "../Output/Output";
import classes from "./style.module.css";
import getTemplate from "../../../compilers/getTemplate";
import CodeEditorSettings from "../CodeEditorSettings/CodeEditorSettings";

export default function CodeEditor() {
  const [offset, setOffSet] = useState(0);
  const [height, setHeight] = useState(null);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  const [head, setHead] = useState("");
  const [template, setTemplate] = useState("");
  const [style, setStyle] = useState("");
  const [script, setScript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [templateMode, setTemplateMode] = useState("xml");
  const [styleMode, setStyleMode] = useState("css");
  const [scriptMode, setScriptMode] = useState("javascript");

  useEffect(() => {
    // write compile func for all types

    const timeout = setTimeout(() => {
      setSrcDoc(`
         <html>
           <head>
            ${head}
           </head>
           <body>${getTemplate(templateMode, template)}</body>
           <style>${style}</style>
           <script>${script}</script>
         </html>`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [head, templateMode, template, style, script]);

  function dragStart(e) {
    document.addEventListener("mouseover", drag, true);
    setOffSet(
      e.target.previousSibling.getBoundingClientRect().bottom - e.pageY
    );
  }

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mouseover", drag, true);
  });

  function dragEnd(e) {
    document.removeEventListener("mouseover", drag, true);
  }

  function drag(e) {
    console.log(e);
    if (e.pageY > 200) {
      setHeight(e.pageY);
    } else {
      console.log();
      setHeight(200);
    }
  }

  return (
    <>
      <CodeEditorSettings
        settingsIsOpen={settingsIsOpen}
        setSettingsIsOpen={setSettingsIsOpen}
        setHead={setHead}
        template={template}
        setTemplateMode={setTemplateMode}
        setStyleMode={setStyleMode}
        setScriptMode={setScriptMode}
      />
      <div
        style={{ height: height ? height : null }}
        id="editors"
        className={classes["editors"]}
      >
        <Editor
          setSettingsIsOpen={setSettingsIsOpen}
          mode={templateMode}
          editorPrefix="html"
          value={template}
          onBeforeChange={setTemplate}
        />
        <Editor
          setSettingsIsOpen={setSettingsIsOpen}
          mode={styleMode}
          title="CSS"
          editorPrefix="css"
          value={style}
          onBeforeChange={setStyle}
        />
        <Editor
          setSettingsIsOpen={setSettingsIsOpen}
          mode={scriptMode}
          title="JS"
          editorPrefix="js"
          value={script}
          onBeforeChange={setScript}
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
    </>
  );
}
