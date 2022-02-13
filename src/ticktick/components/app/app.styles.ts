import { createCssClass } from "../../utils/styles";

export const appHeight = 100;

createCssClass("app", {
  width: "100%",
  height: `${appHeight}px`,
  display: "flex",
  "justify-content": "center",
});
