export function validatePassword(value: string, errorMessage: string) {
    if (value.length < 5) {
        return {errorMessage, isPassword: false}
    } else {
        return {isPassword: true}
    }
}