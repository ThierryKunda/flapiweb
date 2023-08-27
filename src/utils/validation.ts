export function validateEmail(text?: string) {
    return text?.match("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$") !== null;
}

export function validateConfirmPassword(password: string, confirmPassword: string) {
    return (password !== "") && (password === confirmPassword);
}

export function validateTimeFormat(t: string) {
    let res = t.match(/[0-9]{2}:[0-9]{2}/);
    if (res) {
        return res.length === 1;
    }
    return false;
}