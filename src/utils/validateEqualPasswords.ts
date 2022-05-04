export function validateEqualPassword(password: string, confirmPassword: string, errorMessage: string) {
    if (password !== confirmPassword) {
        return {errorMessage, isEquals: false}
    } else {
        return {isEquals: true}
    }
}