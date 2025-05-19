// TabBar.jsx
import React from 'react';

function TabBar({
    tabs,
    activeTabId,
    editingTabId,
    searchText,
    onTabClick,
    onTabEdit,
    onTabTitleChange,
    onAddTab,
    highlightMatch
}) {
    const filteredTabs = tabs.filter(tab =>
        tab.title.includes(searchText) || tab.content.includes(searchText)
    );

    return (
        <div className="flex gap-2 mb-4">
            {filteredTabs.map((tab) =>
                editingTabId === tab.id ? (
                    <input
                        key={tab.id}
                        type="text"
                        value={tab.title}
                        onChange={(e) => onTabTitleChange(tab.id, e.target.value)}
                        onBlur={() => onTabEdit(null)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onTabEdit(null);
                        }}
                        autoFocus
                        className="px-2 py-1 border rounded"
                    />
                ) : (
                    <button
                        key={tab.id}
                        onClick={() => onTabClick(tab.id)}
                        onDoubleClick={() => onTabEdit(tab.id)}
                        className={`px-4 py-2 rounded-md border ${tab.id === activeTabId
                                ? 'bg-blue-100 font-bold text-blue-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {highlightMatch(tab.title, searchText)}
                    </button>
                )
            )}
            <button onClick={onAddTab}>＋</button>
        </div>
    );
}

export default TabBar;
