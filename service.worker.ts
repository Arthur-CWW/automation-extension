// self.addEventListener('fetch', (event) => {
//   const url = event.request.url;

//   if (url.includes('example.com')) {
//     self.clients.matchAll().then((clients) => {
//       clients.forEach((client) => {
//         client.postMessage({ action: 'switchTab' });
//       });
//     });
//   }
// });

// background.ts
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed or updated');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started');
});

function switchToTab(tabId) {
  chrome.tabs.update(tabId, { active: true });
}

function switchToMatchingTab(urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    if (tabs.length > 0) {
      switchToTab(tabs[0].id);
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  // You can also send a response back using the sendResponse function
});
