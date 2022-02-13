import { setState, state, syncState } from "src/common";

syncState().then(render);

const ids = {
  plugin_status: "plugin_status",
  plugin_button: "plugin_button",
  list: "list",
};

function render() {
  renderPluginStatus();
  renderPluginButton();
  renderList();
}

function renderPluginStatus() {
  const el = document.getElementById(ids.plugin_status);

  if (!el) {
    return;
  }

  if (state.isPluginOn) {
    el.textContent = "ON";
    el.className = "plugin_on";
  } else {
    el.textContent = "OFF";
    el.className = "plugin_off";
  }
}

function pluginButtonClickHandler() {
  setState({ isPluginOn: !state.isPluginOn }).then(render);
}

function renderPluginButton() {
  const el = document.getElementById(ids.plugin_button);

  if (!el) {
    return;
  }

  el.removeEventListener("click", pluginButtonClickHandler);
  el.addEventListener("click", pluginButtonClickHandler);

  if (state.isPluginOn) {
    el.textContent = "turn OFF";
  } else {
    el.textContent = "turn ON";
  }
}

function listClickHandler(event: Event) {
  if (event.target) {
    // @ts-ignore
    const id = event.target.getAttribute("data-id");

    if (id) {
      setState({
        includeLists: {
          ...state.includeLists,
          [id]: !state.includeLists[id],
        },
      }).then(render);
    }
  }
}

function renderList() {
  const el = document.getElementById(ids.list);

  if (!el) {
    return;
  }

  el.replaceChildren();
  el.removeEventListener("click", listClickHandler);
  el.addEventListener("click", listClickHandler);

  if (state.lists) {
    const countLists = Object.keys(state.lists).length;
    const selectHeight = Math.max(75, countLists * 17);

    Object.entries(state.lists).forEach(([id, listName]) => {
      const option = document.createElement("div");
      option.setAttribute("data-id", id);
      option.textContent = listName;

      if (state.includeLists[id]) {
        option.className = "selected";
      }

      el.appendChild(option);
    });
  }
}
