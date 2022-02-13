import { apiUrl } from "src/ticktick/api";

export type Project = {
  closed: boolean;
  color: string;
  etag: string;
  id: string;
  inAll: boolean;
  isOwner: boolean;
  kind: string;
  modifiedTime: string;
  muted: boolean;
  name: string;
  sortOrder: number;
  sortType: string;
  userCount: number;
  viewMode: string;
};

export type Projects = Record<string, Project | undefined>;

export const getProjects = async () => {
  return fetch(`${apiUrl}/projects`, {
    credentials: "include",
    headers: {
      accept: "application/json, text/plain, */*",
    },
  })
    .then((response) => response.json())
    .then((items: Project[]) => {
      return items.reduce<Projects>((acc, item) => {
        acc[item.id] = item;

        return acc;
      }, {});
    });
};
