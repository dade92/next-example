export const signUpValidator = (
    username: string,
    email: string,
    password: string
): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !(!username || !email || !password || !emailRegex.test(email));
}