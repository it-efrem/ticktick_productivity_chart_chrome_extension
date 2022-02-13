import "src/ticktick/components/app/app.styles";
import { appId, root } from "src/ticktick/common/constants";
import {
  dayMilliseconds,
  dayWidth,
  getDateFormatted,
} from "src/ticktick/utils/date";
import { getProjects } from "src/ticktick/api/projects";
import { getProjectsByDays } from "src/ticktick/utils/projectsByDays";
import { getTasks } from "src/ticktick/api/tasks";
import { renderCell } from "src/ticktick/components/cell/cell";
import { renderRow } from "src/ticktick/components/row/row";
import { setState, state } from "src/common";
import { useCssClass } from "src/ticktick/utils/styles";

export const renderApp = async () => {
  const app = document.createElement("div");
  app.id = appId;
  useCssClass(app, "app");

  const daysCount = Math.floor((root?.clientWidth || 0) / dayWidth) - 1;

  const [tasks, projects] = await Promise.all([
    getTasks(daysCount),
    getProjects(),
  ]);

  const projectNames = Object.fromEntries(
    Object.entries(projects).map(([id, project]) => [id, project?.name])
  );
  setState({ lists: projectNames });

  const projectsEnabled = Object.fromEntries(
    Object.entries(projects).filter(([id]) => {
      return state.includeLists[id];
    })
  );
  const { maxDayDuration, projectsByDays } = getProjectsByDays(
    tasks,
    projectsEnabled
  );
  const row = renderRow();
  let expectedDay = getDateFormatted(Date.now());

  for (let i = 0; i < projectsByDays.length; ) {
    const [date, tasks] = projectsByDays[i];

    if (new Date(expectedDay).getTime() > new Date(date).getTime()) {
      const cell = renderCell(expectedDay);
      row.appendChild(cell);
    } else {
      const cell = renderCell(expectedDay, maxDayDuration, tasks);
      row.appendChild(cell);
      i++;
    }

    expectedDay = getDateFormatted(
      new Date(expectedDay).getTime() - dayMilliseconds
    );
  }

  app.appendChild(row);

  return app;
};
