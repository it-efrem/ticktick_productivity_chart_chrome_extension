import { appHeight } from "src/ticktick/components/app/app.styles";
import { createCssClass } from "src/ticktick/utils/styles";

createCssClass("container-main", {
  "max-height": `calc(100% - ${appHeight}px)`,
});
