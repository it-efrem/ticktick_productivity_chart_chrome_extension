declare const chrome: any;

export type List = Record<string, string>;

export const state = {
  isPluginOn: false,
  lists: {} as Record<string, string>, // <id, listName>
  includeLists: {} as Record<string, boolean>, // <id, isEnable>
};

export type State = typeof state;

export function syncState() {
  return new Promise((resolve) => {
    chrome.storage.sync.get((data: State) => {
      Object.keys(state).forEach((key: keyof State | string) => {
        // @ts-ignore
        state[key] = data[key] || state[key];
      });

      resolve(state);
    });
  });
}

export function setState(newState: Record<string, any>) {
  return new Promise((resolve) => {
    Object.assign(state, newState);
    chrome.storage.sync.set(state);

    resolve(state);
  });
}
