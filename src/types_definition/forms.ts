export type SignInForm = {
    username: string;
    password: string;
};

export type SignUpForm = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type NewPasswordForm = {
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

export type SamplesFileUploadForm = {
    csvFile: string
}