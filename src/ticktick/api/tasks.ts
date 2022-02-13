import { dayMilliseconds, getDateFormatted } from "src/ticktick/utils/date";
import { apiUrl } from "src/ticktick/api";

type TaskResponse = {
  completedTime: string;
  completedUserId: number;
  content: string;
  createdTime: string;
  creator: number;
  deleted: number;
  dueDate?: string;
  etag: string;
  id: string;
  isAllDay: boolean;
  isFloating: boolean;
  kind: string;
  modifiedTime: string;
  priority: number;
  progress: number;
  projectId: string;
  reminder: string;
  repeatFirstDate?: string;
  sortOrder: number;
  startDate?: string;
  status: number;
  timeZone: string;
  title: string;
};

type TasksResponse = TaskResponse[];

export type Task = {
  projectId: string;
  startDate: number;
  dueDate: number;
};

export type Tasks = Array<[string, Array<Task>]>;

export const getTasks = async (daysCount: number) => {
  const params = {
    from: getDateFormatted(Date.now() - daysCount * dayMilliseconds, true),
    to: getDateFormatted(Date.now() + dayMilliseconds, true),
    limit: 100000,
  };

  const url = `${apiUrl}/project/all/completed?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;

  return fetch(url, {
    credentials: "include",
    headers: {
      accept: "application/json, text/plain, */*",
    },
  })
    .then((response) => response.json())
    .then((items: TasksResponse) => {
      return Object.entries(
        items.reduce<Record<string, Task[]>>((acc, item) => {
          if (item.startDate && item.dueDate) {
            const startDateTime = new Date(item.startDate).getTime();
            const dueDateTime = new Date(item.dueDate).getTime();

            const date = item.startDate
              ? getDateFormatted(startDateTime)
              : null;

            if (date) {
              if (!acc[date]) {
                acc[date] = [];
              }

              const task: Task = {
                projectId: item.projectId,
                startDate: startDateTime,
                dueDate: dueDateTime,
              };

              acc[date].push(task);
            }
          }
          return acc;
        }, {})
      )
        .sort(([a], [b]) => {
          return new Date(a).getTime() < new Date(b).getTime() ? 1 : -1;
        })
        .map(([date, tasks]) => {
          return [
            date,
            tasks.sort((a, b) => {
              return a.startDate < b.startDate ? 1 : -1;
            }),
          ] as [string, Array<Task>];
        });
    });
};
