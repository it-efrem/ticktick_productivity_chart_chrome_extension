chrome.tabs.onUpdated.addListener(async () => {
  const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});
  if (!currentTab) {
    return;
  }

  const currentURL = new URL(currentTab.url);

  if (currentURL.hostname === 'ticktick.com') {
    chrome.scripting.executeScript({
      target: {
        tabId: currentTab.id,
      },
      files: ['index.js']
    });
  }
});
