import { Project, Projects } from "src/ticktick/api/projects";
import { Tasks } from "src/ticktick/api/tasks";

export type ProjectInfo = {
  durationMin: number;
  projectName: string;
  color: string;
  sortOrder: number;
};

export type ProjectsByDays = [string, Array<ProjectInfo>];
export type ProjectByDaysWithMaxDuration = {
  maxDayDuration: number;
  projectsByDays: ProjectsByDays[];
};

export const getProjectsByDays = (
  tasks: Tasks,
  projects: Projects
): ProjectByDaysWithMaxDuration => {
  let maxDayDuration = 0;

  const projectsByDays = tasks.map<ProjectsByDays>(([date, tasks]) => {
    let dayDuration = 0;

    const projectsWithIntervals = tasks.reduce<
      Record<string, [number, number][]>
    >((acc, task) => {
      if (!acc[task.projectId]) {
        acc[task.projectId] = [[task.startDate, task.dueDate]];
      } else {
        const lastIntervalsIdx = acc[task.projectId].length - 1;
        const lastIntervals = acc[task.projectId][lastIntervalsIdx];
        const isInInterval =
          task.startDate <= lastIntervals[1] &&
          task.dueDate >= lastIntervals[1];

        if (isInInterval) {
          acc[task.projectId][lastIntervalsIdx] = [
            Math.min(task.startDate, lastIntervals[0]),
            Math.max(task.dueDate, lastIntervals[1]),
          ];
        } else {
          acc[task.projectId].push([task.startDate, task.dueDate]);
        }
      }
      return acc;
    }, {});

    const projectsWithDuration = Object.entries(projectsWithIntervals).reduce<
      Record<string, number>
    >((acc, [projectId, intervals]) => {
      if (!acc[projectId]) {
        acc[projectId] = 0;
      }

      acc[projectId] = intervals.reduce<number>((acc, interval) => {
        return acc + interval[1] - interval[0];
      }, 0);

      return acc;
    }, {});

    const projectsWithInfo = Object.entries(projectsWithDuration)
      .map<ProjectInfo | null>(([projectId, duration]) => {
        const project = projects[projectId];

        if (project) {
          const durationMin = duration / 1000 / 60;

          dayDuration += durationMin;

          return {
            durationMin,
            projectName: project.name,
            color: project.color,
            sortOrder: project.sortOrder,
          };
        }
        return null;
      })
      // @ts-ignore
      .filter<ProjectInfo>((project) => Boolean(project));

    maxDayDuration = Math.max(maxDayDuration, dayDuration);

    return [date, projectsWithInfo];
  });

  return {
    maxDayDuration,
    projectsByDays,
  };
};
