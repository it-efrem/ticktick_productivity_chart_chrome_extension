chrome.tabs.onUpdated.addListener((async()=>{const[e]=await chrome.tabs.query({active:!0,currentWindow:!0});e&&"ticktick.com"===new URL(e.url).hostname&&chrome.scripting.executeScript({target:{tabId:e.id},files:["index.js"]})}));