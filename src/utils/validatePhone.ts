export const validatePhone = (value: string, errorMessage: string) => {
    if (!new RegExp(/^\d*$/).test(value)) {
        return {errorMessage, isPhone: false}
    } else {
        return {isPhone: true}
    }
}