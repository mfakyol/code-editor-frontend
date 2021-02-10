import config from "../config";
import Axios from "axios";

export default async (language, preProcessor, code) => {
  switch (language) {
    case "xml":
      return {compiledCode: code};
    case "css":
      return {compiledCode: code};
    case "javascript":
      if (code === "") return code;
      if (preProcessor === "babel") return fetchCompiledCode("babel", code);
      return {compiledCode: code};
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
  return data;
}
