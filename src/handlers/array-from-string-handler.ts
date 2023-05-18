export const arrayFromStringHandler = (text: string): string[] => {
    if (!text) return [];
    return text.split(',');
};