export const loginValidator = (
    username: string,
    password: string
): boolean => {
    return !(!username || !password);
}