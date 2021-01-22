import React, { useState, useEffect } from "react";
import Editor from "../Editor/Editor";
import Result from "../Result/Result";
import classes from "./style.module.css";

export default function CodeEditor() {
  const [template, setTemplate] = useState("");
  const [style, setStyle] = useState("");
  const [script, setScript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  let templateMode = "xml";
  let styleMode = "css";
  let scriptMode = "javascript";
  let templatePreProcessor = "";
  let stylepreProcessor = "";
  let scriptPreProcessor = "";

  useEffect(() => {
    // write compile func for all types

    const timeout = setTimeout(() => {
      setSrcDoc(`
         <html>
           <body>${template}</body>
           <style>${style}</style>
           <script>${script}</script>
         </html>`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [template, style, script]);

  return (
    <>
      <div className={classes["editors"]}>
        <Editor
          mode={templateMode}
          title="HTML"
          editorPrefix="html"
          preProcessor={templatePreProcessor}
          value={template}
          onBeforeChange={setTemplate}
        />
        <Editor
          mode={styleMode}
          title="CSS"
          editorPrefix="css"
          preProcessor={stylepreProcessor}
          value={style}
          onBeforeChange={setStyle}
        />
        <Editor
          mode={scriptMode}
          title="JS"
          editorPrefix="js"
          preProcessor={scriptPreProcessor}
          value={script}
          onBeforeChange={setScript}
        />
      </div>
      <Result srcDoc={srcDoc} />
    </>
  );
}
