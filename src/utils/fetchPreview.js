// src/utils/fetchPreview.js

const previewCache = new Map();

export const fetchPreview = async (url) => {
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
