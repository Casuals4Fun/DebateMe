const useFormatNumber = (num: number) => {
    let formattedNum = '';
    if (num >= 1_000_000_000) {
        formattedNum = (num / 1_000_000_000).toFixed(2);
        formattedNum = formattedNum.replace(/\.00$/, '');
        return `${formattedNum}b+`;
    } else if (num >= 1_000_000) {
        formattedNum = (num / 1_000_000).toFixed(2);
        formattedNum = formattedNum.replace(/\.00$/, '');
        return `${formattedNum}m+`;
    } else if (num >= 1000) {
        formattedNum = (num / 1000).toFixed(2);
        formattedNum = formattedNum.replace(/\.00$/, '');
        return `${formattedNum}k+`;
    }
    return num;
};

export default useFormatNumber;