export const getImageUrl = (localFileName: string, cloudinaryUrl: string) => {
    if (import.meta.env.DEV) {
        return `/images/${localFileName}`;
    }
    return cloudinaryUrl;
};

export const getImageBookUrl = (localFileName: string, cloudinaryUrl: string) => {
    if (import.meta.env.DEV) {
        return `/images/books/${localFileName}`;
    }
    return cloudinaryUrl;
};