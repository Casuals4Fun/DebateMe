import { useCallback } from 'react';

type HandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => Promise<string | null>;

const useFileHandler = (maxSize: number): HandleFileChange => {
    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>): Promise<string | null> => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                if (file.size <= maxSize * 1024 * 1024) {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                                resolve(reader.result);
                            } else {
                                reject(new Error('Failed to read file as data URL'));
                            }
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                } else {
                    alert("File size should not exceed " + maxSize + "MB");
                    return null;
                }
            } else {
                alert("Please select an image file.");
                return null;
            }
        }
        return null;
    }, [maxSize]);

    return handleFileChange;
};

export default useFileHandler;