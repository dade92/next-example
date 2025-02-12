export const nowProvider = (): Date => new Date()

export const nowPlusOneHourProvider = (): Date => {
    const date = new Date()
    date.setHours(date.getHours() + 1)
    return date
}