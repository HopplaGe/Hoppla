import React from 'react';
import {toPng} from "html-to-image";

const useCaptureImage = () => {
    const [sharedImage, setSharedImage] = React.useState('');
    const screenRef = React.useRef<HTMLDivElement>(null);

    const handleShare = React.useCallback(async () => {
        const image = await toPng(screenRef.current as HTMLElement);
        setSharedImage(image);
    }, []);

    return {
        screenRef,
        sharedImage,
        handleShare,
    };
};

export default useCaptureImage;