import {renderApp} from "./components/app/app";
import {getStylesHTML} from "./utils/styles";
import {appId} from "./common/constants";

const root = document.getElementById('root');
const taskListView = document.getElementById('task-list-view');
const header = document.getElementsByTagName('header')[0];

if (root && header) {
  const styles = document.createElement('style');
  styles.innerHTML = getStylesHTML();
  root.appendChild(styles);

  const app = document.createElement('div');
  renderApp(app).then(() => {
    document.getElementById(appId)?.remove();
    taskListView.insertBefore(app, header);
  });
}
