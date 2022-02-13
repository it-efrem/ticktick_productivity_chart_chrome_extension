import "src/ticktick/components/cell/cell.styles";
import { ProjectInfo } from "src/ticktick/utils/projectsByDays";
import { useCssClass } from "src/ticktick/utils/styles";

export const renderCellPart = (percent: number, color: string) => {
  const part = document.createElement("div");

  part.setAttribute("style", `height: ${percent}%; background: ${color};`);

  return part;
};

export const renderCellDayPart = (day: number, isMissed: boolean) => {
  const part = document.createElement("div");

  part.innerText = day.toString();
  useCssClass(part, "dayPart");

  if (isMissed) {
    useCssClass(part, "missed");
  } else if (day === 1) {
    useCssClass(part, "firstDayPart");
  }

  return part;
};

export const renderCell = (
  expectedDay: string,
  maxDuration?: number,
  projectTask?: Array<ProjectInfo>
) => {
  const day = new Date(expectedDay).getDate();
  const localeDate = new Date(expectedDay).toLocaleDateString();
  const cell = document.createElement("div");
  const timeLog: Record<string, string> = {};

  useCssClass(cell, "cell");

  if (projectTask && maxDuration) {
    const sortedProjectTask = projectTask.sort((a, b) => {
      return Math.abs(a?.sortOrder) > Math.abs(b?.sortOrder) ? 1 : -1;
    });

    sortedProjectTask.forEach((task) => {
      if (task.durationMin) {
        const timePart = Math.min(task.durationMin / maxDuration, 1) * 100;
        const part = renderCellPart(timePart, task.color);
        cell.appendChild(part);

        timeLog[task.projectName] = (task.durationMin / 60).toFixed(1);
      }
    });

    const dayLog = Object.entries(timeLog)
      .map(([name, dur]) => `${name}: ${dur} h`)
      .join("\n");

    cell.title = `${localeDate}\n\n${dayLog}`;
  } else {
    cell.title = `${localeDate}\n\nEmpty`;
  }

  const dayPart = renderCellDayPart(day, !projectTask);
  cell.appendChild(dayPart);

  return cell;
};
