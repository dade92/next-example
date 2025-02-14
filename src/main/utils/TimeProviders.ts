export const nowProvider = (): Date => new Date()

export const nowPlusOneHourProvider = (): Date => {
    const date = nowProvider();
    date.setHours(date.getHours() + 1);
    return date;
}

export const nowPlusOneDayProvider = (): Date => {
    const date = nowProvider();
    date.setHours(date.getHours() + 24);
    return date;
}