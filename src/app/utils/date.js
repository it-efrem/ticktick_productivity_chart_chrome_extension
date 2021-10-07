export const dayWidth = 16;
export const dayMilliseconds = 1000 * 60 * 60 * 24;

export const getDateFormatted = (milliseconds, withTime = false) => {
  const date = new Date(milliseconds);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}${withTime ? ' 00:00:00' : ''}`;
}

export const getData = async () => {
  const taskListView = document.getElementById('task-list-view');
  const daysCount = Math.floor(taskListView.clientWidth / dayWidth) - 1;

  const params = {
    from: getDateFormatted(Date.now() - daysCount * dayMilliseconds, true),
    to: getDateFormatted(Date.now() + dayMilliseconds, true),
    limit: 100000,
  }

  return fetch(`https://api.ticktick.com/api/v2/project/all/completed?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`, {
    credentials: "include",
    accept: "application/json, text/plain, */*",

  }).then(response => response.json())
    .then(items => {
      return Object.entries(items.reduce((acc, item) => {
        const date = getDateFormatted(new Date(item.completedTime).getTime());

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(item);
        return acc;
      }, {})).sort((([a], [b]) => {
        return new Date(a).getTime() < new Date(b).getTime() ? 1 : -1
      }))
    })
}
