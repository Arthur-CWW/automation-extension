// import { Tab } from '@chrome/tabs';
import { useState } from 'react';
// alias Tab as chrome.tabs.Tab
type Tab = chrome.tabs.Tab;

import './App.css';
import reactLogo from './assets/react.svg';
// function getActiveTabs(name: string) {
async function getActiveTabs(name: string) {
  return new Promise<Tab[]>((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      const filteredTabs = tabs.filter(
        (tab) => tab.title?.includes(name) || tab.url?.includes(name)
      );
      resolve(filteredTabs);
    });
  });
}

function switchTab(tabId: number | undefined) {
  console.log('switching to ', tabId);

  if (!tabId) {
    return;
  }
  chrome.tabs.update(tabId, { active: true });
}

function ExtPopover() {
  const [name, setName] = useState('');
  const [matchedTabs, setMatchedTabs] = useState([] as Tab[]);

  const getDomainFromUrl = (url: string) => {
    const parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-4">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-12 h-12" alt="React logo" />
        </a>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-center">Tab switcher</h1>
      <div className="max-w-md p-4 mx-auto mt-8 bg-gray-100 rounded shadow-md card">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const tabs = await getActiveTabs(name);
            setMatchedTabs(tabs);
            console.log('tabs', tabs);
          }}
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
              className="flex-1 px-4 py-2 border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-purple-500 rounded-r hover:bg-purple-700"
            >
              Find
            </button>
          </div>
        </form>
        {matchedTabs &&
          matchedTabs.map((tab) => (
            <button
              key={tab.id}
              className="flex items-center p-2 mt-4 bg-gray-200 rounded hover:bg-gray-300 w-full"
              onClick={() => switchTab(tab.id)}
            >
              <img src={tab.favIconUrl} alt={tab.title + ' logo'} className="w-8 h-8 " />

              {/* divider */}
              <div className="px-2 py-1 font-bold text-gray-800 hover:text-gray-700 ml-2 border-l border-gray-400 text-left">
                <span className="">{tab.title}</span>
                <p className="text-sm text-gray-600">{getDomainFromUrl(tab.url)}</p>
              </div>
            </button>
          ))}
      </div>
      <p className="mt-4 text-center">Switch tabs</p>
    </>
  );
}
const DummyData = [
  {
    active: true,
    audible: false,
    autoDiscardable: false,
    discarded: false,
    favIconUrl: 'https://chat.openai.com/favicon-32x32.png',
    groupId: -1,
    height: 952,
    highlighted: true,
    id: 1824300468,
    incognito: false,
    index: 13,
    mutedInfo: {
      muted: false,
    },
    pinned: false,
    selected: true,
    status: 'complete',
    title: 'Chrome Extension: YouTube Thumbnail Button',
    url: 'https://chat.openai.com/c/b4318f74-e71f-4048-af18-f15666eda369',
    width: 948,
    windowId: 1824300046,
  },
  {
    active: true,
    audible: false,
    autoDiscardable: false,
    discarded: false,
    favIconUrl: 'https://chat.openai.com/favicon-32x32.png',
    groupId: -1,
    height: 952,
    highlighted: true,
    id: 1824300333,
    incognito: false,
    index: 0,
    mutedInfo: {
      muted: false,
    },
    pinned: false,
    selected: true,
    status: 'complete',
    title: 'New chat',
    url: 'https://chat.openai.com/',
    width: 948,
    windowId: 1824300292,
  },
  {
    active: false,
    audible: false,
    autoDiscardable: false,
    discarded: false,
    favIconUrl: 'https://chat.openai.com/favicon-32x32.png',
    groupId: -1,
    height: 952,
    highlighted: false,
    id: 1824300289,
    incognito: false,
    index: 1,
    mutedInfo: {
      muted: false,
    },
    pinned: false,
    selected: false,
    status: 'complete',
    title: "Gawr Gura's VTuber Debut",
    url: 'https://chat.openai.com/c/f9ec4585-41c0-4fe5-9c37-db8ac3095e44',
    width: 948,
    windowId: 1824300292,
  },
  {
    active: false,
    audible: false,
    autoDiscardable: false,
    discarded: false,
    favIconUrl: 'https://chat.openai.com/favicon-32x32.png',
    groupId: -1,
    height: 952,
    highlighted: false,
    id: 1824299497,
    incognito: false,
    index: 0,
    mutedInfo: {
      muted: false,
    },
    pinned: false,
    selected: false,
    status: 'complete',
    title: 'Chrome Extension: YouTube Thumbnail Button',
    url: 'https://chat.openai.com/c/b4318f74-e71f-4048-af18-f15666eda369',
    width: 1904,
    windowId: 1824300455,
  },
] as readonly Tab[];
export default ExtPopover;
