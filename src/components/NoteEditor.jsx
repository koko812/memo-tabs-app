import React from 'react';
import ReactMarkdown from 'react-markdown';
import CustomLinkRenderer from './CustomLinkRenderer';

const NoteEditor = ({
    activeTab,
    searchText,
    linkPreview,
    onChangeContent,
    highlightMatch
}) => {
    return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-inner space-y-6">

            {/* タイトル */}
            <h2 className="text-xl font-bold text-gray-800">
                ✏️ 編集中のメモ：{activeTab.title}
            </h2>

            {/* 入力欄 */}
            <textarea
                value={activeTab.content}
                onChange={onChangeContent}
                rows={10}
                className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="ここにメモを書いてください..."
            />

            {/* OGP プレビュー */}
            {linkPreview && (
                <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
                    <a
                        href={linkPreview.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline text-inherit"
                    >
                        <h4 className="text-md font-semibold mb-2">
                            {linkPreview.title || linkPreview.url}
                        </h4>
                        {linkPreview.description ? (
                            <p className="text-gray-700 text-sm mb-2">{linkPreview.description}</p>
                        ) : (
                            <p className="text-gray-400 italic text-sm">説明文は見つかりませんでした</p>
                        )}
                        {linkPreview.image?.url && (
                            <img
                                src={linkPreview.image.url}
                                alt=""
                                className="w-full h-auto rounded max-h-48 object-contain"
                            />
                        )}
                    </a>
                </div>
            )}

            {/* Markdown プレビュー */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📄 プレビュー</h3>
                {searchText ? (
                    <div className="bg-white border border-dashed border-gray-300 p-3 rounded">
                        {highlightMatch(activeTab.content, searchText)}
                    </div>
                ) : (
                    <ReactMarkdown
                        components={{
                            a: ({ href, children }) => (
                                <CustomLinkRenderer href={href}>{children}</CustomLinkRenderer>
                            )
                        }}
                    >
                        {activeTab.content}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default NoteEditor;
