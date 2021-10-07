import {useCssClass} from "../../utils/styles";
import {barMaxTime, targetTimeMin} from "../../common/constants";
import './cell.styles';

export const renderCellTargetTimePart = (position) => {
  const part = document.createElement('div');

  part.style = `bottom: ${position}%`;
  useCssClass(part, 'targetTime');

  return part;
}

export const renderCellPart = (percent, type) => {
  const part = document.createElement('div');

  part.style = `height: ${percent}%`;
  useCssClass(part, type);

  return part;
}

export const renderCellDayPart = (day) => {
  const part = document.createElement('div');

  part.innerText = day;
  useCssClass(part, 'dayPart');

  if (day === 1) {
    useCssClass(part, 'firstDayPart');
  }

  return part;
}

export const renderCell = (expectedDay, data) => {
  const day = new Date(expectedDay).getDate();
  const cell = document.createElement('div');
  useCssClass(cell, 'cell');

  if (data) {
    const goodTime = data.reduce((time, item) => {
      // todo: parse tags
      const timeTag = (item.tags || [])[0];

      let timeMin = 0;

      // todo: universal tag format
      switch (timeTag) {
        case "5_min":
          timeMin = 5;
          break;
        case "30_min":
          timeMin = 30;
          break;
        case "1_h":
          timeMin = 1 * 60;
          break;
        case "2_h":
          timeMin = 2 * 60;
          break;
        case "3_h":
          timeMin = 2 * 60;
          break;
        case "4_h":
          timeMin = 2 * 60;
          break;
        case "5_h":
          timeMin = 5 * 60;
          break;
      }

      return time + timeMin;
    }, 0);
    const badTime = Math.max(targetTimeMin - goodTime, 0);
    const otherTime = barMaxTime - (goodTime + badTime);

    const goodTimePart = Math.min(goodTime / barMaxTime, 1) * 100;
    const badTimePart = Math.min(badTime / barMaxTime, 1) * 100;
    const otherTimePart = Math.min(otherTime / barMaxTime, 1) * 100;


    const goodPart = renderCellPart(goodTimePart, 'goodTime');
    const badPart = renderCellPart(badTimePart, 'badTime');
    const otherPart = renderCellPart(otherTimePart, 'otherTime');

    cell.appendChild(goodPart);
    cell.appendChild(badPart);
    cell.appendChild(otherPart);

    cell.title = `good: ${Math.round(goodTime / 60)}h / bad: ${Math.round(badTime / 60)}h`;
  } else {
    useCssClass(cell, 'missed');
    cell.title = `Missed time`;
  }

  const targetTimePart = Math.min(targetTimeMin / barMaxTime, 1) * 100;
  const targetPart = renderCellTargetTimePart(targetTimePart);
  cell.appendChild(targetPart);

  const dayPart = renderCellDayPart(day);
  cell.appendChild(dayPart);

  return cell;
}
