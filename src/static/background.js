function executeScript() {
  chrome.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then(([currentTab]) => {
      if (!currentTab) {
        return;
      }

      const currentURL = new URL(currentTab.url);

      if (currentURL.hostname === "ticktick.com") {
        chrome.scripting.executeScript({
          target: {
            tabId: currentTab.id,
          },
          files: ["ticktick.js"],
        });
      }
    })
    .catch(console.error);
}

chrome.tabs.onUpdated.addListener(executeScript);
chrome.storage.onChanged.addListener(executeScript);
