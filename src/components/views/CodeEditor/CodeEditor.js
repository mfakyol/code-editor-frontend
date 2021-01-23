import React, { useState, useEffect } from "react";
import Editor from "../Editor/Editor";
import Output from "../Output/Output";
import classes from "./style.module.css";

export default function CodeEditor() {
  const [offset, setOffSet] = useState(0);
  const [height, setHeight] = useState(null);

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

  function dragStart(e) {
    
    document.addEventListener("mouseover", drag, true);
    setOffSet(e.target.previousSibling.getBoundingClientRect().bottom - e.pageY);
  }

  document.addEventListener('mouseup', () => {
    document.removeEventListener("mouseover", drag, true);
  })

  function dragEnd(e) {
    document.removeEventListener("mouseover", drag, true);
  }

   function drag(e) {
     console.log(e)
      if(e.pageY> 200){

        setHeight(e.pageY)
      }
      else {
        setHeight(200)
      }

  }

  return (
    <>
      <div style={{height: height ? height : null}} id="editors" className={classes["editors"]}>
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
