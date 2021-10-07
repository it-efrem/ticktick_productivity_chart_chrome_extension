import {useCssClass} from "../../utils/styles";
import './row.styles';

export const renderRow = () => {
  const row = document.createElement('div');

  useCssClass(row, 'row');

  return row;
}
