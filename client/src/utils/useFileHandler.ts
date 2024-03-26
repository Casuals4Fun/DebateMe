import { useCallback } from 'react';

const useFileHandler = (setFile: React.Dispatch<React.SetStateAction<string | null>>, maxSize: number) => {
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                if (file.size <= maxSize * 1024 * 1024) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFile(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("File size should not exceed " + maxSize + "MB");
                }
            } else {
                alert("Please select an image file.");
            }
        }
    }, [setFile, maxSize]);

    return handleFileChange;
};

export default useFileHandler;