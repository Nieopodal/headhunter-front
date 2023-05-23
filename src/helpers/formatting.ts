export const numberWithSpaces = (x: string) => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
};

export const monthDeclension = (count: number) => {
    let months = count.toString();
    let singleDigit = (count.toString()).slice(-1);
    if (months[months.length - 2] === "1") {
        return "miesięcy"
    }
    if (months.length === 1 && singleDigit === "1") {
        return "miesiąc"
    }
    if (singleDigit === "2" || singleDigit === "3" || singleDigit === "4") {
        return "miesiące"
    }
    return "miesięcy"
};