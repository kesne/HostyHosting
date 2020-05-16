import React from 'react';

const imageCache = new Set<string>();
function prefetchImage(src?: string) {
    if (!src || imageCache.has(src)) {
        return;
    }

    const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
    }).then(() => {
        imageCache.add(src);
    });

    throw promise;
};

export default function SuspenseImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    prefetchImage(props.src);
    return <img {...props} />;
}
