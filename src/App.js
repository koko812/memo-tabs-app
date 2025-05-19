import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './App.module.css';
import PreviewCard from './components/PreviewCard.jsx';
import TabBar from './components/TabBar';
import SearchBar from './components/SearchBar.jsx';
import NoteEditor from './components/NoteEditor.jsx';


// ✅ 1. キャッシュを外で定義（Appの外、ファイル先頭付近）
const previewCache = new Map();

// ✅ 2. fetchPreview関数でキャッシュを活用
const fetchPreview = async (url) => {
  if (previewCache.has(url)) {
    return previewCache.get(url);
  }

  try {
    const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    if (json.status === 'success') {
      previewCache.set(url, json.data);
      return json.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};


function App() {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [nextTabNumber, setNextTabNumber] = useState(1);
  const [editingTabId, setEditingTabId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [linkPreview, setLinkPreview] = useState(null);


  // ✅ 起動時に localStorage から復元 or 初期化
  useEffect(() => {
    try {
      const savedTabs = JSON.parse(localStorage.getItem('tabs'));
      const savedActiveId = localStorage.getItem('activeTabId');
      const savedTabNumber = localStorage.getItem('nextTabNumber');

      if (Array.isArray(savedTabs) && savedTabs.length > 0) {
        setTabs(savedTabs);
        setActiveTabId(Number(savedActiveId));
        setNextTabNumber(Number(savedTabNumber));
      } else {
        throw new Error("No saved tabs");
      }
    } catch {
      const defaultId = Date.now();
      setTabs([{ id: defaultId, title: 'メモ1', content: '' }]);
      setActiveTabId(defaultId);
      setNextTabNumber(2);
    }
  }, []);

  // ✅ 状態が変わるたびに localStorage に保存
  useEffect(() => {
    if (tabs.length > 0) {
      // console.log("🔄 Saving to localStorage...");
      localStorage.setItem('tabs', JSON.stringify(tabs));
      localStorage.setItem('activeTabId', activeTabId ?? '');
      localStorage.setItem('nextTabNumber', nextTabNumber);
    }
  }, [tabs, activeTabId, nextTabNumber]);


  const handleAddTab = () => {
    const newId = Date.now();
    setTabs([
      ...tabs,
      { id: newId, title: `メモ${nextTabNumber}`, content: '' }
    ]);
    setNextTabNumber(n => n + 1);
    setActiveTabId(newId);
  };

  const handleTabClick = (id) => {
    setActiveTabId(id);
  };

  const handleChangeContent = (e) => {
    const updatedContent = e.target.value;
    setTabs(prevTabs =>
      prevTabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, content: updatedContent }
          : tab
      )
    );
  };

  const handleDeleteTab = (id) => {
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== id);
      if (activeTabId === id) {
        const fallbackTab = newTabs[0]?.id ?? null;
        setActiveTabId(fallbackTab);
      }
      return newTabs;
    });
  };

  // 🔍 検索語にマッチした部分を <mark> で囲む
  const highlightMatch = (text, keyword) => {
    if (!keyword) return text;

    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));

    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const filteredTabs = tabs.filter(tab =>
    tab.title.includes(searchText) || tab.content.includes(searchText)
  );

  useEffect(() => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const text = activeTab?.content || '';
    const urls = text.match(urlRegex);

    if (urls && urls.length > 0) {
      const url = urls[0];
      fetchPreview(url).then(setLinkPreview);
    } else {
      setLinkPreview(null);
    }
  }, [activeTab?.content]);


  return (
    <div className={styles.container}>
      <h1>📝 タブ付きメモ帳</h1>
      <h1 className="text-2xl text-blue-600 font-bold">
        Tailwind きてる？🚀
      </h1>

      {/* 検索ボックス */}
      <SearchBar
        searchText={searchText}
        onSearch={setSearchText}
      />

      {/* タブバー */}
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        editingTabId={editingTabId}
        searchText={searchText}
        onTabClick={handleTabClick}
        onTabEdit={setEditingTabId}
        onTabTitleChange={(id, newTitle) =>
          setTabs((prevTabs) =>
            prevTabs.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
          )
        }
        onAddTab={handleAddTab}
        highlightMatch={highlightMatch}
      />

      {/* メモ本文 */}
      {activeTab && (
        <NoteEditor
          activeTab={activeTab}
          searchText={searchText}
          linkPreview={linkPreview}
          onChangeContent={handleChangeContent}
          highlightMatch={highlightMatch}
        />
      )}
    </div>
  );
}

export default App;
