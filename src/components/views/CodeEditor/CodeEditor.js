import React, { useState, useEffect } from "react";
import Editor from "../Editor/Editor";
import Output from "../Output/Output";
import classes from "./style.module.css";
import sendCodeToCompile from "../../../compilers/sendCodeToCompile";
import CodeEditorSettings from "../CodeEditorSettings/CodeEditorSettings";

export default function CodeEditor() {
  const [height, setHeight] = useState(null);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [menuTab, setMenuTab] = useState(0);

  const [tags, setTags] = useState([]);
  const [srcDoc, setSrcDoc] = useState("");

  const [template, setTemplate] = useState("");
  const [style, setStyle] = useState("");
  const [script, setScript] = useState("");

  const [templateMode, setTemplateMode] = useState("xml");
  const [styleMode, setStyleMode] = useState("css");
  const [scriptMode, setScriptMode] = useState("javascript");

  const [templatePreprocessor, setTemplatePreprocessor] = useState("");
  const [stylePreprocessor, setStylePreprocessor] = useState("");
  const [scriptPreprocessor, setScriptPreprocessor] = useState("");

  useEffect(() => {
    // write compile func for all types

    const timeout = setTimeout(async () => {
      setSrcDoc(`
         <html>
           <head>
            ${tags.join("")}
           </head>
           <body>${await sendCodeToCompile(
             templateMode,
             templatePreprocessor,
             template
           )}</body>
           <style>${await sendCodeToCompile(
             styleMode,
             stylePreprocessor,
             style
           )}</style>
           <script>${await sendCodeToCompile(
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
      setHeight(e.pageY);
    } else {
      setHeight(200);
    }
  }

  return (
    <>
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
      <div
        style={{ height: height ? height : null }}
        id="editors"
        className={classes["editors"]}
      >
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
    </>
  );
}
