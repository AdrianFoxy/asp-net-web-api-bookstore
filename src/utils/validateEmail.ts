export function validateEmail(value: string, errorMessage: string) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return {errorMessage, isEmail: false}
    } else {
        return {isEmail: true}
    }
}