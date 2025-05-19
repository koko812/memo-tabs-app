import { useEffect, useState } from 'react';
import PreviewCard from './PreviewCard.jsx'; // 既存のOGPカードコンポーネント
import { fetchPreview } from '../utils/fetchPreview.js'; // 共通のfetch関数（既に定義済み）

const CustomLinkRenderer = ({ href, children }) => {
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        if (!href.startsWith('http')) return;
        fetchPreview(href).then((data) => {
            if (data) setPreviewData(data);
        });
    }, [href]);

    return (
        <div className="my-4 space-y-2">
            {/* 通常リンク */}
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {children}
            </a>

            {/* OGP プレビュー */}
            {previewData && (
                <PreviewCard
                    title={previewData.title}
                    description={previewData.description}
                    imageUrl={previewData.image?.url}
                    url={previewData.url}
                />
            )}
        </div>
    );
};

export default CustomLinkRenderer;
