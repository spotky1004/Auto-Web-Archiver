let prevUrl = "";
function archive(tab) {
  try {
    const url = tab.url;
    if (url === prevUrl) return false;
    prevUrl = url;
    fetch(`http://192.168.0.8:8081/?url=${encodeURIComponent(url)}`).catch(e => console.error(e));
    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
}

chrome.tabs.onCreated.addListener(archive);
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) archive(tab);
});
