// NoteEditor.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import PreviewCard from './PreviewCard';
import styles from '../App.module.css';

function NoteEditor({
    activeTab,
    searchText,
    linkPreview,
    onChangeContent,
    highlightMatch
}) {
    return (
        <div>
            <h2>{activeTab.title}</h2>

            <textarea
                value={activeTab.content}
                onChange={onChangeContent}
                rows={10}
                cols={50}
                className={styles.textarea}
            />

            {linkPreview && (
                <PreviewCard
                    title={linkPreview.title}
                    description={linkPreview.description}
                    imageUrl={linkPreview.image?.url}
                    url={linkPreview.url}
                />
            )}

            <h3>プレビュー</h3>
            {searchText ? (
                <div className={styles.previewText}>
                    {highlightMatch(activeTab.content, searchText)}
                </div>
            ) : (
                <div className="prose max-w-none">
                    <ReactMarkdown>{activeTab.content}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}

export default NoteEditor;
