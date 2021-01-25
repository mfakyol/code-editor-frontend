import pugCompiler from "./pug.compiler";

export default (preProcessor, template) => {
  switch (preProcessor) {
    case "pug":
      return pugCompiler(template);
    default:
      return template;
  }
};
