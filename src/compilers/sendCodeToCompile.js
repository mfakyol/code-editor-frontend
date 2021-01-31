import config from "../config";
import Axios from "axios";

export default async (language, preProcessor, code) => {
  switch (language) {
    case "xml":
      return code;
    case "css":
      return code;
    case "javascript":
      if (code === "") return code;
      if (preProcessor === "babel") return fetchCompiledCode("babel", code);
      return code;
    case "typescript":
      return fetchCompiledCode("typescript", code);
    case "CoffeeScript":
      return fetchCompiledCode("coffeescript", code);
    default:
      if (code !== "") return fetchCompiledCode(language, code);
      return code;
  }
};

async function fetchCompiledCode(endpoint, code) {
  let data = await Axios.post(`${config.apiDomain}/compile/${endpoint}`, {
    code,
  })
    .then((res) => res.data)
    .then((data) => data.compiledCode);
  return data;
}
