import "src/ticktick/index.styles";
import {
  appId,
  containerMain,
  root,
  stylesId,
} from "src/ticktick/common/constants";
import { getStylesHTML, useCssClass } from "src/ticktick/utils/styles";
import { state, syncState } from "src/common";
import { renderApp } from "src/ticktick/components/app/app";

declare const chrome: any;

function reset() {
  const cn = `${appId}_container-main`;
  containerMain?.classList?.remove(cn);
}

syncState()
  .then(() => {
    document.getElementById(stylesId)?.remove();

    const styles = document.createElement("style");
    styles.innerHTML = getStylesHTML();
    styles.id = stylesId;

    document.head.appendChild(styles);

    renderApp().then((app) => {
      document.getElementById(appId)?.remove();

      if (state.isPluginOn && root && containerMain) {
        root.insertBefore(app, containerMain);
        useCssClass(containerMain, "container-main");
      } else {
        reset();
      }
    });
  })
  .catch((e) => {
    reset();
    console.error(e);
  });
