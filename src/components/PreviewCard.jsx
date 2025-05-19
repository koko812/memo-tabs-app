function PreviewCard({ title, description, imageUrl, url }) {
    return (
        <div className="max-w-md border rounded-lg p-4 shadow-sm bg-white mb-4">
            <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline text-black">
                <h4 className="text-lg font-semibold mb-2">{title || url}</h4>
                {description
                    ? <p className="text-sm text-gray-700 mb-2">{description}</p>
                    : <p className="text-sm text-gray-400 italic mb-2">説明文は見つかりませんでした</p>}
                {imageUrl && (
                    <img src={imageUrl} alt="" className="w-full h-auto rounded max-h-48 object-contain" />
                )}
            </a>
        </div>
    );
}


export default PreviewCard; 