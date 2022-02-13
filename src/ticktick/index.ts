import { appId, containerMain, root } from "src/ticktick/common/constants";
import { state, syncState } from "src/common";
import { getStylesHTML } from "src/ticktick/utils/styles";
import { renderApp } from "src/ticktick/components/app/app";

declare const chrome: any;

syncState()
  .then(() => {
    const styles = document.createElement("style");
    styles.innerHTML = getStylesHTML();

    document.head.appendChild(styles);

    renderApp().then((app) => {
      document.getElementById(appId)?.remove();

      if (state.isPluginOn && root && containerMain) {
        root.insertBefore(app, containerMain);
      }
    });
  })
  .catch(console.error);
