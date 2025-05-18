import { useState, useEffect } from 'react';

function App() {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [nextTabNumber, setNextTabNumber] = useState(1);
  const [editingTabId, setEditingTabId] = useState(null);
  const [searchText, setSearchText] = useState('');

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


  return (
    <div style={{ padding: '1rem' }}>
      <h1>📝 タブ付きメモ帳</h1>
      <input
        type="text"
        placeholder="検索..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          padding: '0.5rem',
          marginBottom: '1.5rem', // ← ✨ ここを調整！
          width: '100%',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />

      {/* タブバー */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {filteredTabs.map(tab => (
          editingTabId === tab.id ? (
            <input
              type="text"
              value={tab.title}
              onChange={(e) => {
                const newTitle = e.target.value;
                setTabs(prevTabs =>
                  prevTabs.map(t =>
                    t.id === tab.id ? { ...t, title: newTitle } : t
                  )
                );
              }}
              onBlur={() => setEditingTabId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditingTabId(null);
                }
              }}
              autoFocus
              style={{ padding: '0.3rem', width: '100px' }}
            />
          ) : (
            <button
              onClick={() => handleTabClick(tab.id)}
              onDoubleClick={() => setEditingTabId(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                fontWeight: tab.id === activeTabId ? 'bold' : 'normal',
                backgroundColor: tab.id === activeTabId ? '#dfe6e9' : '#f1f2f6',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginRight: '0.25rem'
              }}
            >
              {highlightMatch(tab.title, searchText)}
            </button>
          )
        ))}
        <button onClick={handleAddTab}>＋</button>
      </div>

      {/* メモ本文 */}
      {activeTab ? (
        <div>
          <h2>{activeTab.title}</h2>
          <textarea
            value={activeTab.content}
            onChange={handleChangeContent}
            rows={10}
            cols={50}
            style={{ width: '100%', fontSize: '1rem', padding: '0.5rem' }}
          />
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {highlightMatch(activeTab?.content ?? '', searchText)}
          </p>
        </div>
      ) : (
        <p>メモがありません。新しいタブを追加してください。</p>
      )}
    </div>
  );
}

export default App;
