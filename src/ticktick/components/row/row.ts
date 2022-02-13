import "src/ticktick/components/row/row.styles";
import { useCssClass } from "src/ticktick/utils/styles";

export const renderRow = () => {
  const row = document.createElement("div");

  useCssClass(row, "row");

  return row;
};
