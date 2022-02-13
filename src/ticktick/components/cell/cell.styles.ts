import { dayBorder, dayWidth } from "src/ticktick/utils/date";
import { createCssClass } from "src/ticktick/utils/styles";

createCssClass("cell", {
  position: "relative",
  display: "flex",
  width: `${dayWidth}px`,
  height: "75px",
  border: `${dayBorder}px solid white`,
  "flex-direction": "column-reverse",
});

createCssClass("missed", {
  background: "#ff5050",
  color: "white",
});

createCssClass("dayPart", {
  position: "absolute",
  bottom: "-1.5em",
  display: "flex",
  width: "100%",
  "justify-content": "center",
  "font-size": "0.7em",
});

createCssClass("firstDayPart", {
  background: "#a4d2f7",
});
