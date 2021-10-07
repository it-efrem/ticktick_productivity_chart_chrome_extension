import {useCssClass} from "../../utils/styles";
import {dayMilliseconds, getData, getDateFormatted} from "../../utils/date";
import {renderRow} from "../row/row";
import {renderCell} from "../cell/cell";
import {appId} from "../../common/constants";
import './app.styles';

export const renderApp = async (app) => {
  app.id = appId;

  useCssClass(app, 'app');

  const dataByDates = await getData();

  const row = renderRow();

  let expectedDay = getDateFormatted(Date.now());

  for (let i = 0; i < dataByDates.length;) {
    const [date, data] = dataByDates[i];

    if (new Date(expectedDay).getTime() > new Date(date).getTime()) {
      const cell = renderCell(expectedDay, null);
      row.appendChild(cell);
    } else {
      const cell = renderCell(expectedDay, data);
      row.appendChild(cell);
      i++;
    }

    expectedDay = getDateFormatted(new Date(expectedDay).getTime() - dayMilliseconds);
  }

  app.appendChild(row);
}
