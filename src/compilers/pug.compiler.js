import pug from "pug";

export default (template) => {
  let result = "";
  try {
    result = pug.render(template);
  } catch (error) {
    console.log("pug error");
  }
  return result;
};
