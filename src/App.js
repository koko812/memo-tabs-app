// src/App.js
import { useState } from 'react';

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'メモ1', content: '' },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);

  const handleAddTab = () => {
    const newId = Date.now(); // 簡易的なユニークID
    setTabs([...tabs, { id: newId, title: `メモ${tabs.length + 1}`, content: '' }]);
    setActiveTabId(newId);
  };

  const handleTabClick = (id) => {
    setActiveTabId(id);
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>📝 タブ付きメモ帳</h1>

      {/* タブバー */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              padding: '0.5rem 1rem',
              fontWeight: tab.id === activeTabId ? 'bold' : 'normal',
              backgroundColor: tab.id === activeTabId ? '#dfe6e9' : '#f1f2f6',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          >
            {tab.title}
          </button>
        ))}
        <button onClick={handleAddTab}>＋</button>
      </div>

      {/* メモ本文（まだ編集できない） */}
      <div>
        <h2>{activeTab.title}</h2>
        <p>（ここに本文が入る予定）</p>
      </div>
    </div>
  );
}

export default App;
