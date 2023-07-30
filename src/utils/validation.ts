export function validateEmail(text?: string) {
    return text?.match("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$") !== null;
}

export function validateConfirmPassword(password: string, confirmPassword: string) {
    return password && confirmPassword && password === confirmPassword;
}